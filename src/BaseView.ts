import {Container} from "pixi.js";

export abstract class BaseView extends Container {
    constructor() {
        super();
        this.on("added", this.onAdded, this);
        this.on("removed", this.onRemoved, this);
    }
    protected onAdded() {
        //
    }
    protected onRemoved() {
        //
    }
    destroy(options?: any) {
        super.destroy(options);
        this.off("added", this.onAdded, this);
        this.off("removed", this.onRemoved, this);
    }
}
