const express = require("express");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();

//middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ "message":"Hello world!" });
});

app.use("/auth", require('./routes/auth'));
app.use("/register", require('./routes/register'));

app.use(verifyJWT);
app.use("/api/users", require('./routes/api/users'));


app.all('*', (req, res) =>{
    res.status(404).json({ error:'Page Not Found'});
});

app.use(errorHandler);


PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
