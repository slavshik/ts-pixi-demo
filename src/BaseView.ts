import {Container} from "pixi.js";

export abstract class BaseView extends Container {
    private readonly _onAdded = this.onAdded.bind(this);
    private readonly _onRemoved = this.onRemoved.bind(this);

    constructor() {
        super();
        this.on("added", this._onAdded);
        this.on("removed", this._onRemoved);
    }
    protected onAdded() {
        //
    }
    protected onRemoved() {
        //
    }
    destroy(options?: any) {
        super.destroy(options);
        this.off("added", this._onAdded);
        this.off("removed", this._onRemoved);
    }
}
