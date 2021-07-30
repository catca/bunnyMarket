const express = require('express');
const router = express.Router();

//=================================
//              Image
//=================================


router.get("/slider", (req, res) => {

    return res.status(200).send({
        success: true
    });
});

module.exports = router;
