const express = require("express");
const cors = require('cors');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const whitelist = ['http://localhost/3000', 'http://localhost/5000'];
const corsOptions = {
    origin: (origin, callback) =>{
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not authorized!'))
        }
    },
    optionsSuccessStatus: 200
}


//middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ msg:"Hello world!" });
});

app.use("/api/users", require('./routes/api/users'))


app.all('*', (req, res) =>{
    res.status(404).json({ error:'Page Not Found'});
});
app.use(errorHandler);


PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
