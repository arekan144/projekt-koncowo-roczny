import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export default class mapblock {
    constructor(scene, pos_x, pos_y, pos_z, x, y, z, color) {
        this.mesh = new Mesh(
            new BoxGeometry(x, y, z),
            new MeshBasicMaterial({ color: color }),

        )
        this.mesh.position.x = pos_x,
        this.mesh.position.y = pos_y + (this.mesh.geometry.parameters.height / 2 +1),
        this.mesh.position.z = pos_z
        scene.add(this.mesh)
    }

}