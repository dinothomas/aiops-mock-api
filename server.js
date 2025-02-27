const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Import json
const usersFilePath = path.join(__dirname, "data/users.json");
let users = require(usersFilePath);

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.name) {
    return res.status(400).json({ message: "Name is required" });
  }

  newUser.id = Math.floor(Math.random() * 1000);
  users.push(newUser);

  fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to save user data" });
    }
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  });
});

app.post("/businessService/view", (req, res) => {
  const newUser = req.body;

  return res.status(200).json({
    statusCode: "200",
    statusMessage: "Business service fetched successfully.",
    responseBody: {
      totalRecords: 1,
      businessServices: [
        {
          name: "Project Alpha",
          projectId: 101,
          criticality: "High",
          owner: "Alice Johnson",
          createdBy: "Alice Johnson",
          updatedBy: "Bob Smith",
          createdTS: "2025-02-01T10:30:00Z",
          updatedTS: "2025-02-15T14:45:00Z",
          description: "First phase of Alpha initiative",
          type: "Software",
          status: "Active",
          retired: false,
        },
        {
          name: "Project Beta",
          projectId: 102,
          criticality: "Medium",
          owner: "Bob Smith",
          createdBy: "Bob Smith",
          updatedBy: "Charlie Davis",
          createdTS: "2025-01-12T09:15:00Z",
          updatedTS: "2025-02-10T16:30:00Z",
          description: "Beta phase implementation",
          type: "Infrastructure",
          status: "In Progress",
          retired: false,
        },
        {
          name: "Project Gamma",
          projectId: 103,
          criticality: "Low",
          owner: "Charlie Davis",
          createdBy: "Charlie Davis",
          updatedBy: "David Brown",
          createdTS: "2025-02-05T11:00:00Z",
          updatedTS: "2025-02-20T12:15:00Z",
          description: "Testing and QA for Gamma",
          type: "Research",
          status: "Pending",
          retired: false,
        },
      ],
    },
  });
});

// Start the mock server
app.listen(3000, () => console.log("Mock server running on port 3000"));
