const mongoose = require('mongoose');
const {jsonFormatterPlugin} = require("../utils/modelUtils");

const ADMIN = 'ADMIN';
const USER = 'USER';

const AccountTypes = [
    ADMIN,
    USER,
];

// Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: AccountTypes,
        default: USER,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: String,
    phone: String
}
);

userSchema.plugin(jsonFormatterPlugin);

mongoose.model('User', userSchema);
