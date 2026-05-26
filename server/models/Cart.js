const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    foodName: String,

    price: Number,

    image: String,

    quantity: Number

});

module.exports =
mongoose.model("Cart", cartSchema);