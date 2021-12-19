import type { RGBA } from "../../types.ts";
import { hexToRGBA } from '../../utils/mod.ts';

interface Settings {
    density: number,
    particleSize: number,
    startingX: number,
    startingY: number,
    gravity: number,
    maxLife: number,
    fill: RGBA | string,
}

export class Particle {
    public settings: Settings;
    public x: number;
    public y: number;
    public vx: number;
    public vy: number;
    public id: number;
    public life: number;
    constructor(id: number, settings: Settings) {
        this.id = id;
        this.x = settings.startingX;
        this.y = settings.startingY;
        this.vx = Math.random() * 20 - 10;
        this.vy = Math.random() * 20 - 5;
        this.life = 0;
        this.settings = settings;
        this.settings.fill = typeof this.settings.fill === 'string' ? hexToRGBA(this.settings.fill) : this.settings.fill;

    }

    public update(): void {

    }
}