import {randomFrom, randomRange} from "../helpers";
import {BaseView} from "../BaseView";
import {ResizableView} from "../interfaces";
import {ImageTextComponent} from "./ImageTextComponent";

const TEXTS = [{text: "One"}, {text: "Two"}, {text: "Three"}];
const EMOJIS = new Array(17).fill(0).map((_, i) => ({asset: `e${i}`}));

export class Demo2 extends BaseView implements ResizableView {
    private _updateInterval: ReturnType<typeof setInterval>;
    private readonly _updateViews = this.updateViews.bind(this);
    private readonly theComponent = new ImageTextComponent();

    onAdded(): void {
        console.log("Demo2 added");
        this.theComponent.y = 100;
        this.addChild(this.theComponent);
        this._updateInterval = setInterval(this._updateViews, 1000);
        this.updateViews();
    }

    private updateViews(): void {
        const amount = randomRange(2, 7);
        this.theComponent.setContent(
            new Array(amount).fill(0).map(() => {
                if (Math.random() < 0.5) {
                    return randomFrom(EMOJIS);
                } else {
                    return this.getRandomText();
                }
            })
        );
    }
    private getRandomText() {
        return randomFrom(TEXTS);
    }

    onRemoved(): void {
        clearInterval(this._updateInterval);
    }
    resize(width: number, height: number): void {
        //
    }
}
