const allowedOrigins = require('../config/allowedOrigins');

const crendentials = (req, res) =>{
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.headers('Access-Control-Allow-Credentials', true);
    }

    next();
}

module.exports = crendentials;