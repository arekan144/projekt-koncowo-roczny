import { Mesh, ShadowMaterial, MeshLambertMaterial, TextureLoader, PlaneGeometry, MeshPhongMaterial, MeshBasicMaterial, FrontSide, Vector3, MeshStandardMaterial, RepeatWrapping } from "three"

export default class Floor {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.shadowGeter = null;
        this.geometry = null;
        this.shadowTexture = null;
        this.texture = null
    }

    add(pos_y, color, d) {

        this.texture = new MeshStandardMaterial({
            side: FrontSide,
            color: color,
        })

        this.geometry = new PlaneGeometry(10000, 10000);

        this.mesh = new Mesh(this.geometry, this.texture)

        this.mesh.receiveShadow = true
        this.mesh.translateY(pos_y)

        // this.scene.add(this.shadowGeter)
        // this.mesh.position = new Vector3(pos_x, pos_y, pos_z)
        this.scene.add(this.mesh)
        this.mesh.rotation.x = this.mesh.rotation.x + (d * Math.PI / 2)

    }


}