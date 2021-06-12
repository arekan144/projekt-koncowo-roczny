const express = require("express");

const path = require("path");
const socketIO = require("socket.io");
const get = require("./routers/get.js")
const INDEX = '/index.html';

const PORT = process.env.PORT || 3000;
const server = express()
    .use(express.static("./static"))
    .use("/", get)
    .listen(PORT, () => console.log(`Listening on ${PORT}`));


const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});