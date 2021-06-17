import { AnimationMixer } from 'three';

export default class Animation extends AnimationMixer {
    constructor(mesh) {
        this.mesh = mesh
        super(this.mesh);
    }

    playAnim(animName) {
        this.animName = animName
        this.uncacheRoot(this.mesh)
        this.clipAction(this.animName).play()
    }

    // update mixer
    update(delta) {
        if (this) {
            this.update(delta);
        }
    }
}