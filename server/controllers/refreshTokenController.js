const jwt = require('jsonwebtoken');
require('dotenv').config();
const userDb = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}

const handleRefreshToken = (req, res) =>{
    const cookies = req.cookies;
    if(!cookies.jwt ) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const user = userDb.users.find(user => user.refreshToken === refreshToken);

    if(!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>{
            if(err || user.name !== decoded.name) return res.sendStatus(403);

            const roles = Object.values(user.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                    "name": decoded.name,
                    "roles": roles
                }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            res.json({accessToken});

        }
    )
}

module.exports = { handleRefreshToken };