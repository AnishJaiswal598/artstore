const Users = require("../models/Users")

// list all the Users
const index = async(req,res,send)=>{
    try {
     const list = await Users.find()
     {
         res.json({
             message:"heres the list of all the Users",
             list
         })
     }
     
    } catch (error) {
        res.json({
            message:"an error occured",
            error
        })
    }
}

// call the user by id

const show = async(req,res,send)=>{
    try {
        let UserID = req.body.UserID
        const This = await Users.findById(UserID)
        {
            res.json({
                message:"The User of given id is given below",
                This
            })
        }
    } catch (error) {
        res.json({
            message:"not able to find user by its ID",
            error
        })
    }
}

// ADDING AN User
const store = async(req,res,send)=>{
    try {
        let User = new Users({
     
        })
        const navin =await User.save()
        {
           res.json({
                message:"new User added successfully",
                navin
            })
        }
    } catch (error) {
        res.json({
            message:"Not able to add User",
            error
        })
    }
}

//Updating an User by its ID

const changes = async(req,res,send)=>{
try {
    let UserID = req.body.UserID
    let updateData={

    }
    const update = await findByIdAndUpdate(UserID,{$set:updateData})
    res.json({
        message:"User updated sucessfully",
        update
    })
} catch (error) {
    res.json({
        message:"User was not been able to get updated",
        error
    })
}
}

//Deleting an User by its ID

const remove = async(req,res,send)=>{
    try {
        let UserID=req.body.UserID
         await findByIdAndDelete(UserID)
        {
            res.json({
                message:"Users removed successfully"
            })
        }
    } catch (error) {
        res.json({
            message:"arror occured rmoving users"
        })
    }
}

module.exports={index,show,store,changes,remove};