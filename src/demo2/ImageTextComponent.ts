import {BitmapText, Container, Graphics, IBitmapTextStyle} from "pixi.js";
import {AssetsHelper} from "../AssetsHelper";

type Img = {asset: string};
type Txt = {text: string; style?: Partial<IBitmapTextStyle>};
type Part = Img | Txt | Container | Graphics;

export class ImageTextComponent extends Container {
    constructor(parts: Part[] = [], private gap: number = 5) {
        super();
        this.setContent(parts);
    }
    public setContent(values: Part[]): void {
        this.removeChildren();
        values
            .map(part => this.createPart(part))
            ./* filter(part => !!part). */ forEach(obj => this.addChild(obj));
        this.alignChildren();
    }
    private createPart(part: Part): Container {
        if ("asset" in part) {
            return AssetsHelper.getEmoji(part.asset);
        } else if ("text" in part) {
            return new BitmapText(part.text, {
                fontName: "Nunito-Regular",
                fontSize: 24,
                ...part.style
            });
        } else {
            return part;
        }
    }
    private alignChildren() {
        let prevChild: Container | null = null;
        (this.children as Container[]).forEach(child => {
            if (prevChild) {
                child.x = prevChild.x + prevChild.width + this.gap;
                child.y = prevChild.y + (prevChild.height - child.height) * 0.5;
            }
            prevChild = child;
        });
    }
}
