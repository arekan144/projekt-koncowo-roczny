import { Mesh, MeshBasicMaterial, TextGeometry } from "three"

export default class CustText extends Mesh {
    constructor(text, font, scene) {
        const geT = new TextGeometry(text, {
            font: font,
            size: 15,
            height: 1,
            curveSegments: 1,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 0.25,
            bevelOffset: 0.25,
            bevelSegments: 1
        })
        const meT = new MeshBasicMaterial({ color: "green", wireframe: false, })
        
        //tutaj jakbyco można zmienić kolor, itp.
        super(geT, meT)
        scene.add(this)
    }
}