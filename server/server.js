const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const foodRoutes = require("./routes/food");
const app = express();



/* MIDDLEWARE */

app.use(cors());

app.use(express.json());



/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/foods", foodRoutes);




/* DATABASE */

mongoose.connect("mongodb://127.0.0.1:27017/foodapp")
    .then(() => {

        console.log("MongoDB Connected");

    })
    .catch((err) => {

        console.log(err);

    });



/* SERVER */

app.listen(5000, () => {

    console.log("Server Running on Port 5000");

});