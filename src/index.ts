import {Application, Container} from "pixi.js";
import {MainView} from "./MainView";
import {AssetsHelper} from "./AssetsHelper";
import {ResizableView} from "./interfaces";

const app = new Application();
document.body.appendChild(app.view as any);
const resizableViews: (Container & ResizableView)[] = [];
const onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    app.renderer.resize(width, height);
    resizableViews.forEach(view => (view.resize ? view.resize(width, height) : void 0));
};
onResize();
window.addEventListener("resize", onResize);

async function main() {
    await AssetsHelper.loadAll();
    const mainView = new MainView();
    resizableViews.push(mainView);
    onResize();
    app.stage.addChild(mainView);
}

main();
