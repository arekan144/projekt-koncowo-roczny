import { Points, SphereGeometry, PointsMaterial, TextureLoader, AdditiveBlending, Color, Vector3 } from "three"
import fireTex from "./assets/fire.png"
export default class BoomAnim extends Points {
    constructor(vct, scene) {

        const sphereGeometry = new SphereGeometry(15, 15, 15)

        const sphereMaterial = new PointsMaterial({
            color: "green",
            depthWrite: false,
            transparent: true,
            size: 2,
            map: new TextureLoader().load(fireTex),
            blending: AdditiveBlending
        })

        super(sphereGeometry, sphereMaterial)
        this.unloaded = false;
        // console.log(this)
        if (vct != undefined)
            this.position.set(vct.x, vct.y - 25, vct.z)

        scene.add(this)
    }
    changeColor = (color) => {
        this.material.color = new Color(color)
    }
    update = () => {
        this.scale.multiply(new Vector3(1.2, 1.2, 1.2))
        // console.log(this.scale)
    }
}