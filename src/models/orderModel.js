const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "user",
        required: true,
        trim: true
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: "product",
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            trim: true
        }
    }],
    totalPrice: {
        type: Number,
        trim: true
    },
    totalItems: {
        type: Number,
        trim: true
    },
    totalQuantity: {
        type: Number,
        trim: true
    },
    cancellable: {
        type: Boolean,
        default: true,
        trim: true
    },
    status: {
        type: String,
        default: 'pending',
        trim: true,
        enum: ["pending", "completed", "cancelled"]
    }
})

module.exports = mongoose.model("order", orderSchema)