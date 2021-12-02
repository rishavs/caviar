import { Entity } from '../mod.ts';
import { World } from '../../../mod.ts';
export class Sprite extends Entity {
    public width: number;
    public height: number
    public surface: any;
    public texture: any;
    constructor(world: World, texture: string, x: number, y: number, width: number, height: number) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.surface = world.loadSurface(texture);
        this.texture = world.createTextureFromSurface(this.surface);
    }
}