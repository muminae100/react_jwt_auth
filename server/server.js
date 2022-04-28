const express = require("express");
const path = require('path');
const logEvents = require('./middleware/logEvents');

const app = express();

app.use((req, res, next) =>{
    console.log(`${req.method} ${req.path}`);
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    next();
});

app.get("/", (req, res) => {
    res.send("Hello world!");
})


PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
