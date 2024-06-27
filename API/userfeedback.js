const express = require('express');
const mongoose = require('mongoose');
const UserFeedback = require('../models/T_userfeedback'); 
const MenuItem = require('../models/menuitem');
const router = express.Router();

// Basic APIs
// Create a new user feedback
router.post('/postfeed', async (req, res) => {
    console.log('POST / - Create a new user feedback');
    console.log('Request Body:', req.body);
  
    try {
      const { User_ID, MenuItem_ID, rating, remarks } = req.body;
  
      // Validate the MenuItem_ID
      console.log('Looking for MenuItem with menu_itemID:', MenuItem_ID);
      const menuItem = await MenuItem.findOne({ menu_itemID: MenuItem_ID });
      if (!menuItem) {
        console.log('MenuItem not found');
        return res.status(404).json({ error: 'MenuItem not found' });
      }
  
      console.log('Found MenuItem:', menuItem);
  
      const newUserFeedback = new UserFeedback({
        User_ID,
        MenuItem_ID: menuItem._id, // Use the ObjectId of the found menu item
        rating,
        remarks,
        enteredAt: new Date()
      });
  
      const savedUserFeedback = await newUserFeedback.save();
      console.log('New User Feedback Saved:', savedUserFeedback);
      res.status(201).json(savedUserFeedback);
    } catch (error) {
      console.error('Error creating user feedback:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all user feedbacks
  router.get('/', async (req, res) => {
    console.log('GET / - Get all user feedbacks');
    
    try {
      const userFeedbacks = await UserFeedback.find()
        .populate('User_ID')
        .populate('MenuItem_ID');
      console.log('User Feedbacks Retrieved:', userFeedbacks);
      res.status(200).json(userFeedbacks);
    } catch (error) {
      console.error('Error retrieving user feedbacks:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a user feedback by ID
  router.get('/:id', async (req, res) => {
    console.log(`GET /:id - Get a user feedback by ID: ${req.params.id}`);
    
    try {
      const userFeedback = await UserFeedback.findById(req.params.id)
        .populate('User_ID')
        .populate('MenuItem_ID');
      if (!userFeedback) {
        console.error('UserFeedback not found');
        return res.status(404).json({ error: 'UserFeedback not found' });
      }
      console.log('User Feedback Retrieved:', userFeedback);
      res.status(200).json(userFeedback);
    } catch (error) {
      console.error('Error retrieving user feedback:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a user feedback by ID
  router.put('/:id', async (req, res) => {
    console.log(`PUT /:id - Update a user feedback by ID: ${req.params.id}`);
    console.log('Request Body:', req.body);
    
    try {
      const updatedUserFeedback = await UserFeedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUserFeedback) {
        console.error('UserFeedback not found');
        return res.status(404).json({ error: 'UserFeedback not found' });
      }
      console.log('User Feedback Updated:', updatedUserFeedback);
      res.status(200).json(updatedUserFeedback);
    } catch (error) {
      console.error('Error updating user feedback:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a user feedback by ID
  router.delete('/:id', async (req, res) => {
    console.log(`DELETE /:id - Delete a user feedback by ID: ${req.params.id}`);
    
    try {
      const deletedUserFeedback = await UserFeedback.findByIdAndDelete(req.params.id);
      if (!deletedUserFeedback) {
        console.error('UserFeedback not found');
        return res.status(404).json({ error: 'UserFeedback not found' });
      }
      console.log('User Feedback Deleted:', deletedUserFeedback);
      res.status(200).json({ message: 'UserFeedback deleted' });
    } catch (error) {
      console.error('Error deleting user feedback:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Advanced APIs
  // Filter feedback by user
  router.get('/user/:userId', async (req, res) => {
    console.log(`GET /user/:userId - Filter feedback by user ID: ${req.params.userId}`);
    
    try {
      const userFeedbacks = await UserFeedback.find({ User_ID: req.params.userId })
        .populate('User_ID')
        .populate('MenuItem_ID');
      console.log('User Feedbacks for User:', userFeedbacks);
      res.status(200).json(userFeedbacks);
    } catch (error) {
      console.error('Error filtering feedback by user:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Filter feedback by menu item
  router.get('/menuitem/:menuItemId', async (req, res) => {
    console.log(`GET /menuitem/:menuItemId - Filter feedback by menu item ID: ${req.params.menuItemId}`);
    
    try {
      const userFeedbacks = await UserFeedback.find({ MenuItem_ID: req.params.menuItemId })
        .populate('User_ID')
        .populate('MenuItem_ID');
      console.log('User Feedbacks for Menu Item:', userFeedbacks);
      res.status(200).json(userFeedbacks);
    } catch (error) {
      console.error('Error filtering feedback by menu item:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Filter feedback by rating range
  router.get('/rating', async (req, res) => {
    const { minRating, maxRating } = req.query;
    console.log(`GET /rating - Filter feedback by rating range: ${minRating} - ${maxRating}`);
    
    try {
      const userFeedbacks = await UserFeedback.find({
        rating: {
          $gte: minRating,
          $lte: maxRating
        }
      })
      .populate('User_ID')
      .populate('MenuItem_ID');
      console.log('User Feedbacks for Rating Range:', userFeedbacks);
      res.status(200).json(userFeedbacks);
    } catch (error) {
      console.error('Error filtering feedback by rating range:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
