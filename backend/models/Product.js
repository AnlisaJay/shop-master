const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = model('Product', productSchema)
