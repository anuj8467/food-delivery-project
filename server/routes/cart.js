const express = require("express");

const Cart = require("../models/Cart");

const router = express.Router();


router.post("/add", async (req, res) => {

    try {

        const cartItem =
            new Cart(req.body);

        await cartItem.save();

        res.json({
            message: "Added To Cart"
        });

    }
    catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});


router.get("/:userId", async (req, res) => {

    const items =
        await Cart.find({

            userId: req.params.userId

        });

    res.json(items);
});

router.delete("/clear/:userId", async (req, res) => {

    try {

        await Cart.deleteMany({
            userId: req.params.userId
        });

        res.json({
            message: "Cart Cleared"
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.delete("/:id", async (req, res) => {

    try {

        await Cart.findByIdAndDelete(req.params.id);

        res.json({
            message: "Item Removed"
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});


module.exports = router;