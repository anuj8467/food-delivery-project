const express = require("express");
const Admin = require("../models/Admin");
const Order = require("../models/Order");

const router = express.Router();

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin =
            await Admin.findOne({ email });

        if (!admin) {

            return res.status(400).json({
                message: "Admin Not Found"
            });
        }

        if (admin.password !== password) {

            return res.status(400).json({
                message: "Wrong Password"
            });
        }

        res.json({
            message: "Admin Login Successful",
            admin
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.get("/orders", async (req, res) => {

    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;