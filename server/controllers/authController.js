const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');
const userDb = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}

const handleAuth = async (req, res) =>{
    const { name, psw } = req.body;
    if(!name || !psw ) return res.status(400).json({"message": "Fill all the required details!"});

    const user = userDb.users.find(user => user.name === name);

    if(!user) return res.status(401).json({"message": "Invalid crendentials!"});

    const match = await bcrypt.compare(psw, user.psw);

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
            { expiresIn: '3m' }
        );
        
        //save refresh token
        const otherUsers = userDb.users.filter(u=> u.name !== user.name);
        const currentUser = {...user, refreshToken};
        userDb.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'), 
            JSON.stringify(userDb.users)
        );

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