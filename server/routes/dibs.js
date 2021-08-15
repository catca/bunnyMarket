const express = require('express');
const router = express.Router();
const { Dibs } = require("../models/Dibs");


//=================================
//             Product
//=================================

router.post("/getDibs", (req, res) => {

    let variable = {}
    variable = { "productId": req.body.productId }
    
    Dibs.find(variable)
        .exec((err, dibs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dibs })
        })
});

router.post("/upDibs", (req, res) => {

    let variable = {}
    variable = { productId: req.body.productId, userId: req.body.userId }

    const dibs = new Dibs(variable)
    //save the like information data in MongoDB
    dibs.save((err, dibsResult) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true })
    })
})
router.post("/unDibs", (req, res) => {

    let variable = {}
    variable = { productId: req.body.productId, userId: req.body.userId }

    //save the like information data in MongoDB
    Dibs.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
})

module.exports = router;
