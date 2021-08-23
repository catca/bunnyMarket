const mongoose = require('mongoose');

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
    largeCategoryId: {
        type:String
    },
    mediumCategoryId: {
        type:String
    },
    smallCategoryId: {
        type:String
    },
    newDate: {
        type:Date
    },
    modifyDate: {
        type:Date
    },
    salesStatus: {
        type:String
    }
})

function modifyDate(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

productSchema.pre('save', function( next ) {
    let product = this;
    
    product.newDate = modifyDate(product.newDate);
    if(product.modifyDate) product.modifyDate = modifyDate(product.modifyDate);
    next();
});

productSchema.pre('find', function( next ) {
    let product = this;
    
    // console.log(product.schema.obj.newDate);
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }