export abstract class Entity {
  id: string;
  #x: number;
  #y: number;
  #z: number;
  width = 0;
  height = 0;

  constructor(x: number, y: number) {
    this.id = crypto.randomUUID();
    this.#x = x;
    this.#y = y;
    this.#z = 1;
  }
  set x(x: number) {
    this.#x = x;
  }
  get x(): number {
    return this.#x;
  }
  set z(z: number) {
    this.#z = z;
  }
  get z(): number {
    return this.#z;
  }
  set y(y: number) {
    this.#y = y;
  }
  get y() {
    return this.#y;
  }
  setPosition(x: number, y: number, z?: number) {
    this.#x = x;
    this.#y = y;
    if (z) this.#z = z;
  }
}
