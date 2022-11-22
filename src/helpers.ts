import "fpsmeter";
export const addFPSMeter = () => {
    // @ts-ignore
    const fpsmeter = new FPSMeter({
        theme: "transparent",
        heat: 20,
        graph: 1,
        history: 20,
        zIndex: 10000
    });
    fpsmeter.show();
    const tick = () => {
        fpsmeter.tick();
        requestAnimationFrame(tick);
    };
    tick();
};
export const randomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const randomRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
