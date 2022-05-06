const User = require('../models/User');

const handleLogout = async (req, res) =>{
    const cookies = req.cookies;
    if(!cookies.jwt ) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({refreshToken: refreshToken});

    if(!user){ 
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        return res.sendStatus(204);
    }

   //delete refresh token in the db
    user.refreshToken = ''

    const result = await user.save();

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });

    return res.sendStatus(204);
}

module.exports = { handleLogout };