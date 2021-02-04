
require("dotenv").config()
const express = require("express")
const app = express()

// api access
var api = require("./routes/api.router.js")
app.use("/api", api)

// render
app.get("/", (req, res) => {
    res.json({ message: "Hello NYTimes" })
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});

