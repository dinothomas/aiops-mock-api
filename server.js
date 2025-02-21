const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// GET request - Retrieve users
app.get('/users', (req, res) => {
    res.json([
        { "id": 1, "name": "John Doe" },
        { "id": 2, "name": "Jane Doe" }
    ]);
});

// POST request - Add a new user
app.post('/users', (req, res) => {
    const newUser = req.body; // Extract user data from request body

    if (!newUser.name) {
        return res.status(400).json({ message: "Name is required" });
    }

    newUser.id = Math.floor(Math.random() * 1000); // Generate a random ID

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

// Start the mock server
app.listen(3000, () => console.log('Mock server running on port 3000'));
