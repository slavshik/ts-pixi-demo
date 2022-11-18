import {MainView} from "./MainView";
import {Application} from "pixi.js";
let app = new Application();
document.body.appendChild(app.view as any);

app.stage.addChild(new MainView());
const onResize = () => app.renderer.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", onResize);
onResize();
