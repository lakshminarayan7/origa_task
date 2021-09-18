const mongoose = require('mongoose');

const modelName = 'users';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    userId: {
        type: Number,
        trim: true,
        required: true,
        unique: true
    },
    no_Of_Orders: { type: Number, default: 0}
})

module.exports = mongoose.model(modelName, userSchema)