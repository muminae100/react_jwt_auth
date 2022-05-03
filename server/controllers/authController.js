const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const handleAuth = async (req, res) =>{
    const { name, psw } = req.body;
    if(!name || !psw ) return res.status(400).json({"message": "Fill all the required details!"});

    const user = await User.findOne({name: name}).exec();

    if(!user) return res.status(401).json({"message": "Invalid crendentials!"});

    const match = await bcrypt.compare(psw, user.password);

    if(match){
        const roles = Object.values(user.roles);
        //create JWTs
        const accessToken = jwt.sign(
            {"UserInfo":{
                "name": user.name,
                "roles": roles
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            {"name": user.name},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1m' }
        );
        
        //save refresh token
        user.refreshToken = refreshToken;
        const result = await user.save();

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
        });
        res.json({accessToken});

    }else{
        res.sendStatus(401);
    }
}

module.exports = { handleAuth };