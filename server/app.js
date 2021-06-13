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

const activeUsers = new Map();
const aWindows = new Map();

io.on('connection', (socket) => {

    console.log('Client connected');
    // socket.ID = "User" + Math.floor(Math.random() * 1000);
    // activeUsers.set(socket.ID, null)

    socket.on('getnum', (string) => {
        let toReturn = 0;
        if (activeUsers.get(string) == null) {
            while ([...activeUsers.values()].indexOf(toReturn) != -1) {
                toReturn++;
            }
            console.log(toReturn, "nowy")
            socket.ID = string;
            activeUsers.set(string, toReturn);
            aWindows.set(string, 1)
        } else {
            console.log(activeUsers.get(socket.ID), "stary")
            socket.ID = string;
            toReturn = activeUsers.get(socket.ID);
            let xW = aWindows.get(string)
            aWindows.set(string, ++xW)
        }
        console.log(activeUsers, aWindows)
        socket.emit('getnumres', toReturn)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
        let xW = aWindows.get(socket.ID)
        aWindows.set(socket.ID, --xW)
        if (aWindows.get(socket.ID) < 1)
            activeUsers.delete(socket.ID)
        console.log(activeUsers, aWindows)
    });

    socket.on('cords', (string) => {
        console.log(string);
        io.emit("plmv", string)
    });
});
