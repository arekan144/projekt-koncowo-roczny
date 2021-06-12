import Animation from "./Animation";

export default class Player {
    constructor(scene, pos_x, pos_y, pos_z) {
        this.mesh = null;
        this.animation = new Animation(this.mesh);
    }
}