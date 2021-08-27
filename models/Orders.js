const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderNo:{
        type:Number
        // required:true
    },
    artworkNo:{
        type:Number
        // required:true
},
    quantity:{
        type:Number
        // required:true
}

},{timestamps:true})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order;