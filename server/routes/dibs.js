const express = require('express');
const router = express.Router();
const { Dibs } = require("../models/Dibs");


//=================================
//             Product
//=================================

router.post("/dibs", (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        success: true
    });
});

module.exports = router;
