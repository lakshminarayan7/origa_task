const mongoose = require('mongoose');

const modelName = 'orders';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: Number,
        trim: true,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        trim: true,
        required: true,
    },
    sub_total: { type: Number, default: 0 },
    date: { type: String }
})

module.exports = mongoose.model(modelName, orderSchema)