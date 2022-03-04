import { Plugin, Scene } from "../mod.ts";
import { GPURenderer } from "./renderers/GPURenderer.ts";
import { printBanner } from "./utils/mod.ts";

interface WorldOptions {
    width: number;
    height: number;
}
export class World {
  FPS = 500;
  params: WorldOptions;
  scenes: Array<typeof Scene>;
  currentScene: Scene;
  renderer: GPURenderer;
  canvas: HTMLCanvasElement;
  // deno-lint-ignore no-explicit-any
  plugins: any = {};
  constructor(params: WorldOptions, scenes: Array<typeof Scene>) {
    this.params = params;
    this.scenes = scenes;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.params.width;
    this.canvas.height = this.params.height;
    document.body.appendChild(this.canvas);
    this.currentScene = new this.scenes[0](this);
    this.renderer = new GPURenderer(this);
  }

  async start(): Promise<void> {
    printBanner("0.0.1");
    await this.renderer.init();
    this.setup();
    await this.currentScene.loadResources()
    this.renderer.start(this.currentScene.entities)
    requestAnimationFrame(this._draw.bind(this));
  }

  _draw(): void {
    this.updateProgramLifeCycle();
    this.renderer.render(this.currentScene.entities);
    requestAnimationFrame(this._draw.bind(this));
  }

  setFPS(fps: number): void {
    this.FPS = fps;
  }
  // deno-lint-ignore no-explicit-any
  keyDown(e: any): void {
    this.currentScene.keyDown(e);
  }

  setScene(scene: number | string): void {
    if (typeof scene === "string") {
      for (const s of this.scenes) {
        if (s.name === scene) {
          this.currentScene = new s(this);
          break;
        }
      }
    } else {
      this.currentScene = new this.scenes[scene](this);
    }
    this.setup();
  }
  // deno-lint-ignore no-explicit-any
  loadPlugin(name: string, plugin: any): void {
    this.plugins[name] = plugin;
  }
  usePlugin(name: string): Plugin {
    const plug = new this.plugins[name](this);
    plug.onStart();
    return plug;
  }
  // deno-lint-ignore no-explicit-any
  _mouseDown(e: any): void {
    this.currentScene._mouseDown(e);
  }
  // deno-lint-ignore no-explicit-any
  _mouseMotion(e: any): void {
    this.currentScene._mouseMotion(e);
  }
  setup(): void {
    this.currentScene.setup();
  }
  updateProgramLifeCycle(): void {
    this.currentScene.tick();
    this.currentScene.update();
  }
}