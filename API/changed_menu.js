const express = require('express');
const mongoose = require('mongoose');
const ChangedMenu = require('../models/changedMenu');
const MenuItem = require('../models/menuitem');

const router = express.Router();

// Create a new changed menu item
router.post('/postchanged', async (req, res) => {
  try {
    const { changed_menuID, menu_itemID, new_Item_Title, enteredBy, enteredAt } = req.body;
    console.log(req.body)

    const newChangedMenu = new ChangedMenu({
      changed_menuID,
      new_Item_Title,
      menu_itemID,
      enteredBy,
      enteredAt: new Date()
    });

    // Check if all required fields are present
    //if (!changed_menuID || !menu_itemID || !new_Item_Title || !enteredBy || !enteredAt) {
     // return res.status(400).json({ error: 'All fields (changed_menuID,menu_itemID, new_Item_Title, and enteredBy) are required.' });
    //}

    const savedChangedMenu = await newChangedMenu.save();
    res.status(201).json(savedChangedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all changed menu items
router.get('/', async (req, res) => {
  try {
    const changedMenus = await ChangedMenu.find().populate('menu_itemID');
    res.status(200).json(changedMenus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New route to get changed menus with additional menu item details
router.get('/with-menu-details', async (req, res) => {
  try {
    const results = await ChangedMenu.aggregate([
      {
        $lookup: {
          from: 'menuitems', // The target collection
          localField: 'menu_itemID', // Field from changedMenus
          foreignField: '_id', // Field from menuitems
          as: 'menuitem_details' // The output array field
        }
      },
      {
        $unwind: '$menuitem_details' // Unwind the array to flatten the results
      },
      {
        $project: {
          changed_menuID: 1,
          menu_itemID: 1,
          new_Item_Title: 1,
          enteredBy: 1,
          enteredAt: 1,
          menu_cal_ID: '$menuitem_details.menu_cal_ID',
          timing_type: '$menuitem_details.timing_type',
          veg_nonVeg: '$menuitem_details.veg_nonVeg'
        }
      }
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single changed menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const changedMenu = await ChangedMenu.findById(req.params.id).populate('menu_itemID');
    if (!changedMenu) return res.status(404).json({ error: 'ChangedMenu not found' });
    res.status(200).json(changedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a changed menu item by ID
router.put('/:id', async (req, res) => {
  try {
    const { menu_itemID } = req.body;

    // Validate the menu_itemID if it's being updated
    if (menu_itemID) {
      const menuItem = await MenuItem.findById(menu_itemID);
      if (!menuItem) {
        return res.status(404).json({ error: 'MenuItem not found' });
      }
    }

    const updatedChangedMenu = await ChangedMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedChangedMenu) return res.status(404).json({ error: 'ChangedMenu not found' });
    res.status(200).json(updatedChangedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a changed menu item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedChangedMenu = await ChangedMenu.findByIdAndDelete(req.params.id);
    if (!deletedChangedMenu) return res.status(404).json({ error: 'ChangedMenu not found' });
    res.status(200).json({ message: 'ChangedMenu deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;