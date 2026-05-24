const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db.js');
const apiRoutes = require('./src/routes/api.js');
const errorHandler = require('./src/middleware/errorHandler.js');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json()); // Allows parsing of JSON request bodies

// Mount API Routes
app.use('/api', apiRoutes);

// Base test route
app.get('/', (req, res) => {
    res.json({ message: 'AI Learning Platform API is running successfully!' });
});

// Global Error Handler Middleware (Must be mounted AFTER all routes)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});