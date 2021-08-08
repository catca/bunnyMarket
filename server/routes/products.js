const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const { Product } = require("../models/Product");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.png' || ext !== '.jpg' || ext !== '.jpeg' || ext !== '.html') {
            return cb(res.status(400).end('only jpg, png, jpeg is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Product
//=================================

router.post("/new", (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.get("/main", (req, res) => {
    Product.find()
        .exec((err, products) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, products})
        })
});

router.post("/getProduct", (req, res) => {

    Product.findOne({ "_id" : req.body.productId })
    .exec((err, product) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, product })
    })
});

router.post("/productManage", (req, res) => {
    Product.find({ "email" : req.body.userId })
    .exec((err, product) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, product })
    })
});

router.post("/search", (req, res) => {
    Product.find({ title : new RegExp(req.body.productTitle) })
    .exec((err, product) => {
        if(err){ 
            console.log(err);
            return res.status(400).send(err);
        }
        res.status(200).json({ success: true, product })
    })
});

module.exports = router;
