import {BaseView} from "./BaseView";
import {ResizableView} from "./interfaces";

export class DemoView extends BaseView implements ResizableView {
    protected screenWidth: number;
    protected screenHeight: number;

    resize(width: number, height: number): void {
        this.screenWidth = width;
        this.screenHeight = height;
    }
}
