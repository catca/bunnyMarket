const express = require('express');
const router = express.Router();
const multer = require('multer'); 
// const { User } = require("../models/User");

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
    console.log(req.body)
    return res.status(200).json({
        success: true
    });
});

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        console.log(err);
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

module.exports = router;
