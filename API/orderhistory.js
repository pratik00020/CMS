const express = require('express');
const OrderHistory = require('../models/orderhistory');

const router = express.Router();

// Create a new order history entry
router.post('/', async (req, res) => {
  try {
    const { orderBy, orderedAt, orderType, menu_Id, MenuItem_cal_ID } = req.body;

    const newOrderHistory = new OrderHistory({
      orderBy,
      orderedAt,
      orderType,
      menu_Id,
      MenuItem_cal_ID
    });

    const savedOrderHistory = await newOrderHistory.save();
    res.status(201).json(savedOrderHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all order history entries
router.get('/', async (req, res) => {
  try {
    const orderHistory = await OrderHistory.find();
    res.status(200).json(orderHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single order history entry by ID
router.get('/:id', async (req, res) => {
  try {
    const orderHistory = await OrderHistory.findById(req.params.id);
    if (!orderHistory) return res.status(404).json({ error: 'Order history not found' });
    res.status(200).json(orderHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an order history entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedOrderHistory = await OrderHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrderHistory) return res.status(404).json({ error: 'Order history not found' });
    res.status(200).json(updatedOrderHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an order history entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrderHistory = await OrderHistory.findByIdAndDelete(req.params.id);
    if (!deletedOrderHistory) return res.status(404).json({ error: 'Order history not found' });
    res.status(200).json({ message: 'Order history deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
