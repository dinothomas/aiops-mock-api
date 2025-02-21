const express = require('express');
const fs = require('fs'); // File system module
const path = require('path'); // Path module

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// Import users.json
const usersFilePath = path.join(__dirname, 'data/users.json');
let users = require(usersFilePath); // Import JSON file as a variable

// GET request - Retrieve users
app.get('/users', (req, res) => {
    res.json(users); // Return users from the JSON file
});

// POST request - Add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (!newUser.name) {
        return res.status(400).json({ message: "Name is required" });
    }

    newUser.id = Math.floor(Math.random() * 1000); // Generate a random ID
    users.push(newUser); // Add new user to the array

    // Save updated users array to users.json
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to save user data" });
        }
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    });
});

// Start the mock server
app.listen(3000, () => console.log('Mock server running on port 3000'));
