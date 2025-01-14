import { World, Scene, Circle } from '../mod.ts';


class Game extends Scene {
    public test = new Circle(300, 300, 40, "#00ff00");
    
    public setup() {
        this.addChild(this.test);
    }
    public draw() {
    }

}

const test = new World({
    title: "test",
    width: 800,
    height: 600,
    centered: true,
    fullscreen: false,
    hidden: false,
    resizable: true,
    minimized: false,
    maximized: false,
    flags: null,
}, [Game]);

await test.start();