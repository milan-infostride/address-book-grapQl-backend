const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: String,
    building_location: String,
    city: String,
    state: String,
    date: String,
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Address',addressSchema);