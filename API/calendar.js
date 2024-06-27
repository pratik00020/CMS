const express = require('express');
const router = express.Router();
const MenuCalendar = require('../models/menucalendar'); // Importing the MenuCalendar model

// Helper function to parse date
const parseDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? null : date;
  };
  
  // Create a new calendar entry
  router.post('/postcal', async (req, res) => {
        try {
          const { cal_ID, cal_date, enteredBy, enteredAt } = req.body;
      
          if (!cal_ID) {
            return res.status(400).json({ message: 'cal_ID is required' });
          }
      
          const parsedCalDate = parseDate(cal_date);
          const parsedEnteredAt = parseDate(enteredAt);
      
          if (!parsedCalDate || !parsedEnteredAt) {
            return res.status(400).json({ message: 'Invalid date format' });
          }
      
          const newEntry = new MenuCalendar({
            cal_ID,
            cal_date: parsedCalDate,
            enteredBy,
            enteredAt: parsedEnteredAt,
          });
      
          const savedEntry = await newEntry.save();
          res.status(201).json(savedEntry);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      });
  
  // Get all calendar entries
  router.get('/', async (req, res) => {
    try {
      const entries = await MenuCalendar.find();
      res.json(entries);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update a calendar entry by ID
  router.put('/:id', getMenuCalendarEntry, async (req, res) => {
    if (req.body.cal_ID != null) {
      res.entry.cal_ID = req.body.cal_ID;
    }
    if (req.body.cal_date != null) {
      res.entry.cal_date = req.body.cal_date;
    }
    if (req.body.enteredBy != null) {
      res.entry.enteredBy = req.body.enteredBy;
    }
    if (req.body.enteredAt != null) {
      res.entry.enteredAt = req.body.enteredAt;
    }
  
    try {
      const updatedEntry = await res.entry.save();
      res.json(updatedEntry);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a calendar entry by ID
  router.delete('/:id', getMenuCalendarEntry, async (req, res) => {
    try {
      await res.entry.remove();
      res.json({ message: 'Deleted MenuCalendar entry' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Middleware to get a MenuCalendar entry by ID
  async function getMenuCalendarEntry(req, res, next) {
    let entry;
    try {
      entry = await MenuCalendar.findOne({ cal_ID: req.params.id });
      if (entry == null) {
        return res.status(404).json({ message: 'Cannot find entry' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.entry = entry;
    next();
  }
  
  module.exports = router;
