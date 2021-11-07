import Orders from '../models/Orders.js';

// Adding an Order
const addOrder = async (req, res) => {
  try {
    const orderAdd = new Orders({
      ...req.body,
      orderPlacer: req.user._id,
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

// call the orders of users

const orderByID = async (req, res) => {
  try {
    const showOrder = await Orders.find({ orderPlacer: req.user._id });
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

// Updating an order by its ID

const updateOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    const found = await Orders.findOne({
      _id: orderID,
      orderPlacer: req.user._id,
    });
    const updateData = {
      ...req.body,
    };
    await found.updateOne({ $set: updateData }, { omitUndefined: 1 });
    if (!found) {
      return res.status(404).json({
        success: false,
        message: 'Orders not found',
      });
    }
    res.status(201).json({
      success: true,
      message: 'Order updated sucessfully',
      updateData,
    });
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
    const orderID = req.params.id;
    const order = await Orders.findOne({
      _id: orderID,
      orderPlacer: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    await Orders.deleteOne(order);
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

export { orderByID, addOrder, updateOrder, removeOrder };
