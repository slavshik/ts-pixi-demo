import {Container} from "pixi.js";
import {Button} from "./Button";
import {Demo1} from "./demo1/Demo1";
import {Demo2} from "./demo2/Demo2";
import {Demo3} from "./demo3/Demo3";
import {DemoView} from "./DemoView";

export class MainView extends DemoView {
    private readonly keyboardHandler: (e: KeyboardEvent) => void;
    private readonly buttonsCont = new Container();
    private currentDemo?: DemoView;
    private selectedButton?: Button;
    private currentDemoIndex = NaN;

    constructor() {
        super();
        this.keyboardHandler = (e: KeyboardEvent) => {
            switch (e.key) {
                case "1":
                    return this.showDemo(1);
                case "2":
                    return this.showDemo(2);
                case "3":
                    return this.showDemo(3);
            }
        };
        window.addEventListener("keypress", this.keyboardHandler);
        const btns = [1, 2, 3].map(i => this.buttonsCont.addChild(new Button(`# ${i}`)));
        btns.forEach((btn, i) => {
            btn.x = i * (btn.width + 80);
            btn.on(Button.CLICK_EVENT, () => this.showDemo(i + 1));
        });
        this.addChild(this.buttonsCont);
    }

    public showDemo(index: number): void {
        if (this.currentDemoIndex !== index) {
            this.currentDemoIndex = index;
        } else return;

        if (this.currentDemo) {
            this.currentDemo.parent?.removeChild(this.currentDemo);
            this.currentDemo.destroy();
        }
        if (this.selectedButton) {
            this.selectedButton.selected = false;
        }
        const btn = this.buttonsCont.children[index - 1] as Button;
        if (btn) {
            btn.selected = true;
        }
        this.selectedButton = btn;

        this.currentDemo = ((): DemoView => {
            switch (index) {
                case 1:
                    return new Demo1();
                case 2:
                    return new Demo2();
                case 3:
                    return new Demo3();
            }
        })();
        this.currentDemo && this.addChild(this.currentDemo);
        this.resize(this.screenWidth, this.screenHeight);
    }

    public destroy(): void {
        super.destroy();
        window.removeEventListener("keypress", this.keyboardHandler);
        (this.buttonsCont.children as Button[]).forEach(child => child.off(Button.CLICK_EVENT));
    }

    public resize(width: number, height: number): void {
        super.resize(width, height);
        this.buttonsCont.x = (width - this.buttonsCont.width) * 0.5;
        this.buttonsCont.y = height - this.buttonsCont.height;
        if (this.currentDemo?.resize) {
            this.currentDemo.resize(width, height);
        }
    }
}
