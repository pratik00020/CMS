const express = require('express');
const router = express.Router();
const User = require('../models/usermaster'); // Ensure this path is correct

// Route to create a new user
router.post('/register', async (req, res) => {
    const { User_ID, userType, email, MobNo, Name, enteredBy } = req.body;
    const newUser = new User({ User_ID, userType, email, MobNo, Name, enteredBy });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route to get all users
router.get('/getusers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route to get a user by ID
router.get('/getoneuser', async (req, res) => {
    try {
        const user = await User.findOne({ User_ID: req.params.id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route to update a user
router.put('/updateuser', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ User_ID: req.params.id }, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a user
router.delete('/deleteuser', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ User_ID: req.params.id });
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
