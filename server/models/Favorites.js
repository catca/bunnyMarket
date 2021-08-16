const mongoose = require('mongoose');

const dibsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}) 

// dibsSchema.pre('save', function( next ) {
//     let dibs = this;
//     console.log(dibs);
//     next();
// });

const Favorites = mongoose.model('Favorites', dibsSchema);

module.exports = { Favorites }