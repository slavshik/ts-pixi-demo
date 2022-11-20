import {Container} from "pixi.js";
import {Button} from "./Button";
import {Demo1} from "./demo1/Demo1";
import {Demo2} from "./demo2/Demo2";
import {Demo3} from "./demo3/Demo3";
import {DemoView} from "./DemoView";

export class MainView extends DemoView {
    private readonly _keyboardHandler = this.keyboardHandler.bind(this);
    private readonly _buttonsCont = new Container();
    private _currentDemo?: DemoView;
    private _selectedButton?: Button;
    private _currentDemoIndex = NaN;

    protected onAdded(): void {
        window.addEventListener("keypress", this._keyboardHandler);
        const btns = [1, 2, 3].map(i => this._buttonsCont.addChild(new Button(`# ${i}`)));
        btns.forEach((btn, i) => {
            btn.x = i * (btn.width + 80);
            btn.on(Button.CLICK_EVENT, () => this.showDemo(i + 1));
        });
        this.addChild(this._buttonsCont);
        this.showDemo(3);
    }
    private keyboardHandler(e: KeyboardEvent): void {
        switch (e.key) {
            case "1":
                return this.showDemo(1);
            case "2":
                return this.showDemo(2);
            case "3":
                return this.showDemo(3);
        }
    }
    private showDemo(index: number): void {
        if (this._currentDemoIndex !== index) {
            this._currentDemoIndex = index;
        } else return;

        if (this._currentDemo) {
            this._currentDemo.parent?.removeChild(this._currentDemo);
            this._currentDemo.destroy();
        }
        if (this._selectedButton) {
            this._selectedButton.selected = false;
        }
        const btn = this._buttonsCont.children[index - 1] as Button;
        if (btn) {
            btn.selected = true;
        }
        this._selectedButton = btn;

        this._currentDemo = ((): DemoView => {
            switch (index) {
                case 1:
                    return new Demo1();
                case 2:
                    return new Demo2();
                case 3:
                    return new Demo3();
            }
        })();
        this._currentDemo && this.addChild(this._currentDemo);
        this.resize(this.screenWidth, this.screenHeight);
    }
    protected onRemoved(): void {
        window.removeEventListener("keypress", this._keyboardHandler);
        (this._buttonsCont.children as Button[]).forEach(child => child.off(Button.CLICK_EVENT));
    }
    public resize(width: number, height: number): void {
        super.resize(width, height);
        this._buttonsCont.x = (width - this._buttonsCont.width) * 0.5;
        this._buttonsCont.y = height - this._buttonsCont.height;
        if (this._currentDemo?.resize) {
            this._currentDemo.resize(width, height);
        }
    }
}
