const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

/* PLACE ORDER */

router.post("/place", async (req, res) => {

    try {

        const order =
            new Order(req.body);

        await order.save();

        res.status(201).json({
            message: "Order Placed"
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

/* GET USER ORDERS */

router.get("/:userId", async (req, res) => {

    try {

        const orders =
            await Order.find({
                userId:req.params.userId
            });

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message:"Server Error"
        });
    }
});

module.exports = router;