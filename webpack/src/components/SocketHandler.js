export default class SocketHanler {
    constructor(socket) {
        this.socket = socket;
        this.socket.on('plmv', function (data) {
            console.log(data)
        })
        
    }

}