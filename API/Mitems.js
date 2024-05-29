const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuitem');

// Basic APIs
router.post('/', async (req, res) => {
    const { menu_cal_ID, timing_type, veg_nonVeg, item_categID, item_Title, enteredBy } = req.body;
    const newMenuItem = new MenuItem({
        menu_cal_ID,
        timing_type,
        veg_nonVeg,
        item_categID,
        item_Title,
        enteredBy,
        enteredAt: new Date()
    });

    try {
        const savedMenuItem = await newMenuItem.save();
        res.status(201).json(savedMenuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
        res.status(200).json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Advanced APIs
router.get('/timing/:timing_type', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ timing_type: req.params.timing_type });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/veg/:veg_nonVeg', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ veg_nonVeg: req.params.veg_nonVeg });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/date-range', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const menuItems = await MenuItem.find({
            enteredAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;