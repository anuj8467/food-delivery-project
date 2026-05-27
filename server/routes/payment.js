const express = require("express");

const router = express.Router();

const razorpay = require("../config/razorpay");

const crypto = require("crypto");

router.post("/create-order", async (req, res) => {

    try {

        const options = {

            amount:
                req.body.amount * 100,

            currency: "INR",

            receipt:
                "receipt_" + Date.now()
        };

        const order =
            await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Payment Error"
        });
    }
});



router.post("/verify", async (req, res) => {

    try {

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature

        } = req.body;

        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;

        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(body.toString())
                .digest("hex");

        if (
            expectedSignature ===
            razorpay_signature
        ) {

            return res.json({
                success: true,
                message: "Payment Verified"
            });
        }

        res.status(400).json({
            success: false,
            message: "Invalid Signature"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Verification Failed"
        });
    }
});
module.exports = router;