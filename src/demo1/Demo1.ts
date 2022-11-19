import {gsap} from "gsap/gsap-core";
import {Container} from "pixi.js";
import {randomFrom} from "../helpers";
import {AssetsHelper} from "../AssetsHelper";
import {BaseView} from "../BaseView";

const ranks = ["spades", "hearts", "diamonds", "clubs"];
const suits = ["ace", "king", "queen", "jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

export class Demo1 extends BaseView {
    private readonly _stack1: Container[] = [];
    private readonly _stack2: Container[] = [];
    private _movingCard?: Container;
    onAdded() {
        console.log("Demo1 added");
        let total = 144;
        while (--total > 0) {
            const card = AssetsHelper.getCard(randomFrom(suits), randomFrom(ranks));
            card.y = this._stack1.length * 5;
            this.addChild(card);
            this._stack1.push(card);
        }
        this.moveCard();
    }

    onRemoved() {
        gsap.killTweensOf(this._movingCard);
    }
    private moveCard() {
        this._movingCard = this._stack1.pop();
        if (this._movingCard) {
            gsap.to(this._movingCard, {
                x: this._movingCard.width,
                y: this._stack2.length * 5,
                duration: 0.75,
                onComplete: () => {
                    this.setChildIndex(this._movingCard, this._stack2.length);
                    this._stack2.push(this._movingCard);
                    this.moveCard();
                }
            });
        }
    }
}
