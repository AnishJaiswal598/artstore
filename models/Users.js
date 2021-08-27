const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema= new Schema({
    name:{
        type:String,
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },
    favArtworksTypes:{
        type:String
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema)
module.exports= User;