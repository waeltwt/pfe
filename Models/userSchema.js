const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    name: String,
    skill: String,
    phoneNumber: Number,
    zip: Number,
    state: String,
    city: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    
    role: {
        type: String,
        enum: ['user', 'RH', 'admin'],
         default: 'user'
    }
});
module.exports = mongoose.model('User', userSchema);
