const express = require('express');
const cors = require('cors'); // 1. Import CORS
const app = express();

// 2. Enable CORS 
// This allows ALL domains to access your API. 
// For better security later, you can restrict it to your specific website URL.
app.use(cors()); 

// Middleware to parse JSON bodies
app.use(express.json()); 

// Route for Arduino or Website
app.post('/api/sensor-data', (req, res) => {
    console.log("Data received:", req.body);
    res.status(200).json({
        message: "Server got the data!",
        received: req.body
    });
});

// Route for Website to GET data (Example)
app.get('/api/sensor-data', (req, res) => {
    res.status(200).json({ status: "Online", sensor: "Active" });
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
