import { WebGLBuffer, WebGLTexture } from "../../../deno_gl/mod.ts";

export type EntityBuffers = RectangleBuffers | ImageBuffers | TextureSpriteBuffers

export type RectangleBuffers = {
    position: WebGLBuffer,
}

export type ImageBuffers = {
    position: WebGLBuffer,
    sampler: WebGLTexture,
    texture: WebGLBuffer,
}

export type TextureSpriteBuffers = {
    position: WebGLBuffer,
    position2: WebGLBuffer,
    color2: WebGLBuffer,
}