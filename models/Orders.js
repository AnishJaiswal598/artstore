const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
OrderNo:{
typeof:Number,
required:true
},
ArtworkNo:{
typeof:Number,
required:true
},
Quantity:{
    typeof:Number,
    required:true
}

},{timestamps:true})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order;