const express = require("express");
const crendentials = require("./middleware/credentials");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

//connect to db
connectDB();

const app = express();

//middleware
app.use(logger);
app.use(crendentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())


app.get("/", (req, res) => {
    res.json({ "message":"Hello world!" });
});

app.use("/auth", require('./routes/auth'));
app.use("/register", require('./routes/register'));
app.use("/refresh", require('./routes/refreshToken'));
app.use("/logout", require('./routes/logout'));

app.use(verifyJWT);
app.use("/api/employees", require('./routes/api/employees'));


app.all('*', (req, res) =>{
    res.status(404).json({ error:'Page Not Found'});
});

app.use(errorHandler);


PORT = process.env.PORT || 5000;


//listen to requests after connection to mongoDB
mongoose.connection.once('open', () =>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
