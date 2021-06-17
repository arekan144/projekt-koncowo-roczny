import { Mesh, TextureLoader, BoxGeometry, MeshBasicMaterial, BackSide } from "three";

import bk from "./assets/arid_bk.png"
import dn from "./assets/arid_dn.png"
import ft from "./assets/arid_ft.png"
import lf from "./assets/arid_lf.png"
import rt from "./assets/arid_rt.png"
import up from "./assets/arid_up.png"

export default class Skybox extends Mesh {
    constructor(scene) {
        let texture_ft = new TextureLoader().load(bk); //x
        let texture_bk = new TextureLoader().load(dn); //
        let texture_up = new TextureLoader().load(ft); //x
        let texture_dn = new TextureLoader().load(lf); //x
        let texture_rt = new TextureLoader().load(rt); //x
        let texture_lf = new TextureLoader().load(up); //x

        super();
        this.geometry = new BoxGeometry(10000, 10000, 10000);
        this.material = [
            new MeshBasicMaterial({ color: "lightgreen", map: texture_up, side: BackSide }), //prawo od spawnu  kamera w poz(50,50,50)
            new MeshBasicMaterial({ color: "lightgreen", map: texture_ft, side: BackSide }), //lewo
            new MeshBasicMaterial({ color: "lightgreen", map: texture_lf, side: BackSide }), // góra
            new MeshBasicMaterial({ color: "lightgreen", map: texture_bk, side: BackSide }), // dół
            new MeshBasicMaterial({ color: "lightgreen", map: texture_rt, side: BackSide }), //tył
            new MeshBasicMaterial({ color: "lightgreen", map: texture_dn, side: BackSide }) // przód
        ]
        scene.add(this)
    }
}