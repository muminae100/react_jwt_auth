const userDb = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) =>{
    const cookies = req.cookies;
    if(!cookies.jwt ) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = userDb.users.find(user => user.refreshToken === refreshToken);

    if(!user){ 
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        return res.sendStatus(204);
    }

   //delete refresh token in the user
    const otherUsers = userDb.users.filter(u=> u.refreshToken !== user.refreshToken);
    const currentUser = {...user, refreshToken: ''};
    userDb.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'), 
        JSON.stringify(userDb.users)
    );

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });

    return res.sendStatus(204);
}

module.exports = { handleLogout };