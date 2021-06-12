import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import Animation from "./Animation";

export default class Player {
    constructor(scene, pos_x, pos_y, pos_z) {
        this.mesh = new Mesh(
            new BoxGeometry(10, 20, 10),
            new MeshBasicMaterial({ color: "blue" })
        )
        this.mesh.translateY(this.mesh.geometry.parameters.height / 2 + 1)
        // this.animation = new Animation(this.mesh); //jak będzie model to dodamy!
        scene.add(this.mesh)
    }

}