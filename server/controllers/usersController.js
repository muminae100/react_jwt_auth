const data = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
};

const getAllUsers = (req, res) => {
    res.json(data.users);
}

const createUser = (req, res) =>{
    const newUser = {
        "id": data.users[data.users.length - 1].id + 1 || 1,
        "name": req.body.name,
        "dateOfBirth": req.body.dateOfBirth
    }
    if(!req.body.name || !req.body.dateOfBirth){
        res.status(400).json({"message": "Enter the required details"});
    }

    data.setUsers([...data.users, newUser]);
    res.status(201).json(data.users)
}

const updateUser = (req, res) =>{
    const user = data.users.find(user => user.id === parseInt(req.body.id));

    if(!user){
        return res.status(400).json({"message":`A user with ID ${req.body.id} not found!`});
    }

    if(req.body.name) user.name = req.body.name;
    if(req.body.dateOfBirth) user.dateOfBirth = req.body.dateOfBirth;

    const filterArray = data.users.filter(user => user.id !== parseInt(req.body.id));
    const unsortedArray = [...filterArray, user];
    data.setUsers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    res.status(200).json(data.users);
}

const deleteUser = (req, res) =>{
    const user = data.users.find(user => user.id === parseInt(req.body.id));

    if(!user){
        return res.status(400).json({"message":`A user with ID ${req.body.id} not found!`});
    }
    const filterArray = data.users.filter(user => user.id !== parseInt(req.body.id));

    data.setUsers([...filterArray]);

    res.status(200).json(data.users);
}

const getUser = (req, res) =>{
    const user = data.users.find(user => user.id === parseInt(req.params.id));
    
    if(!user){
        return res.status(400).json({"message":`A user with ID ${req.body.id} not found!`});
    }

    res.status(200).json(user);
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
}