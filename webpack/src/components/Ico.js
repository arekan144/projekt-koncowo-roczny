import {
    IcosahedronGeometry,
    MeshNormalMaterial,
    Mesh,
    DoubleSide,
} from "three";

export default class Ico extends Mesh {

    constructor(scene) {
        super(new IcosahedronGeometry(50), new MeshNormalMaterial({ side: DoubleSide }))
        scene.add(this)
    }
    // obrót
    update() {
        this.rotation.y += 0.01
    }

}