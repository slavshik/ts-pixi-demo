import {gsap} from "gsap/gsap-core";
import {DemoView} from "../DemoView";
import {randomFrom, randomRange} from "../helpers";
import {ImageTextComponent} from "./ImageTextComponent";

export class Demo2 extends DemoView {
    private readonly theComponent = new ImageTextComponent();
    private readonly getRandomEmoji = () => ({asset: `e${randomRange(1, 17)}`});
    private readonly getRandomText = () => ({
        text: randomFrom(["One", "Hello", "4242", "Lorem ipsum dolor", "Just text"]),
        style: {
            fontName: `Nunito-${randomFrom(["Regular", "Bold", "Italic"])}`,
            fontSize: randomRange(18, 64),
            maxWidth: 250
        }
    });

    protected onAdded(): void {
        this.addChild(this.theComponent);
        this.showRandomView();
    }

    private showRandomView(): void {
        // generate
        this.theComponent.setContent(
            new Array(randomRange(2, 5))
                .fill(0)
                .map(() => (Math.random() > 0.8 ? this.getRandomEmoji() : this.getRandomText()))
        );
        // align
        this.alignComponent();
        // animate
        gsap.timeline()
            .fromTo(this.theComponent, {alpha: 0}, {alpha: 1})
            .to(this.theComponent, {alpha: 0, delay: 2})
            .call(() => this.showRandomView());
    }

    private alignComponent(): void {
        this.theComponent.x = (this.screenWidth - this.theComponent.width) * 0.5;
        this.theComponent.y = (this.screenHeight - this.theComponent.height) * 0.5;
    }

    protected onRemoved(): void {
        gsap.killTweensOf(this.theComponent);
    }

    public resize(width: number, height: number): void {
        super.resize(width, height);
        this.alignComponent();
    }
}
