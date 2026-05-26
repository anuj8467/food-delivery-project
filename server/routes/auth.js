const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();



/* SIGNUP */

router.post("/signup", async (req, res) => {

    console.log("Received Signup:", req.body);

    try {

        const { name, email, password } = req.body;



        const userExists =
            await User.findOne({ email });



        if (userExists) {

            return res.status(400).json({

                message: "User already exists"

            });
        }



        const hashedPassword =
            await bcrypt.hash(password, 10);



        const user = new User({

            name,
            email,
            password: hashedPassword
        });



        await user.save();



        res.status(201).json({

            message: "Account Created"
        });

    }
    catch (err) {

        res.status(500).json({

            message: "Server Error"
        });
    }
});



/* LOGIN */

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;



        const user =
            await User.findOne({ email });



        if (!user) {

            return res.status(400).json({

                message: "Invalid Email"
            });
        }



        const isMatch =
            await bcrypt.compare(password, user.password);



        if (!isMatch) {

            return res.status(400).json({

                message: "Invalid Password"
            });
        }



        const token =
            jwt.sign(

                { id: user._id },

                "secretkey",

                { expiresIn: "7d" }
            );



        res.json({

            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    }
    catch (err) {

        res.status(500).json({

            message: "Server Error"
        });
    }
});



module.exports = router;