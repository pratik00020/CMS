const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/connect');
//const menuRoutes = require('./api/menu');
const calendarRoutes = require('./API/calendar');

const userRoutes = require('./API/users'); // Ensure this path is correct

const app = express();

// Middleware
app.use(bodyParser.json());


// Connect to MongoDB
connectDB();

// Use the user routes
app.use('/users', userRoutes);
app.use('/calendar', calendarRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
