import {Container} from "pixi.js";

export class BaseView extends Container {
    private _onAdded = this.onAdded.bind(this);
    private _onRemoved = this.onRemoved.bind(this);
    constructor() {
        super();
        this.on("added", this._onAdded);
        this.on("removed", this._onRemoved);
    }
    onAdded() {
        //
    }
    onRemoved() {
        //
    }
    destroy(options?: any) {
        super.destroy(options);
        this.off("added", this._onAdded);
        this.off("removed", this._onRemoved);
    }
}
