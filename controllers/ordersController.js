const Orders = require("../models/Orders")

// list all the orders
const index = async(req,res,send)=>{
    try {
     const list = await Orders.find()
     {
         res.json({
             message:"heres the list of all the orders",
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

// call the orders by id

const show = async(req,res,send)=>{
    try {
        let OrderID = req.body.OrderID
        const This = await Orders.findById(OrderID)
        {
            res.json({
                message:"The order of given id is given below",
                This
            })
        }
    } catch (error) {
        res.json({
            message:"not able to find Order by its ID",
            error
        })
    }
}

// Adding an Order
const store = async(req,res,send)=>{
    try {
        let order = new Orders({
     
        })
        const add =await order.save()
        {
           res.json({
                message:"new order added successfully",
                add
            })
        }
    } catch (error) {
        res.json({
            message:"Not able to add order",
            error
        })
    }
}

//Updating an order by its ID

const changes = async(req,res,send)=>{
try {
    let OrderID = req.body.OrderID
    let updateData={

    }
    const update = await findByIdAndUpdate(OrderID,{$set:updateData})
    res.json({
        message:"Order updated sucessfully",
        update
    })
} catch (error) {
    res.json({
        message:"Order was not been able to get updated",
        error
    })
}
}

//Deleting an Order by its ID

const remove = async(req,res,send)=>{
    try {
        let OrderID=req.body.OrderID
         await findByIdAndDelete(OrderID)
        {
            res.json({
                message:"Order removed successfully"
            })
        }
    } catch (error) {
        res.json({
            message:"error occured removing Order"
        })
    }
}

module.exports={index,show,store,changes,remove}