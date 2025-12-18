const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); 

// This is the route the Arduino will "POST" to
app.post('/api/sensor-data', (req, res) => {
    // req.body will contain the JSON sent by the Arduino
    console.log("Data received from Arduino:", req.body);
    
    // Always send a response back to the Arduino to close the connection
    res.status(200).send("Server got the data!");
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(Server is running on port ${PORT});
});