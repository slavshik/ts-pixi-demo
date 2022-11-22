import * as particles from "@pixi/particle-emitter";
import {EmitterConfigV3} from "@pixi/particle-emitter";
import {Container} from "pixi.js";
import {AssetsHelper} from "../AssetsHelper";
import {DemoView} from "../DemoView";

export class Demo3 extends DemoView {
    private readonly emitterPivot = new Container();
    private emitter: particles.Emitter;
    private elapsed = Date.now();
    private _animationFrame: ReturnType<typeof requestAnimationFrame>;

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
        this._animationFrame = requestAnimationFrame(() => this.update());
        const now = Date.now();
        this.emitter.update((now - this.elapsed) * 0.001);
        this.elapsed = now;
    }
    protected onRemoved(): void {
        cancelAnimationFrame(this._animationFrame);
    }

    public resize(width: number, height: number): void {
        super.resize(width, height);
        this.emitterPivot.position.set(width * 0.5, height * 0.5);
    }
    protected getEmitterConfig(): EmitterConfigV3 {
        return {
            lifetime: {min: 0.1, max: 0.75},
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
                                {time: 0, value: 0.62},
                                {time: 1, value: 0}
                            ]
                        }
                    }
                },
                {
                    type: "moveSpeedStatic",
                    config: {min: 50, max: 200}
                },
                {
                    type: "scale",
                    config: {
                        scale: {
                            list: [
                                {time: 0, value: 0.25},
                                {time: 1, value: 0.5}
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
                                {time: 0.5, value: "ff9991"},
                                {time: 1, value: "ff622c"}
                            ]
                        }
                    }
                },
                {
                    type: "rotation",
                    config: {accel: 0.1, minSpeed: 50, maxSpeed: 50, minStart: 265, maxStart: 275}
                },
                {
                    type: "textureRandom",
                    config: {
                        textures: ["assets/particle.png", "assets/Fire.png", "assets/Fire2.png"]
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
        //     return {
        //         lifetime: {min: 0.5, max: 0.5},
        //         frequency: 0.008,
        //         spawnChance: 1,
        //         particlesPerWave: 1,
        //         emitterLifetime: 0.31,
        //         maxParticles: 1000,
        //         pos: {x: 0, y: 0},
        //         addAtBack: false,
        //         behaviors: [
        //             {
        //                 type: "alpha",
        //                 config: {
        //                     alpha: {
        //                         list: [
        //                             {value: 0.8, time: 0},
        //                             {value: 0.1, time: 1}
        //                         ]
        //                     }
        //                 }
        //             },
        //             {
        //                 type: "scale",
        //                 config: {
        //                     scale: {
        //                         list: [
        //                             {value: 1, time: 0},
        //                             {value: 0.3, time: 1}
        //                         ]
        //                     }
        //                 }
        //             },
        //             {
        //                 type: "color",
        //                 config: {
        //                     color: {
        //                         list: [
        //                             {value: "fb1010", time: 0},
        //                             {value: "f5b830", time: 1}
        //                         ]
        //                     }
        //                 }
        //             },
        //             {
        //                 type: "moveSpeed",
        //                 config: {
        //                     speed: {
        //                         list: [
        //                             {value: 200, time: 0},
        //                             {value: 100, time: 1}
        //                         ],
        //                         isStepped: false
        //                     }
        //                 }
        //             },
        //             {
        //                 type: "rotationStatic",
        //                 config: {min: 0, max: 360}
        //             },
        //             {
        //                 type: "spawnShape",
        //                 config: {
        //                     type: "torus",
        //                     data: {x: 0, y: 0, radius: 10}
        //                 }
        //             },
        //             {
        //                 type: "textureSingle",
        //                 config: {texture: AssetsHelper.getFlame()}
        //             }
        //         ]
        //     };
    }
}
