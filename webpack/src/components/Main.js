import { Scene, GridHelper, LoadingManager, AmbientLight, Clock } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Ico from './Ico';
import Floor from './Floor';
import Skybox from './Skybox';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Main {
    constructor(container) {

        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer);

        //////////

        this.clock = new Clock();
        this.manager = new LoadingManager();

        //

        this.camera.position.set(50, 50, 50)
        const grid = new GridHelper(200, 20, "green")
        grid.translateY(1)
        this.camera.lookAt(0, 0, 0)
        this.scene.add(grid)
        // this.floor = new Floor(this.scene)
        // this.floor.add(0, 0xbfbfbf, -1)
        this.ambientLight = new AmbientLight("white", 0.5)
        this.skyBox = new Skybox(this.scene);
        this.scene.add(this.ambientLight)

        const controls = new OrbitControls(this.camera, this.renderer.domElement)
        //////////

        this.render();
    }

    render() {
        let delta = this.clock.getDelta();
        // console.log("render leci")

        this.renderer.render(this.scene, this.camera);


        requestAnimationFrame(this.render.bind(this));
    }
}