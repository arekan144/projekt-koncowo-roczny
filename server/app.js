const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const socketIO = require("socket.io");
const get = require("./routers/get.js");
const INDEX = '/index.html';

const PORT = process.env.PORT || 3000;
const server = express()
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static("./static"))
    .use("/", get)
    .listen(PORT, () => { console.log(`Listening on ${PORT}`) })

const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});

const activeUsers = new Array();

let x = 0;
io.on('connection', (socket) => {
    let x = 0;
    console.log('Client connected');
    while (activeUsers.indexOf(x) != -1) {
        x++;
    }
    socket.socketId = x;
    activeUsers.push(socket.socketId)
    console.log(activeUsers, x)
    socket.emit('nowy', x)
    socket.on('disconnect', () => {
        console.log('Client disconnected')
        activeUsers.splice(activeUsers.indexOf(socket.userId), 1)
        console.log(activeUsers)
    });
    socket.on('cords', (string) => {
        console.log(string);
        io.emit("plmv", string)
    })
});
