const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const artworkSchema = new Schema({
Image:{},
description:{
    typeof:String,
},
price:{
    typeof:Number
},
features:{
    typeof:String
},

},{timestamps:true})
const Artwork = mongoose.model('Artwork',artworkSchema)

module.exports= Artwork;