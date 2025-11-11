const mongoose = require('mongoose');
const mdbConnection = require('../config/mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "student" } // student, admin
});

// Create the model from the schema
const UserSchemaModel = mdbConnection.model('Users', UserSchema);

module.exports = UserSchemaModel;