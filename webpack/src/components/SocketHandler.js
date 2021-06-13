export default class SocketHandler {
    constructor(socket) {
        this.socket = socket;
        this.data = null;
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
            // console.log(data)
            this.data = data;
        })
    }
    sendData(string) {
        this.socket.emit("cords", string)
    }

}