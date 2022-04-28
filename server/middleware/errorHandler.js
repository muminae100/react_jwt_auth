const { logEvents } = require('./logEvents');

const errorHandler = (error, req, res, next) => {
    console.log(error.stack);
    res.status(500).send(error.message);
    logEvents(`${error.name}: ${error.message}`, 'errorLog.txt')
}

module.exports = errorHandler;