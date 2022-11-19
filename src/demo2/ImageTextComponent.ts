import {BitmapText, Container, Graphics, IBitmapTextStyle} from "pixi.js";

type Img = {asset: string};
type Txt = {text: string; style?: IBitmapTextStyle};
type Part = Img | Txt | Container | Graphics;

export class ImageTextComponent extends Container {
    constructor(parts: Part[] = []) {
        super();
        this.setContent(parts);
    }
    setContent(values: Part[]) {
        this.removeChildren();
        values
            .map(part => this.createPart(part))
            ./* filter(part => !!part). */ forEach(obj => this.addChild(obj));
        this.alignChildren();
    }
    private createPart(part: Part): Container {
        if ("asset" in part) {
            return new Container();
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
        let sx = 0;
        this.children.forEach(child => {
            const bounds = child.getLocalBounds();
            child.x = sx;
            sx += bounds.width;
        });
    }
}
