import {Container} from "pixi.js";
import {BaseView} from "./BaseView";
import {Demo1} from "./demo1/Demo1";
import {Demo2} from "./demo2/Demo2";
import {Demo3} from "./demo3/Demo3";
import {ResizableView} from "./interfaces";

export class MainView extends BaseView implements ResizableView {
    private readonly _keyboardHandler = this.keyboardHandler.bind(this);
    private _currentDemo?: Container;
    private _currentDemoIndex: number;

    onAdded() {
        window.addEventListener("keypress", this._keyboardHandler);
        this.showDemo(2);
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
    }
    onRemoved() {
        window.removeEventListener("keypress", this._keyboardHandler);
    }
    resize(width: number, height: number) {
        console.log("resize", width, height);
    }
}
