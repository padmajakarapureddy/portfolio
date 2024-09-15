const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow cross-origin requests

// POST endpoint to handle tracking
app.post('/track-time', (req, res) => {
    const data = req.body;

    // Validate that both 'page' and 'timeSpent' fields are present
    if (!data.page || !data.timeSpent) {
        return res.status(400).send('Invalid request. "page" and "timeSpent" are required.');
    }

    // Create a log entry
    const logEntry = `Page: ${data.page}, Time Spent: ${data.timeSpent}ms\n`;

    // Append the log entry to the file
    fs.appendFile('page_tracking.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Data received and logged');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
