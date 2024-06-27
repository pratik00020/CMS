const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuitem');

// Basic APIs
// Create a new menu item
router.post('/postmenu', async (req, res) => {
  console.log('Received POST request:', req.body);
  try {
    const { menu_itemID, menu_cal_ID, timing_type, veg_nonVeg, item_categID, item_Title, enteredBy } = req.body;

    const newMenuItem = new MenuItem({
      menu_itemID,
      menu_cal_ID,
      timing_type,
      veg_nonVeg,
      item_categID,
      item_Title,
      enteredBy,
      enteredAt: new Date()
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all menu items
router.get('/getmenu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate('menu_cal_ID').populate('item_categID');
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single menu item by ID
router.get('/getmenubyID', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('menu_cal_ID').populate('item_categID');
    if (!menuItem) return res.status(404).json({ error: 'MenuItem not found' });
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a menu item by ID
router.put('/updatemenubyID', async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMenuItem) return res.status(404).json({ error: 'MenuItem not found' });
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a menu item by ID
router.delete('/delmenubyID', async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) return res.status(404).json({ error: 'MenuItem not found' });
    res.status(200).json({ message: 'MenuItem deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Advanced APIs
// Filter by timing_type
router.get('/timing/:timing_type', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ timing_type: req.params.timing_type })
          .populate('menu_cal_ID')
          .populate('item_categID');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Filter by veg_nonVeg
router.get('/veg/:veg_nonVeg', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ veg_nonVeg: req.params.veg_nonVeg })
          .populate('menu_cal_ID')
          .populate('item_categID');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Filter by date range
router.get('/date-range', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const menuItems = await MenuItem.find({
            enteredAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
        .populate('menu_cal_ID')
        .populate('item_categID');
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;