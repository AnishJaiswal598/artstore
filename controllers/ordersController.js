import Orders from '../models/Orders.js';

// list all the orders
const listAllOrders = async (req, res) => {
  try {
    const list = await Orders.find();
    res.status(200).json({
      success: true,
      message: 'heres the list of all the orders',
      list,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// call the orders by id

const orderByID = async (req, res) => {
  try {
    const orderID = req.body.orderID;
    const showOrder = await Orders.findById(orderID);
    res.status(200).json({
      success: true,
      message: 'The order of given id is given below',
      showOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Adding an Order
const addOrder = async (req, res) => {
  try {
    const orderAdd = new Orders({
      ...req.body,
    });
    const newOrder = await orderAdd.save();
    res.status(201).json({
      success: true,
      message: 'new order added successfully',
      newOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Updating an order by its ID

const updateOrder = async (req, res) => {
  try {
    const orderID = req.body.orderID;
    const updateData = {
      ...req.body,
    };
    const found = await Orders.findByIdAndUpdate(
      orderID,
      { $set: updateData },
      { omitUndefined: 1 }
    );
    if (!found) {
      res.status(404).json({
        success: false,
        message: 'Orders not found',
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'Order updated sucessfully',
        updateData,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Deleting an Order by its ID

const removeOrder = async (req, res) => {
  try {
    const orderID = req.body.orderID;
    await Orders.findByIdAndDelete(orderID);
    res.status(200).json({
      success: true,
      message: 'Order removed successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { listAllOrders, orderByID, addOrder, updateOrder, removeOrder };
