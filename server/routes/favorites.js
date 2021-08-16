const express = require('express');
const router = express.Router();
const { Favorites } = require("../models/Favorites");


//=================================
//             Product
//=================================

router.post("/getFavorites", (req, res) => {

    let variable = {}
    variable = { "productId": req.body.productId }
    
    Favorites.find(variable)
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, favorites })
        })
});

router.post("/upFavorites", (req, res) => {

    let variable = {}
    variable = { productId: req.body.productId, userId: req.body.userId }

    const favorites = new Favorites(variable)
    //save the like information data in MongoDB
    favorites.save((err, favoritesResult) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true })
    })
})
router.post("/downFavorites", (req, res) => {

    let variable = {}
    variable = { productId: req.body.productId, userId: req.body.userId }

    //save the like information data in MongoDB
    Favorites.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
})

module.exports = router;
