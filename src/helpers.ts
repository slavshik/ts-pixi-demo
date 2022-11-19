export const randomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const randomRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
