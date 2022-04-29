const bcrypt = require('bcrypt');
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
        //create jwt later

        res.json({"success": `Login success for ${user.name}`})
    }else{
        res.sendStatus(401);
    }
}

module.exports = { handleAuth };