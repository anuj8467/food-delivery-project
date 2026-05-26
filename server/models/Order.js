const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId: String,

    userName: String,

    userEmail: String,

    phone: String,

    address: String,

    items: Array,

    totalPrice: Number,

    status: {
        type: String,
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports =
mongoose.model("Order", orderSchema);