import { Scene, GridHelper, AmbientLight } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Ico from './Ico';
import Floor from './Floor';

export default class Main {
    constructor(container) {
        // właściwości klasy
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer);
        //////////

        // this.ico = new Ico(this.scene);
        this.camera.position.set(50, 50, 50)
        const grid = new GridHelper(200, 20, "green")
        grid.translateY(1)
        this.camera.lookAt(0, 0, 0)
        this.scene.add(grid)
        this.floor = new Floor(this.scene)
        this.floor.add(0, 0xbfbfbf, -1)
        this.ambientLight = new AmbientLight("white", 0.5)
        this.scene.add(this.ambientLight)
        //////////
        this.render();
    }

    render() {

        // console.log("render leci")

        this.renderer.render(this.scene, this.camera);


        requestAnimationFrame(this.render.bind(this));
    }
}