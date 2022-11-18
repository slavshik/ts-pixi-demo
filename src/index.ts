import {Application, Graphics} from "pixi.js";
let app = new Application();
document.body.appendChild(app.view as any);

// Create the sprite and add it to the stage
let sprite = new Graphics().beginFill(0x0000ff).drawRect(0, 0, 100, 100);
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta: number) => {
    elapsed += delta;
    sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
});

const onResize = () => app.renderer.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", onResize);
onResize();
