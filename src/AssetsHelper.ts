import * as FontFaceObserver from "fontfaceobserver";
import {Assets, Sprite, BitmapFont} from "pixi.js";
import {randomFrom} from "./helpers";

export class AssetsHelper {
    private static ALL_CARDS: string[];
    static async loadAll() {
        await Promise.all([
            Assets.load("assets/cards.json"),
            Assets.load("assets/emoji.json"),
            AssetsHelper.loadFont("Nunito-Regular"),
            AssetsHelper.loadFont("Nunito-Bold")
            // AssetsHelper.loadFont("Nunito-Black"),
            // AssetsHelper.loadFont("Nunito-ExtraBold")
        ]);
        const cards = Assets.get("assets/cards.json").textures;
        AssetsHelper.ALL_CARDS = Object.keys(cards);
    }
    static getEmoji(id?: string): Sprite {
        const textures = Assets.get("assets/emoji.json").textures;
        if (!id) {
            const keys = Object.keys(textures);
            return new Sprite(textures[randomFrom(keys)]);
        }
        return new Sprite(textures[`${id}.png`]);
    }
    static getCard(suit: string, rank: string): Sprite {
        return new Sprite(Assets.get("assets/cards.json").textures[`${rank}_${suit}.png`]);
    }
    private static async loadFont(fontFamily: string) {
        const observer = new FontFaceObserver(fontFamily);
        try {
            await observer.load(null, 10000);
        } catch (e) {
            console.error(e);
        }
        BitmapFont.from(
            fontFamily,
            {fontSize: 96, fill: 0xffffff},
            {chars: BitmapFont.ALPHANUMERIC, resolution: window.devicePixelRatio}
        );
    }
}
