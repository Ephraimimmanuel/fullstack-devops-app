const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from Backend running in Docker on EC2"
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});