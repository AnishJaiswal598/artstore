const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const artworkSchema = new Schema({
Image:{},
description:{
    type:String,
    // required:true,
    // unique:true
},
price:{
    type:Number
},
features:{
    type:String
},

}
,
{timestamps:true}
)
const Artwork = mongoose.model('Artwork',artworkSchema)

module.exports= Artwork;