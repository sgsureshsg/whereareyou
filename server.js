const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve HTML files

let drivers = {}; // Save drivers location in memory

// Receive location updates
app.post('/update-location', (req, res) => {
  const { driverId, lat, lng } = req.body;
  drivers[driverId] = { lat, lng };
  res.sendStatus(200);
});

// Send current driver locations
app.get('/locations', (req, res) => {
  res.json(drivers);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
