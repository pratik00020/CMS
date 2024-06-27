const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/connect');

const calendarRoutes = require('./API/calendar');
const userRoutes = require('./API/users'); 
const menuItemRoutes = require('./API/Mitems');
const changedMenuRoutes = require('./API/changed_menu'); 
const userFeedbackRoutes = require('./API/userfeedback');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use the routes
app.use('/users', userRoutes);
app.use('/calendar', calendarRoutes); 
app.use('/menu', menuItemRoutes);
app.use('/changedMenu', changedMenuRoutes);
app.use('/feedback', userFeedbackRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
