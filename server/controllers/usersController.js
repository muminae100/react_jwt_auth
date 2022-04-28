const data = {};
data.users = require('../models/users.json');

const getAllUsers = (req, res) => {
    res.json(data);
}

module.exports = {
    getAllUsers
}