const mongooose = require ("mongoose")
const Schema = mongoose.Schema

const artworkSchema = new Schema({


},{Timestamp:true})
const Artwork = mongoose.model('Artwork',artworkSchema)

module.exports= Artwork