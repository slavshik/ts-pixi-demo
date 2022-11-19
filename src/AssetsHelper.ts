import {Assets, Sprite} from "pixi.js";

export class AssetsHelper {
    private static ALL_CARDS: string[];
    static async loadAll() {
        await Assets.load("assets/cards.json");
        const cards = Assets.get("assets/cards.json").textures;
        AssetsHelper.ALL_CARDS = Object.keys(cards);
    }
    static getCard(suit: string, rank: string): Sprite {
        return new Sprite(Assets.get("assets/cards.json").textures[`${rank}_${suit}.png`]);
    }
}
