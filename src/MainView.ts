import {gsap} from "gsap/gsap-core";
import {Container, Graphics} from "pixi.js";

export class MainView extends Container {
    constructor() {
        super();
        // Create the sprite and add it to the stage
        let sprite = new Graphics().beginFill(0x0000ff).drawRect(0, 0, 100, 100);
        this.addChild(sprite);

        // Add a ticker callback to move the sprite back and forth
        gsap.to(sprite, {x: 200, duration: 1}).repeat(-1).yoyo(true);
    }
}
