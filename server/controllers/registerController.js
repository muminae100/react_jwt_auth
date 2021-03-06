const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) =>{
    const { name,pwd } = req.body;
    if(!name || !pwd ) return res.status(400).json({"message": "Enter the required details!"});

    const duplicate = await User.findOne({name: name}).exec();
    if(duplicate) return res.status(409).json({"message": "User already exists!"});

    try {
    const hashedPsw = await bcrypt.hash(pwd, 10)

    const result = await User.create({
        "name": name,
        "dateOfBirth": "",
        "password": hashedPsw
    });

    // console.log(result);

    res.status(201).json({"success": `New user ${name} created!`});

    } catch (error) {
        res.status(500).json({"message": error.message});
    }
}


module.exports = { handleRegister };