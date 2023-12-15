const express = require("express");

const router = express.Router();


const Order = require("../models/Order");

router.post('/myorderData', async (req, res) => {

    try{
       
        let myData = await Order.find({email : req.body.email})
        res.json({order_data  : myData})
        console.log(myData)
    }
    catch (error){

        res.send("Server Error", error.message)

    }
})
module.exports = router;