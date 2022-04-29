const bcrypt = require('bcrypt');
const userDb = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}

const handleAuth = (req, res) =>{
    const { name, psw } = req.body;
    if(!name || !psw ) return res.status(400).json({"message": "Enter the required details!"});

    const user = userDb.users.find(user => user.name === name && user.psw === bcrypt.compare(user.psw, psw));
    if(!user) return res.status(409).json({"message": "Invalid crendentials!"});

    res.json({user})
}

module.exports = { handleAuth };