import {BaseView} from "../BaseView";
import {ImageTextComponent} from "./ImageTextComponent";

export class Demo2 extends BaseView {
    private _updateInterval: ReturnType<typeof setInterval>;
    private readonly _updateViews = this.updateViews.bind(this);

    onAdded(): void {
        console.log("Demo2 added");
        this.addChild(new ImageTextComponent([{text: "One"}, {text: "Two"}, {text: "Three"}]));
        this._updateInterval = setInterval(this._updateViews, 1000);
    }

    private updateViews(): void {
        console.log("updateViews");
    }

    onRemoved(): void {
        clearInterval(this._updateInterval);
    }
}
