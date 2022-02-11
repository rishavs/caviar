import { WebGL2RenderingContext, WebGLProgram, WebGLUniformLocation } from "../../../deno_gl/mod.ts";

export const vertex2d = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec2 aInstancePosition;
attribute vec4 aInstanceColor;

uniform float uShaderUsage;
uniform vec4 uVertexColor;
uniform vec2 uTransformMatrix;

varying lowp float vShaderUsage;
varying lowp vec4 vColor;
varying highp vec2 vTextureCoord;

void main(void) {
  if (uShaderUsage == 0.0) {
    vColor = uVertexColor;
    gl_Position = vec4(aVertexPosition + uTransformMatrix, 1, 1);
  } else if (uShaderUsage == 1.0) {
    vTextureCoord = aTextureCoord;
    gl_Position = vec4(aVertexPosition + uTransformMatrix, 1, 1);
  } else if (uShaderUsage == 2.0) {
    vColor = aInstanceColor;
    gl_Position = vec4(aVertexPosition + uTransformMatrix + aInstancePosition, 1, 1);
  }
  vShaderUsage = uShaderUsage;
}
`

export const fragment2d = `
varying vec4 vColor;
varying highp vec2 vTextureCoord;

varying lowp float vShaderUsage;
uniform sampler2D uSampler;

void main(void) {
  if (vShaderUsage == 0.0) {
    gl_FragColor = vColor;
  } else {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
  };
}
`

export const vertex3d = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`

export const fragment3d = `
varying lowp vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
`

export interface ProgramInfo2d {
  position: number;
  texture: number;
  position2: number;
  color2: number;

  color: WebGLUniformLocation;
  transform: WebGLUniformLocation;
  sampler: WebGLUniformLocation;
  usage: WebGLUniformLocation;
}

export function programInfo2d(gl: WebGL2RenderingContext, program: WebGLProgram) {
  return {
    position: gl.getAttribLocation(program, 'aVertexPosition'),
    texture: gl.getAttribLocation(program, 'aTextureCoord'),
    position2: gl.getAttribLocation(program, 'aInstancePosition'),
    color2: gl.getAttribLocation(program, 'aInstanceColor'),

    color: gl.getUniformLocation(program, 'uVertexColor')!,
    transform: gl.getUniformLocation(program, 'uTransformMatrix')!,
    sampler: gl.getUniformLocation(program, 'uSampler')!,
    usage: gl.getUniformLocation(program, 'uShaderUsage')!,
  }
}