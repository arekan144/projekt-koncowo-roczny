const KEYS = {
    "left": ["ArrowLeft", "KeyA"],
    "up": ["ArrowUp", "KeyW"],
    "right": ["ArrowRight", "KeyD"],
    "down": ["ArrowDown", "KeyS"],
    "turnLeft": "KeyH",
    "turnRight": "KeyL",
};
import Config from "./Config";

export default class PlayerControl {
    constructor() {

        window.addEventListener('keydown', event => this.onKeyDown(event), false);
        window.addEventListener('keyup', event => this.onKeyUp(event), false);

    }
    onKeyUp(event) {
        // console.log(event.code)
        switch (event.code) {
            case KEYS.up[0]:
            case KEYS.up[1]:
                Config.moveForward = false;
                break;
            case KEYS.left[0]:
            case KEYS.left[1]:
                Config.moveLeft = false;
                break;
            case KEYS.right[0]:
            case KEYS.right[1]:
                Config.moveRight = false;
                break;
            case KEYS.down[0]:
            case KEYS.down[1]:
                Config.moveBackward = false;
                break;
            case KEYS.turnLeft:
                Config.turnLeft = false;
                break;
            case KEYS.turnRight:
                Config.turnRight = false;
                break;
        }

    }

    onKeyDown(event) {
        switch (event.code) {
            case KEYS.up[0]:
            case KEYS.up[1]:
                Config.moveForward = true;
                break;
            case KEYS.left[0]:
            case KEYS.left[1]:
                Config.moveLeft = true;
                break;
            case KEYS.right[0]:
            case KEYS.right[1]:
                Config.moveRight = true;
                break;
            case KEYS.down[0]:
            case KEYS.down[1]:
                Config.moveBackward = true;
                break;
            case KEYS.turnLeft:
                Config.turnLeft = true;
                break;
            case KEYS.turnRight:
                Config.turnRight = true;
                break;
        }
    }
}