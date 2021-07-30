const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const productSchema = mongoose.Schema({
    email: {
        type:String,
        trim:true
    },
    title: {
        type:String,
        maxlength:40
    },
    location: {
        type:String,
        trim:true
    },
    status: {
        type:String
    },
    exchanges: {
        type:String
    },
    price: {
        type:Number,
        default: 0 
    },
    description: {
        type:String,
        maxlength:2000
    },
    quantity: {
        type:Number,
        default: 1 
    },
    filePath: {
        type:String
    },
    fileName: {
        type:String
    },
    largeCategory: {
        type:String
    },
    mediumCategory: {
        type:String
    },
    smallCategory: {
        type:String
    },
    newDate: {
        type:String
    },
    modifyDate: {
        type:String
    }
})


// productSchema.pre('save', function( next ) {
//     var user = this;
    
//     if(user.isModified('password')){    
//         // console.log('password changed')
//         bcrypt.genSalt(saltRounds, function(err, salt){
//             if(err) return next(err);
    
//             bcrypt.hash(user.password, salt, function(err, hash){
//                 if(err) return next(err);
//                 user.password = hash 
//                 next()
//             })
//         })
//     } else {
//         next()
//     }
// });

// productSchema.methods.comparePassword = function(plainPassword,cb){
//     bcrypt.compare(plainPassword, this.password, function(err, isMatch){
//         if (err) return cb(err);
//         cb(null, isMatch)
//     })
// }

// productSchema.statics.findByToken = function (token, cb) {
//     var user = this;

//     jwt.verify(token,'secret',function(err, decode){
//         user.findOne({"_id":decode, "token":token}, function(err, user){
//             if(err) return cb(err);
//             cb(null, user);
//         })
//     })
// }

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }