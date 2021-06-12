export default class SocketHandler {
    constructor(socket) {
        this.socket = socket;
        this.data = null;
        this.num = new Promise((resolve, reject) => {
            if (localStorage.getItem("player") == null && localStorage.getItem("active") == null)
                socket.once('nowy', (data) => {
                    // console.log(data)
                    resolve(data)
                })
            else resolve(localStorage.getItem("player"))
        })
        // console.log(this.num)
        this.playerNum = sessionStorage.getItem("playerNum");
        this.socket.on('plmv', (data) => {
            // console.log(data)
            this.data = data;
        })
    }
    sendData(string) {
        this.socket.emit("cords", string)
    }

}