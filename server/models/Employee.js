const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
    }
}); 

module.exports = mongoose.model('Employee', employeeSchema);