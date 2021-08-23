const { ServerDescription } = require("mongodb")
const Artwork = require("../models/Artworks")

// list all the artworks
const index = async(req,res,send)=>{
    try {
     const list = await Artwork.find()
     {
         res.json({
             message:"heres the list of all the artworks",
             list,
             
         })
     }
     
    } catch (error) {
        res.json({
            message:"an error occured",
            error
        })
    }
}

// call the artwork by id

const show = async(req,res,send)=>{
    try {
        let ArtworkID = req.body.ArtworkID
        const This = await Artwork.findById(ArtworkID)
        {
            res.json({
                message:"The artwork of given id is given below",
                This
            })
        }
    } catch (error) {
        res.json({
            message:"not able to find Artwork by its ID",
            error
        })
    }
}

// ADDING AN ARTWORK
const store = async(req,res,send)=>{
    try {
        let artwork = new Artwork({
     Image:req.body.Image,
     description:req.body.description,
     price:req.body.price,
     features:req.body.features
        })
        const navin =await artwork.save()
        {
           res.json({
                message:"new artwork added successfully",
                navin
            })
        }
    } catch (error) {
        res.json({
            message:"Not able to add artwork",
            error
        })
    }
}

//Updating an artwork by its ID

const changes = async(req,res,send)=>{
try {
    let ArtworkID = req.body.ArtworkID
    let updateData={

    }
    const update = await findByIdAndUpdate(ArtworkID,{$set:updateData})
    res.json({
        message:"Artwork updated sucessfully",
        update
    })
} catch (error) {
    res.json({
        message:"Artwork was not been able to get updated",
        error
    })
}
}

//Deleting an artwork by its ID

const remove = async(req,res,send)=>{
    try {
        let ArtworkID=req.body.ArtworkID
         await findByIdAndDelete(ArtworkID)
        {
            res.json({
                message:"Artwork removed successfully"
            })
        }
    } catch (error) {
        res.json({
            message:"arror occured rmoving artwork"
        })
    }
}

module.exports={index,show,store,changes,remove};