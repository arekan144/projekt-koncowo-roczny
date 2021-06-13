import { Vector2, Vector3 } from "three";

export default class SocketHandler {
    constructor(socket) {
        this.socket = socket;
        this.oplayer = null
        // this.data = null;
        if (localStorage.getItem("userID") == null) {
            this.userID = "User" + Math.floor(Math.random() * 1000);
            localStorage.setItem("userID", this.userID)
        } else {
            this.userID = localStorage.getItem("userID")
        }
        console.log(this.userID)
        this.socket.emit('getnum', this.userID);
        this.num = new Promise((resolve, reject) => {
            socket.on('getnumres', (data) => {
                console.log(data, "dud")
                resolve(data)
            })
        })
        this.socket.on('plmv', (data) => {
            let userId_num = data.split("=")[0].split(":")
            // console.log(userId_num)
            if (userId_num[1] != this.num) {
                let o = JSON.parse(data.split("=")[1])
                this.oplayer = { pos: new Vector3(o.x, o.y, o.z) }
                console.log(this.oplayer)
            }
        })
    }
    sendData(string) {
        this.socket.emit("cords", this.userID + ":" + this.num + "=" + JSON.stringify(string))
    }

}