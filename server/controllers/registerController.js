const path = require('path');
const fsPromises = require('fs').promises;
const userDb = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) =>{
    const { name,dateOfBirth,psw } = req.body;
    if(!name || !psw || !dateOfBirth) return res.status(400).json({"message": "Enter the required details!"});

    const duplicate = userDb.users.find(user => user.name === name);
    if(duplicate) return res.status(409).json({"message": "User already exists!"});

    try {
    const hashed_psw = await bcrypt.hash(psw, 10)

    const newUser = {
        id: userDb.users[userDb.users.length - 1].id + 1 || 1,
        name: name,
        dateOfBirth: dateOfBirth,
        psw: hashed_psw
    }

    userDb.setUsers([...userDb.users, newUser]);
    await fsPromises.writeFile(path.join(__dirname, '..' ,'models', 'users.json'), JSON.stringify(userDb.users));

    res.status(201).json(userDb.users);

    } catch (error) {
        res.status(500).json({"message": error.message});
    }
}


module.exports = { handleRegister };