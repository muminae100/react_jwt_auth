const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if(!employees) return res.status(204).json({"message": "No documents found!"});

    res.json(employees);
}

const createEmployee = async (req, res) =>{
    const { name, dateOfBirth } = req.body;
    if(!name || !dateOfBirth){
        res.status(400).json({"message": "Enter the required details"});
    }
    const result = await Employee.create({
        "name": name,
        "dateOfBirth": dateOfBirth
    });

    res.status(201).json(result)
}

const updateEmployee = async (req, res) =>{
    if(!req?.body?.id) return res.status(400).json({"message": "ID parameter is required!"});

    const user = await Employee.findOne({ _id: parseInt(req.body.id) }).exec();

    if(!user){
        return res.status(400).json({"message":`A user with ID ${req.body.id} not found!`});
    }

    if(req.body?.name) user.name = req.body.name;
    if(req.body?.dateOfBirth) user.dateOfBirth = req.body.dateOfBirth;

    const result = await user.save();

    res.status(200).json(result);
}

const deleteEmployee = async (req, res) =>{
    if(!req?.body?.id) return res.status(400).json({"message": "ID parameter is required!"});
    const user = await Employee.findOne({ _id: parseInt(req.body.id) }).exec();

    if(!user){
        return res.status(400).json({"message":`A user with ID ${req.body.id} not found!`});
    }

    const result = await Employee.deleteOne({ _id: req.body.id })

    res.status(204).json(result);
}

const getEmployee = async (req, res) =>{
    if(!req?.params?.id) return res.status(400).json({"message": "ID parameter is required!"});
    const user = await Employee.findOne({ _id: parseInt(req.params.id) }).exec();
    
    if(!user){
        return res.status(400).json({"message":`A user with ID ${req.params.id} not found!`});
    }

    res.status(200).json(user);
}

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}