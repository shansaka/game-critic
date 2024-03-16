const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [(val) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
        }, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password should be at least 8 characters long']
    },
    name: {
        type: String,
        required: [true, 'Display name is required']
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Users', userSchema);
