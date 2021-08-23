const express = require('express');
const router = express.Router();
const { Favorites } = require("../models/Favorites");
const { Product } = require("../models/Product");


//=================================
//            Favorites
//=================================

function modifyDate(date){
    const kst = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    return kst
}

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

router.post("/getProducts", (req, res) => {
    Favorites.find({ userId : req.body.user_id})
    .exec((err, favorites) => {
        if(err) return res.status(400).send(err);
        const favorite = favorites.map(favorites => {
            return {'_id' : favorites.productId }
        })
        Product.find({ 
            $or: favorite
        })
        .exec((err, product) => {
            if(err){ 
                console.log(err);
                return res.status(400).send(err);
            }
            product.map(product => {
                product.newDate = modifyDate(product.newDate);
                if(product.modifyDate) product.modifyDate = modifyDate(product.modifyDate);
            })
            res.status(200).json({ success: true, product })
        })
    })

    // Product.find({ "email" : req.body.userId })
    // .exec((err, product) => {
    //     if(err) return res.status(400).send(err);
    //     product.map(product => {
    //         product.newDate = modifyDate(product.newDate);
    //         if(product.modifyDate) product.modifyDate = modifyDate(product.modifyDate);
    //     })
    //     res.status(200).json({ success: true, product })
    // })
});

module.exports = router;
