const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
})


module.exports = mongoose.model('User',userSchema);
