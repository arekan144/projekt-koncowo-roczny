import { Scene, GridHelper, LoadingManager, AmbientLight, Clock, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Renderer from './Renderer';
import Camera from './Camera';
import Ico from './Ico';
import Floor from './Floor';
import Skybox from './Skybox';
import Player from './Player';
import PlayerControl from "./PlayerControl"
import SocketHandler from './SocketHandler';
import Config from './Config';

import { io } from "socket.io-client";

export default class Main {
    constructor(container) {
        this.socketHandler = new SocketHandler(io("ws://localhost:3000"))
        this.container = container;
        this.init();
    }
    init = async () => { // naprawienie tego sprawdzania, żeby tylko na jednym oknie w jednej przeglądarce
        console.log("ee")
        this.socketHandler.num.then((response) => {
            // console.log(response)
            this.num = response;
            // console.log(this.num)
            if (this.num < 3) {

                //////////

                this.scene = new Scene();
                this.renderer = new Renderer(this.scene, this.container);
                this.camera = new Camera(this.renderer);

                //////////

                this.clock = new Clock();
                this.manager = new LoadingManager();
                this.playerControl = new PlayerControl();

                //////////

                this.camera.position.set(50, 50, 50)
                const grid = new GridHelper(200, 20, "red")
                grid.translateY(1)
                this.camera.lookAt(0, 0, 0)
                this.scene.add(grid)
                this.floor = new Floor(this.scene)
                this.floor.add(0, "lightgrey", -1)
                this.ambientLight = new AmbientLight("white", 0.5)
                this.skyBox = new Skybox(this.scene);
                this.scene.add(this.ambientLight)
                this.player1 = new Player(this.scene, 0, 0, 0)
                const controls = new OrbitControls(this.camera, this.renderer.domElement)

                //////////

                this.player1.mesh.rotation.y += Math.PI / 2
                this.playerSpeed = 1;
                this.prevPos = new Vector3(this.player1.mesh.position.x, this.player1.mesh.position.y, this.player1.mesh.position.z)
                this.render();

            } else {
                console.log(this.num)
                console.log("Zaczekaj aż zwolni się miejsce!")

            }
        })
    }

    render() {
        let delta = this.clock.getDelta();
        // console.log("render leci")

        {//kontrola ruchu
            this.player1.mesh
            if (Config.turnLeft || Config.turnRight) {
                this.player1.mesh.rotateY((0.05 - 0.10 * Config.turnRight) * (Config.turnLeft ^ Config.turnRight))
            }
            if (Config.moveLeft && !Config.moveForward && !Config.moveBackward) {
                this.player1.mesh.translateZ(-this.playerSpeed)
                //check for coll

            }
            if (Config.moveRight && !Config.moveForward && !Config.moveBackward) {
                this.player1.mesh.translateZ(this.playerSpeed)
                //check for coll
            }
            if ((Config.moveRight || Config.moveLeft) && (Config.moveForward || Config.moveBackward)) {
                //check for coll
                this.player1.mesh.translateZ((Config.moveRight ^ Config.moveLeft) * (-(this.playerSpeed / 2) + this.playerSpeed * Config.moveRight))
                //check for coll
                this.player1.mesh.translateX((Config.moveBackward ^ Config.moveForward) * ((this.playerSpeed / 2) - this.playerSpeed * Config.moveBackward))

            }
            if (Config.moveForward && !Config.moveRight && !Config.moveLeft) {
                //check for coll
                this.player1.mesh.translateX(this.playerSpeed)
            }

            if (Config.moveBackward && !Config.moveRight && !Config.moveLeft) {
                this.player1.mesh.translateX(-this.playerSpeed)
                //check for coll
            }
        }
        if (!this.prevPos.equals(this.player1.mesh.position)) {
            this.socketHandler.sendData(this.player1.mesh.position)
            this.prevPos = new Vector3(this.player1.mesh.position.x, this.player1.mesh.position.y, this.player1.mesh.position.z)
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}