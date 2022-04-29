const express = require("express");
const cors = require('cors');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');

const app = express();

//middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ "message":"Hello world!" });
});

app.use("/api/auth", require('./routes/api/auth'));
app.use("/api/register", require('./routes/api/register'));
app.use("/api/users", require('./routes/api/users'));


app.all('*', (req, res) =>{
    res.status(404).json({ error:'Page Not Found'});
});

app.use(errorHandler);


PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
