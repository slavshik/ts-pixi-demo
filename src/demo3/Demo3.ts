import * as particles from "@pixi/particle-emitter";
import {Container} from "pixi.js";
import {DemoView} from "../DemoView";

export class Demo3 extends DemoView {
    private readonly emitterPivot = new Container();
    private emitter: particles.Emitter;
    private elapsed = Date.now();
    private animationFrameId: ReturnType<typeof requestAnimationFrame>;

    constructor() {
        super();
        this.addChild(this.emitterPivot);
    }
    protected onAdded(): void {
        this.emitter = new particles.Emitter(this.emitterPivot, this.getEmitterConfig());
        this.emitter.emit = true;
        this.update();
    }

    protected update(): void {
        this.animationFrameId = requestAnimationFrame(() => this.update());
        const now = Date.now();
        this.emitter.update((now - this.elapsed) * 0.001);
        this.elapsed = now;
    }
    protected onRemoved(): void {
        cancelAnimationFrame(this.animationFrameId);
    }

    public resize(width: number, height: number): void {
        super.resize(width, height);
        this.emitterPivot.position.set(width * 0.5, height * 0.5);
    }
    protected getEmitterConfig(): particles.EmitterConfigV3 {
        return {
            lifetime: {min: 0.15, max: 0.5},
            frequency: 0.001,
            emitterLifetime: 0,
            maxParticles: 10,
            addAtBack: false,
            pos: {x: 0, y: 0},
            behaviors: [
                {
                    type: "alpha",
                    config: {
                        alpha: {
                            list: [
                                {time: 0, value: 0},
                                {time: 0.1, value: 0.62},
                                {time: 1, value: 0}
                            ]
                        }
                    }
                },
                {
                    type: "moveSpeedStatic",
                    config: {min: 50, max: 100}
                },
                {
                    type: "scale",
                    config: {
                        scale: {
                            list: [
                                {time: 0, value: 0.5},
                                {time: 1, value: 1}
                            ]
                        },
                        minMult: 1
                    }
                },
                {
                    type: "color",
                    config: {
                        color: {
                            list: [
                                {time: 0, value: "fff191"},
                                {time: 0.5, value: "ff8237"},
                                {time: 0.9, value: "fa571f"},
                                {time: 1, value: "333333"}
                            ]
                        }
                    }
                },
                {
                    type: "rotation",
                    config: {accel: 0.1, minSpeed: 25, maxSpeed: 50, minStart: 250, maxStart: 275}
                },
                {
                    type: "textureRandom",
                    config: {
                        textures: [
                            "assets/particle.png",
                            "assets/Fire.png",
                            "assets/Fire2.png",
                            "assets/Fire3.png"
                        ]
                    }
                },
                {
                    type: "spawnShape",
                    config: {
                        type: "torus",
                        data: {x: 0, y: 0, radius: 10, innerRadius: 8, affectRotation: false}
                    }
                }
            ]
        };
    }
}
