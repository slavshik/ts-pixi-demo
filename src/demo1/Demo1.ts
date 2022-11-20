import {gsap} from "gsap/gsap-core";
import {Container} from "pixi.js";
import {AssetsHelper} from "../AssetsHelper";
import {DemoView} from "../DemoView";
import {randomFrom} from "../helpers";

const ranks = ["spades", "hearts", "diamonds", "clubs"];
const suits = ["ace", "king", "queen", "jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

export class Demo1 extends DemoView {
    private readonly _deck1: Container[] = [];
    private readonly _deck2: Container[] = [];
    private readonly _stackCont1 = new Container();
    private readonly _stackCont2 = new Container();
    private readonly _frontmostCont = this;
    private _interval: ReturnType<typeof setInterval>;

    constructor() {
        super();
        this.addChild(this._stackCont1, this._stackCont2);
    }
    protected onAdded(): void {
        let total = 144;
        while (--total > 0) {
            const card = AssetsHelper.getCard(randomFrom(suits), randomFrom(ranks));
            card.y = this._deck1.length * 5;
            this._stackCont1.addChild(card);
            this._deck1.push(card);
        }
        this._interval = setInterval(() => this.moveCard(), 1000);
    }

    protected onRemoved(): void {
        gsap.killTweensOf(this._deck2); // may not super efficient, but effective
        clearInterval(this._interval);
    }
    private moveCard() {
        const card = this._deck1.pop();
        if (card) {
            const duration = 2;
            this._deck2.push(card);
            const y = (this._deck2.length - 1) * 5;
            gsap.to(card, {
                duration,
                y,
                onStart: () => this._frontmostCont.addChild(card),
                onComplete: () => this._stackCont2.addChild(card)
            });
            // other animations
            gsap.to(card, {x: card.width, duration, ease: "back.out"});
            const halfDuration = duration * 0.5;
            gsap.timeline()
                .to(card, {rotation: 0.1, duration: halfDuration, ease: "sine.out"})
                .to(card, {rotation: 0, duration: halfDuration, ease: "sine.in"});
        }
    }
}
