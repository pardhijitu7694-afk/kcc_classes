const mongoose = require("mongoose");
const mdbConnection = require('../config/mongoose');

const ContactSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ContactModel = mdbConnection.model("Contacts", ContactSchema);

module.exports = ContactModel
