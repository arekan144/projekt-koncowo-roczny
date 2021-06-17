import {
    MD2Loader
} from './MD2Loader'
import {
    BoxGeometry,
    Mesh,
    MeshPhongMaterial,
    Object3D,
    TextureLoader
} from 'three'

export default class Player extends Object3D {
    constructor(manager) {
        super()
        this.manager = manager
        this.mesh = null
        this.geometry = null
    }
    load(path, texture) {
        new MD2Loader(this.manager).load(
            path,
            geometry => {
                // this.scale.set()

                this.geometry = geometry
                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(texture),
                    morphTargets: true,
                }))
                this.geometry.scale(0.75, 0.75, 0.75)
                // this.scale.
                // new BoxGeometry().scale
                this.updateWorldMatrix();
                this.geometry.center();
                

                this.add(this.mesh)

                // this.scale.set(1, 2, 1)
                this.position.y += 35
                console.log(this.geometry)
            },
        );
    }
}
