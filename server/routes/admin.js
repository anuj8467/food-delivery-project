const express = require("express");
const Admin = require("../models/Admin");
const Order = require("../models/Order");
const User = require("../models/User");

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

router.put("/order/:id", async (req, res) => {

    try {

        await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            }
        );

        res.json({
            message: "Order Status Updated"
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.get("/users", async (req, res) => {

    try {

        const users =
            await User.find()
            .select("-password");

        res.json(users);

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;