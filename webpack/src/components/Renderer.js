import { BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, WebGLRenderer } from 'three';

export default class Renderer extends WebGLRenderer {
    constructor(scene, container) {
        super({ antialias: true })
        this.scene = scene;
        this.container = container;
        // this.threeRenderer = new WebGLRenderer({ antialias: true });
        this.setClearColor(0xFFFFFF);
        this.container.appendChild(this.domElement);
        this.updateSize();
        // this.threeRenderer.shadowMap.enabled = true;
        this.shadowMap.enabled = true;
        this.shadowMap.type = PCFSoftShadowMap;
        // console.log(this.threeRenderer)

        // this.
        document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
        window.addEventListener('resize', () => this.updateSize(), false);
    }

    updateSize() {
        this.setSize(window.innerWidth, window.innerHeight);
    }

    render(scene, camera) {
        this.render(scene, camera);
    }
}