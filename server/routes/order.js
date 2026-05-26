const express = require("express");

const Order = require("../models/Order");

const router = express.Router();


router.post("/place", async(req,res)=>{

    try{

        const order =
        new Order(req.body);

        await order.save();

        res.json({
            message:"Order Placed"
        });

    }
    catch(err){

        res.status(500).json({
            message:"Server Error"
        });
    }
});


router.get("/:userId", async(req,res)=>{

    const orders =
    await Order.find({

        userId:req.params.userId

    });

    res.json(orders);
});

module.exports = router;