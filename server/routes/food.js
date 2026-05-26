const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

/* GET ALL FOODS */

router.get("/", async (req, res) => {

    try {

        const foods =
            await Food.find();

        res.json(foods);

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.get("/categories", async (req, res) => {

    try {

        const categories =
            await Food.distinct("category");

        res.json(categories);

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.post("/", async (req, res) => {

    try {

        const food =
            new Food(req.body);

        await food.save();

        res.json({
            message: "Food Added"
        });

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.delete("/:id", async (req, res) => {

    await Food.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message: "Food Deleted"
    });
});

module.exports = router;