import {BitmapText} from "pixi.js";
import {BaseView} from "./BaseView";

export class Button extends BaseView {
    public static readonly CLICK_EVENT: any = Symbol("click");
    private readonly _label: BitmapText;
    private _selected = false;

    constructor(private _name: string) {
        super();
        this._label = new BitmapText(this._name, {
            fontName: "Nunito-Bold",
            tint: 0xffffff,
            fontSize: 64
        });
        this._label.anchor.set(0.5);
        this.addChild(this._label);
        this.interactive = true;
        this.hitArea = this._label.getBounds().pad(10);
        this.updateSelected();
    }
    protected onClick() {
        this.emit(Button.CLICK_EVENT);
    }
    protected onAdded(): void {
        this.on("pointerdown", this.onClick, this);
    }
    protected onRemoved(): void {
        this.off("pointerdown", this.onClick, this);
    }
    public set selected(value: boolean) {
        this._selected = value;
        this.updateSelected();
    }
    private updateSelected(): void {
        this._label.alpha = this._selected ? 1 : 0.5;
    }
    public get selected(): boolean {
        return this._selected;
    }
}
