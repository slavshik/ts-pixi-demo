import {BitmapText} from "pixi.js";
import {BaseView} from "./BaseView";

export class Button extends BaseView {
    public static readonly CLICK_EVENT: any = Symbol("click");
    private readonly label: BitmapText;
    private _selected = false;

    constructor(private _text: string) {
        super();
        this.label = new BitmapText(this._text, {
            fontName: "Nunito-Bold",
            tint: 0xffffff,
            fontSize: 64
        });
        this.label.anchor.set(0.5);
        this.addChild(this.label);
        this.interactive = true;
        this.hitArea = this.label.getBounds().pad(10);
        this.updateSelected();
        this.on("pointerdown", this.onClick, this);
    }

    protected onClick() {
        this.emit(Button.CLICK_EVENT);
    }

    public set selected(value: boolean) {
        this._selected = value;
        this.updateSelected();
    }

    private updateSelected(): void {
        this.label.alpha = this._selected ? 1 : 0.5;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public destroy(): void {
        this.off("pointerdown", this.onClick, this);
        super.destroy();
    }
}
