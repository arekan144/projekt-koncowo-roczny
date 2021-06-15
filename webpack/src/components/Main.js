import { Scene, GridHelper, LoadingManager, AmbientLight, Clock, Vector3, Color, Box3 } from 'three';
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
import Mapblock from './Map';
import Collisions from './Collisions';
import { io } from "socket.io-client";

export default class Main {
    constructor(container) {
        this.socketHandler = new SocketHandler(io("ws://localhost:3000"))
        this.container = container;
        this.koniecGry = false;
        this.init();
    }
    init = async () => { // naprawienie tego sprawdzania, żeby tylko na jednym oknie w jednej przeglądarce

        console.log("ee")
        this.socketHandler.num.then((response) => {
            // console.log(response)
            this.num = response;
            this.socketHandler.num = this.num
            // console.log(this.num)
            if (this.num < 2) {

                //////////

                this.scene = new Scene();
                this.renderer = new Renderer(this.scene, this.container);
                this.camera = new Camera(this.renderer);

                //////////

                this.clock = new Clock();
                this.manager = new LoadingManager();
                this.playerControl = new PlayerControl();

                //////////


                const grid = new GridHelper(200, 20, "red")
                grid.translateY(1)

                this.scene.add(grid)
                this.floor = new Floor(this.scene)
                this.floor.add(0, "lightgrey", -1)
                this.ambientLight = new AmbientLight("white", 0.5)
                this.skyBox = new Skybox(this.scene);
                this.scene.add(this.ambientLight)
                this.player1 = new Player(this.scene, 0, 0, 0)
                this.player2 = new Player(this.scene, 0, 0, 0)
                let sciana1 = new Mapblock(this.scene, -90, 0, -400, 20, 50, 1000, 'black', 'black') //bloki mapy, osx, osy, osz, szer, wys, dlug, kolor
                let sciana2 = new Mapblock(this.scene, 90, 0, -400, 20, 50, 1000, 'black', 'black')
                let mapblock3 = new Mapblock(this.scene, -55, 0, -100, 50, 50, 20, 'yellow', 'yellow')
                let mapblock4 = new Mapblock(this.scene, 0, 0, -100, 60, 50, 20, 'brown', 'brown')
                let mapblock5 = new Mapblock(this.scene, 55, 0, -100, 50, 50, 20, 'yellow', 'yellow')
                let mapblock6 = new Mapblock(this.scene, -55, 0, -300, 50, 50, 20, 'brown', 'brown')
                let mapblock7 = new Mapblock(this.scene, 0, 0, -300, 60, 50, 20, 'yellow', 'yellow')
                let mapblock8 = new Mapblock(this.scene, 55, 0, -300, 50, 50, 20, 'yellow', 'yellow')
                let mapblock9 = new Mapblock(this.scene, -55, 0, -500, 50, 50, 20, 'brown', 'brown')
                let mapblock10 = new Mapblock(this.scene, 0, 0, -500, 60, 50, 20, 'yellow', 'yellow')
                let mapblock11 = new Mapblock(this.scene, 55, 0, -500, 50, 50, 20, 'yellow', 'yellow')
                let mapblock12 = new Mapblock(this.scene, -55, 0, -700, 50, 50, 20, 'brown', 'brown')
                let mapblock13 = new Mapblock(this.scene, 0, 0, -700, 60, 50, 20, 'yellow', 'yellow')
                let mapblock14 = new Mapblock(this.scene, 55, 0, -700, 50, 50, 20, 'yellow', 'yellow')

                this.map = [
                    new Mapblock(this.scene, 0, 0, 100, 200, 50, 20, 'black', 'black'),
                    //bloki mapy,            osx, osy, osz, szer, wys, dlug, kolor
                    new Mapblock(this.scene, 0, 0, -900, 200, 50, 20, 'black', 'black'),
                    sciana1, sciana2, //0-3 ściany
                    mapblock3, mapblock4, mapblock5, //4 - 15 bloki odpowiedzi
                    mapblock6, mapblock7, mapblock8,
                    mapblock9, mapblock10, mapblock11,
                    mapblock12, mapblock13, mapblock14,
                    new Mapblock(this.scene, 0, 0, -800, 50, 5, 50, 'green', 'green')
                    //bloki mapy,            osx, osy, osz, szer, wys, dlug, kolor
                ] // wstawmy to do jednej tablicy.
                // console.log(this.map[16])
                this.player2.mesh.material.color = new Color("red")
                // this.camera.lookAt(this.player1.mesh.position)

                this.socketHandler.oplayer = { pos: new Vector3(this.player2.mesh.position.x, this.player2.mesh.position.y, this.player2.mesh.position.z), rot: new Vector3(this.player2.mesh.rotation.x, this.player2.mesh.rotation.y, this.player2.mesh.rotation.z) }
                // const controls = new OrbitControls(this.camera, this.renderer.domElement)
                //jeżeli kamera podąża to usuńmy to ^
                let walls = [this.map[0].mesh, this.map[1].mesh, this.map[2].mesh, this.map[3].mesh]
                // walls = [...wals, ]
                this.stopColision = new Collisions(walls, this.player1.mesh, this.scene)
                let wrong = [];
                let right = [];
                this.map.forEach(mapElement => {
                    if (mapElement.typ == "yellow") {
                        wrong.push(mapElement.mesh)
                    }
                    if (mapElement.typ == "brown") {
                        right.push(mapElement.mesh)
                    }
                });

                this.winBox = new Box3()
                // console.log(this.map[16])
                this.winBox.setFromObject(this.map[16].mesh)

                this.badColision = new Collisions(wrong, this.player1.mesh, this.scene)
                this.goodColision = new Collisions(right, this.player1.mesh, this.scene)

                //////////
                // console.log(wrong, right);

                this.camera.position.set(20, 50, 20)

                this.player1.mesh.rotation.y += Math.PI / 2
                this.playerSpeed = 2;
                this.prevPos = new Vector3(this.player1.mesh.position.x, this.player1.mesh.position.y, this.player1.mesh.position.z)
                this.prevRot = new Vector3(this.player1.mesh.rotation.x, this.player1.mesh.rotation.y, this.player1.mesh.rotation.z)
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
        // this.camera.position.set(this.player1.mesh.position.x, 80, this.player1.mesh.position.z - 10)
        {//kontrola ruchu
            // this.player1.mesh
            if (Config.turnLeft || Config.turnRight) {
                this.player1.mesh.rotateY((0.05 - 0.10 * Config.turnRight) * (Config.turnLeft ^ Config.turnRight))
            }
            if (Config.moveLeft && !Config.moveForward && !Config.moveBackward) {
                this.player1.mesh.translateZ(-this.playerSpeed)
                //check for coll
                while (this.stopColision.update().length > 0) {
                    this.player1.mesh.translateZ(this.playerSpeed / 100)
                }
            }
            if (Config.moveRight && !Config.moveForward && !Config.moveBackward) {
                this.player1.mesh.translateZ(this.playerSpeed)
                //check for coll
                while (this.stopColision.update().length > 0) {
                    this.player1.mesh.translateZ(-this.playerSpeed / 100)
                }
            }
            if ((Config.moveRight || Config.moveLeft) && (Config.moveForward || Config.moveBackward)) {

                this.player1.mesh.translateZ((Config.moveRight ^ Config.moveLeft) * (-(this.playerSpeed / 2) + this.playerSpeed * Config.moveRight))
                //check for coll
                let tab = this.stopColision.update();
                while (tab.length > 0) {
                    this.player1.mesh.translateZ(-((Config.moveRight ^ Config.moveLeft) * (-(this.playerSpeed / 2) + this.playerSpeed * Config.moveRight)))
                    tab = this.stopColision.update();
                }

                this.player1.mesh.translateX((Config.moveBackward ^ Config.moveForward) * ((this.playerSpeed / 2) - this.playerSpeed * Config.moveBackward))
                //check for coll
                tab = this.stopColision.update();
                while (tab.length > 0) {
                    this.player1.mesh.translateX(-((Config.moveBackward ^ Config.moveForward) * ((this.playerSpeed / 2) - this.playerSpeed * Config.moveBackward)))
                    tab = this.stopColision.update();
                }
            }
            if (Config.moveForward && !Config.moveRight && !Config.moveLeft) {
                this.player1.mesh.translateX(this.playerSpeed)
                //check for coll
                while (this.stopColision.update().length > 0) {
                    this.player1.mesh.translateX(-this.playerSpeed / 100)
                }
            }

            if (Config.moveBackward && !Config.moveRight && !Config.moveLeft) {
                this.player1.mesh.translateX(-this.playerSpeed)
                //check for coll
                while (this.stopColision.update().length > 0) {
                    this.player1.mesh.translateX(this.playerSpeed / 100)
                }
            }
        }
        let spr = this.badColision.update();
        if (spr.length > 0) {
            this.player1.mesh.position.set(0, this.player1.mesh.position.y, 0)
        }
        spr = this.goodColision.update();

        if (spr.length > 0 && spr) {
            if (spr[0].material.visible) {// tutaj jakieś efekty, narazie znika!
                // console.log("it")
                this.scene.remove(spr[0])
                spr[0].material.visible = false; //musi być!
            }
        }

        if (!this.prevPos.equals(this.player1.mesh.position) || this.prevRot.y != this.player1.mesh.rotation.y) {
            this.socketHandler.sendData(this.player1.mesh.position, this.player1.mesh.rotation)
            this.prevPos = new Vector3(this.player1.mesh.position.x, this.player1.mesh.position.y, this.player1.mesh.position.z)
            this.prevRot = new Vector3(this.player1.mesh.rotation.x, this.player1.mesh.rotation.y, this.player1.mesh.rotation.z)
        }
        // console.log(this.socketHandler.oplayer)
        // console.log(this.socketHandler.oplayer.rot.x)
        if (!this.socketHandler.oplayer.pos.equals(this.player2.mesh.position) || this.socketHandler.oplayer.rot.y != this.player2.mesh.rotation.y) {
            this.player2.mesh.position.set(this.socketHandler.oplayer.pos.x, this.socketHandler.oplayer.pos.y, this.socketHandler.oplayer.pos.z)
            this.player2.mesh.rotation.set(this.socketHandler.oplayer.rot.x, this.socketHandler.oplayer.rot.y, this.socketHandler.oplayer.rot.z)
            // console.log(this.player2.mesh.rotation)
        }

        // this.goodColision.update();
        let p1box3 = new Box3();
        p1box3.setFromObject(this.player1.mesh)
        // console.log(this.winBox)
        if (p1box3.intersectsBox(this.winBox)) {
            // console.log(this.goodColision.meshBox.intersect(this.winBox))
            console.log("WIN")
            this.socketHandler.endGame();
        }
        this.camera.position.set(this.player1.mesh.position.x, this.player1.mesh.position.y + 20, this.player1.mesh.position.z + 50) //kamera porusza sie za graczem
        this.camera.lookAt(this.player1.mesh.position)
        this.renderer.render(this.scene, this.camera);
        if (!this.socketHandler.koniecGry)
            requestAnimationFrame(this.render.bind(this));
        else {
            console.log("Wygrał gracz: " + this.socketHandler.ktowygral)
        }
    }
}
