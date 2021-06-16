import { Vector2, Vector3 } from "three";

export default class SocketHandler {
    constructor(socket) {
        this.socket = socket;
        this.oplayer = {}
        this.oplayer.pos = null;
        this.oplayer.rot = null;
        this.ktowygral = "";
        this.time = 0;
        this.wyslane = false;
        // console.log(this.oplayer)
        this.koniecGry = false
        // this.data = null;
        if (localStorage.getItem("userID") == null) {
            this.userID = "User" + Math.floor(Math.random() * 1000);
            localStorage.setItem("userID", this.userID)
        } else {
            this.userID = localStorage.getItem("userID")
        }
        // console.log(this.userID)

        this.socket.emit('getnum', this.userID);
        this.num = new Promise((resolve, reject) => {
            this.socket.on('getnumres', (data) => {
                console.log(data, "twój numer")
                resolve(data)
            })
        })
        this.socket.on('plmv', (data) => {
            let userId_num = data.split("=")[0].split(":")
            // console.log(userId_num)
            if (userId_num[1] != this.num) {
                let o = JSON.parse(data.split("=")[1])
                let r = JSON.parse(data.split("=")[2])
                // console.log(r)
                // console.log(r)
                this.oplayer = {
                    pos: new Vector3(o.x, o.y, o.z),
                    rot: new Vector3(r['_x'], r['_y'], r['_z'])
                }
                // console.log(this.oplayer)
            }
        })
        this.socket.on('end', (data) => {
            this.ktowygral = data;
            this.koniecGry = true;
            this.socket.emit('getlad');
        })
        this.laderBoard = new Promise((resolve, reject) => {
            this.socket.on('ladeboard', (data) => {
                this.ladData = data;
                resolve("ok");
            })
        })
    }
    sendData(string, nd) {
        this.socket.emit("cords", this.userID + ":" + this.num + "=" + JSON.stringify(string) + "=" + JSON.stringify(nd))
    }
    endGame() {
        if (!this.wyslane)
            this.socket.emit("end", this.userID + ":" + this.num + "=" + (new Date().getTime() - this.time))
        this.wyslane = true;
    }

}