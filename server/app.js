const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("static"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer na ${PORT}.`)
})

app.get("/", (req, res) => {
    res.sendFile("./start.html")
})