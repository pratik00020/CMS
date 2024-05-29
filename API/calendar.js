const express = require('express');
const router = express.Router();
const MenuCalendar = require('../models/menucalendar'); // Importing the MenuCalendar model

// Basic APIs

// POST /api/calendar
// This route handles the creation of a new calendar entry.
router.post('/CalEntry', async (req, res) => {
    console.log('POST /CalEntry endpoint hit');
    const { cal_date, enteredBy } = req.body;
    console.log('Request body:', req.body);

    if (!cal_date) {
        return res.status(400).json({ error: 'cal_date is required' });
    }
    if (!enteredBy) {
        return res.status(400).json({ error: 'enteredBy is required' });
    }

    const [day, month, year] = cal_date.split('/');
    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate)
    if (isNaN(formattedDate)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    const newCalendarEntry = new MenuCalendar({
        Cal_date: formattedDate,
        enteredBy,
        enteredAt: new Date()
    });

    try {
        const savedCalendarEntry = await newCalendarEntry.save();
        res.status(201).json(savedCalendarEntry);
    } catch (error) {
        console.error('Error saving calendar entry:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/calendar
// This route retrieves all calendar entries from the database.
router.get('/getcal', async (req, res) => {
    try {
        // Finding all entries in the MenuCalendar collection
        const calendarEntries = await MenuCalendar.find();
        // Responding with the list of calendar entries
        res.status(200).json(calendarEntries);
    } catch (error) {
        // Handling any errors that occur during retrieval
        res.status(500).json({ error: error.message });
    }
});

// GET /api/calendar/:id
// This route retrieves a specific calendar entry by its ID.
router.get('/GetCalID', async (req, res) => {
    try {
        // Finding a calendar entry by ID
        const calendarEntry = await MenuCalendar.findById(req.params.id);
        if (!calendarEntry) return res.status(404).json({ error: 'Calendar entry not found' });
        // Responding with the found calendar entry
        res.status(200).json(calendarEntry);
    } catch (error) {
        // Handling any errors that occur during retrieval
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/calendar/:id
// This route updates a specific calendar entry by its ID.
router.put('/PutCalID', async (req, res) => {
    try {
        // Finding a calendar entry by ID and updating it with the provided data
        const calendarEntry = await MenuCalendar.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!calendarEntry) return res.status(404).json({ error: 'Calendar entry not found' });
        // Responding with the updated calendar entry
        res.status(200).json(calendarEntry);
    } catch (error) {
        // Handling any errors that occur during update
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/calendar/:id
// This route deletes a specific calendar entry by its ID.
router.delete('/DelCalID', async (req, res) => {
    try {
        // Finding a calendar entry by ID and deleting it
        const calendarEntry = await MenuCalendar.findByIdAndDelete(req.params.id);
        if (!calendarEntry) return res.status(404).json({ error: 'Calendar entry not found' });
        // Responding with a success message
        res.status(200).json({ message: 'Calendar entry deleted' });
    } catch (error) {
        // Handling any errors that occur during deletion
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; // Exporting the router to be used in the main server file
