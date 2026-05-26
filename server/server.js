const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();



/* MIDDLEWARE */

app.use(cors());

app.use(express.json());



/* ROUTES */

app.use("/api/auth", authRoutes);



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