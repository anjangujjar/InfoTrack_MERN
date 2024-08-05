// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { verifyToken } = require('./middlewares/authMiddleware');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', verifyToken, userRoutes);

// Function to start the server and connect to MongoDB
const startServer = async () => {
    try {
        // Connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI);

        // Start the server on the specified port or default to 5000
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    } catch (err) {
        // Log any errors encountered during the connection attempt
        console.error('Failed to connect to MongoDB', err);
    }
};

// Call the startServer function to initiate the server and database connection
startServer();
