const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

/* GET ALL FOODS */

router.get("/", async(req,res)=>{

    try{

        const foods =
        await Food.find();

        res.json(foods);

    }catch(err){

        res.status(500).json({
            message:"Server Error"
        });
    }
});

module.exports = router;