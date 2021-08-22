const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const artworkSchema = new Schema({


},{timestamps:true})
const Artwork = mongoose.model('Artwork',artworkSchema)

module.exports= Artwork;