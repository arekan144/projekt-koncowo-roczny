import { BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from "three";
import twoj_plik from "./assets/tekstura.jpg"
import CustText from "./CustText";

export default class Mapblock {
    constructor(scene, pos_x, pos_y, pos_z, x, y, z, c, color, txtV) {
        // if (txtV)
        //     const { text, font } = txtV;
        this.typ = c; //zmienna która rozróżnia nam bloki
        this.mesh = new Mesh(
            new BoxGeometry(x, y, z),
            new MeshBasicMaterial({ 
                map : new TextureLoader().load(twoj_plik)
            }),
        )

        this.mesh.position.x = pos_x;
        this.mesh.position.y = pos_y + (this.mesh.geometry.parameters.height / 2 + 1);
        this.mesh.position.z = pos_z

        if (txtV) {
            const { text, font } = txtV;
            this.TextBlock = new CustText(text, font, scene)
            this.TextBlock.position.set(this.mesh.position.x, 1, this.mesh.position.z + 10)
        }

        scene.add(this.mesh)
    }

}