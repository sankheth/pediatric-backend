const express = require('express');
const cors = require('cors'); // Essential for Netlify to talk to Render
const app = express();
const PORT = process.env.PORT || 10000;

// 1. Middlewares
app.use(cors()); // This allows your Netlify website to access the data
app.use(express.json()); // This allows the server to read JSON from your ESP32

// 2. Global variable to store the latest sensor reading
let latestGasValue = "Waiting..."; 

// 3. ROUTE FOR ESP32: Receives data from hardware
// URL: https://pediatric-backend.onrender.com/api/sensor-data
app.post('/api/sensor-data', (req, res) => {
    console.log("Data received from ESP32:", req.body);
    
    if (req.body && req.body.gas_value) {
        latestGasValue = req.body.gas_value; // Stores the value
        res.status(200).send("Data stored successfully");
    } else {
        res.status(400).send("Invalid data format");
    }
});

// 4. ROUTE FOR WEBSITE: Sends data to your Netlify app
// URL: https://pediatric-backend.onrender.com/api/get-gas-data
app.get('/api/get-gas-data', (req, res) => {
    // This must match the key 'gas_value' used in your script.js
    res.json({ "gas_value": latestGasValue }); 
});

// 5. Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

