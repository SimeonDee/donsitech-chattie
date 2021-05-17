const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String },
    fullname: { type: String },
    display_name: { type: String, default: "" },
    passport_uri: { type: String },
    status_msg: { type: String },
});

module.exports = mongoose.model('users', userSchema);