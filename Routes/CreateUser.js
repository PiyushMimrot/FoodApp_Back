const express = require("express");
const router = express.Router();
const User = require("../models/User.js")

const { body, validationResult } = require('express-validator');
const bcrypt =  require("bcryptjs");


const jwt  = require("jsonwebtoken");

const jwtSecret  = "Mtuayeoriuaiurgsdfhjasgflhalfghls"

router.post("/createUser",

    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt  =  await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(req.body.password,salt)

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            location: req.body.location
        })

            .then(() => {
                res.json({ success: true })
            })

            .catch(() => {
                res.json({ success: false })
            })

    })




router.post("/loginUser",
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            let userData = await User.findOne({ email })

            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct email credentials" })
            }

            const pwdCompare   = await bcrypt.compare(req.body.password,userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct password credentials" })

            }

            const data = {
                user :{
                    id:userData.id
                }
            }


            const authToken = jwt.sign(data,jwtSecret);
            

            return res.json({ success: true,authToken})

         
        } catch (error) {
                console.log(error);
            res.json({ success: false })
        }

    })



  
module.exports = router; 