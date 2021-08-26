const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema= new Schema({
Name:{
typeof:String,
required:true,
unique:true
},
age:{
    typeof:Number,
required:false
},
address:{
typeof:String,
required:true
},
FavArtworksTypes:{
    typeof:String,
    required:false
}
},{timestamps:true})

const User=mongoose.model('User',userSchema)
module.exports= User;