import {Container} from "pixi.js";
import {BaseView} from "./BaseView";
import {Button} from "./Button";
import {Demo1} from "./demo1/Demo1";
import {Demo2} from "./demo2/Demo2";
import {Demo3} from "./demo3/Demo3";
import {ResizableView} from "./interfaces";

export class MainView extends BaseView implements ResizableView {
    private readonly _keyboardHandler = this.keyboardHandler.bind(this);
    private _currentDemo?: Container & ResizableView;
    private _selectedButton?: Button;
    private _currentDemoIndex: number;
    private buttons: Container = new Container();
    private _screenWidth: number;
    private _screenHeight: number;

    onAdded() {
        window.addEventListener("keypress", this._keyboardHandler);
        [1, 2, 3].forEach(i => {
            const theButton = new Button(`# ${i}`);
            theButton.x = i * theButton.width;
            theButton.on(Button.CLICK_EVENT, () => this.showDemo(i));
            this.buttons.addChild(theButton);
        });
        this.addChild(this.buttons);
        this.showDemo(1);
    }
    keyboardHandler(e: KeyboardEvent) {
        switch (e.key) {
            case "1":
                return this.showDemo(1);
            case "2":
                return this.showDemo(2);
            case "3":
                return this.showDemo(3);
        }
    }
    showDemo(index: number) {
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
        const btn = this.buttons.children[index - 1] as Button;
        if (btn) {
            btn.selected = true;
        }
        this._selectedButton = btn as Button;

        this._currentDemo = ((): BaseView => {
            switch (index) {
                case 1:
                    return new Demo1();
                case 2:
                    return new Demo2();
                case 3:
                    return new Demo3();
            }
        })();
        if (this._currentDemo) {
            this.addChild(this._currentDemo);
        }
        this.resize(this._screenWidth, this._screenHeight);
    }
    onRemoved() {
        window.removeEventListener("keypress", this._keyboardHandler);
        (this.buttons.children as Button[]).forEach(child => child.off(Button.CLICK_EVENT));
    }
    resize(width: number, height: number) {
        this._screenWidth = width;
        this._screenHeight = height;
        this.buttons.x = (width - this.buttons.width) * 0.5;
        this.buttons.y = height - this.buttons.height;
        if (this._currentDemo?.resize) {
            this._currentDemo.resize(width, height);
        }
    }
}
