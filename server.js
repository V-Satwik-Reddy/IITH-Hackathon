// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

// Middleware to allow cross-origin requests and parse JSON data
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB cluster
mongoose.connect('mongodb+srv://Satwik:satwik30@iith-hackathon.hwnty.mongodb.net/', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Define User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    bookings: [{
        eventName: String,
        date: String,
        location: String,
        tickets: Number,
        price: Number,
        status: String
    }]
});

// Create User model
const User = mongoose.model('User', userSchema);

// Handle POST request to save user to MongoDB
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email and password are required.');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already registered.');
        }

        // Save the new user
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Handle POST request for user login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email and password are required.');
        }

        // Check if user exists and password matches
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).send('Invalid email or password.');
        }

        res.status(200).send('Logged in successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Handle POST request to add a booking for a user
app.post('/addBooking', async (req, res) => {
    try {
        const { email, booking } = req.body;
        if (!email || !booking) {
            return res.status(400).send('Email and booking data are required.');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Add booking to user's account
        user.bookings.push(booking);
        await user.save();
        res.status(200).send('Booking added successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Handle GET request to fetch all bookings for a user
app.get('/getBookings/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.status(200).json(user.bookings);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    