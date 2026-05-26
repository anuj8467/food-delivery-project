const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    category:String,

    price:Number,

    image:String,

    description:String

});

module.exports =
mongoose.model("Food", foodSchema);