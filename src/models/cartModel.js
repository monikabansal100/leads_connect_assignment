const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId: {
      type: ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    items: [
      {
        productId: {
          type: ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
    totalItems: {
      type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
  })

module.exports = mongoose.model("cart", cartSchema)
