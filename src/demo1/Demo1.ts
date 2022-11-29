import {gsap} from "gsap/gsap-core";
import {Container} from "pixi.js";
import {AssetsHelper} from "../AssetsHelper";
import {DemoView} from "../DemoView";
import {randomFrom} from "../helpers";

const ranks = ["spades", "hearts", "diamonds", "clubs"];
const suits = ["ace", "king", "queen", "jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

export class Demo1 extends DemoView {
    private readonly deck1: Container[] = [];
    private readonly deck2: Container[] = [];
    private readonly stackCont1 = new Container();
    private readonly stackCont2 = new Container();
    private readonly mainCont = new Container();
    private readonly frontmostCont = this.mainCont;
    private interval: ReturnType<typeof setInterval>;

    constructor(
        totalCards = 144,
        private readonly moveCardIntervalSec = 2,
        private readonly movingSpeedSec = 2
    ) {
        super();
        this.addChild(this.mainCont);
        this.mainCont.addChild(this.stackCont1, this.stackCont2);
        for (let i = 0; i < totalCards; i++) {
            const card = AssetsHelper.getCard(randomFrom(suits), randomFrom(ranks));
            card.y = this.deck1.length * 5;
            this.stackCont1.addChild(card);
            this.deck1.push(card);
        }
    }
    protected onAdded(): void {
        this.interval = setInterval(() => {
            const card = this.deck1.pop();
            if (card) {
                this.deck2.push(card);
                this.moveCard(card);
            } else {
                clearInterval(this.interval);
            }
        }, this.moveCardIntervalSec * 1000);
    }

    private moveCard(card: Container) {
        const duration = this.movingSpeedSec;
        const y = (this.deck2.length - 1) * 5;
        gsap.to(card, {
            duration,
            y,
            onStart: () => this.frontmostCont.addChild(card),
            onComplete: () => this.stackCont2.addChild(card)
        });
        // other animations
        gsap.to(card, {x: card.width, duration, ease: "back.out"});
        const halfDuration = duration * 0.5;
        gsap.timeline()
            .to(card, {rotation: 0.1, duration: halfDuration, ease: "sine.out"})
            .to(card, {rotation: 0, duration: halfDuration, ease: "sine.in"});
    }

    protected onRemoved(): void {
        // may not super efficient, but enough for this demo
        gsap.killTweensOf(this.deck2);
        clearInterval(this.interval);
    }

    public resize(width: number, height: number): void {
        this.mainCont.x = (width - 272) * 0.5; // 272 - stacks width
    }
}
