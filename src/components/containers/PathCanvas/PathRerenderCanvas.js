import { clear, FullWindowCanvas, translateToCenter, createOffscreenCanvasWorker } from '../../../shared/canvas';
import { StatefullComponent, OneTimeElementComponent } from '../../../shared/Component';

function toArrayBuffer (path) {
    const length = path.length;
    const arr = new Int16Array(path.length * 2);
    for (let i = 0; i < length; i++) {
        arr[i * 2] = path[i].x;
        arr[(i * 2) + 1] = path[i].y;
    }
    return arr.buffer;
}
export const PathReRenderCanvasPerformant = (appendTo) => {
    const resolution = 2;
    const canvas = FullWindowCanvas(resolution);
    const animate = (time) => (ctx, { path=[], size }) => {
        if (ctx.canvas.width !== size.width) {
            ctx.canvas.width = size.width;
        }
        if (ctx.canvas.height !== size.height) {
            ctx.canvas.height = size.height;
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (path.byteLength === 0) return;
        const res = new Int16Array(path);
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(res[0], res[1]);
        for (let i = 0; i < res.length;) {
            ctx.lineTo(res[i++], res[i++]);
        }
        ctx.stroke();
        ctx.restore();
    };
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const options = { alpha: false };
    const setState = createOffscreenCanvasWorker(animate, offscreenCanvas, options);

    function toArrayBuffer (path) {
        const length = path.length;
        const arr = new Int16Array(path.length * 2);
        for (let i = 0; i < length; i++) {
            arr[i * 2] = path[i].x;
            arr[(i * 2) + 1] = path[i].y;
        }
        return arr.buffer;
    }
    appendTo.appendChild(canvas);
    return ({ path }) => {
        const arrayBuffer = toArrayBuffer(path);
        setState({ path: arrayBuffer }, [arrayBuffer]);
    };
};
export const PathReRenderCanvas = StatefullComponent(() => {
    const resolution = 2;
    const canvas = FullWindowCanvas(resolution);
    const animate = () => (ctx, { path=[] }) => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (path.byteLength === 0) return;
        const res = new Int16Array(path);
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(res[0], res[1]);
        for (let i = 0; i < res.length;) {
            ctx.lineTo(res[i++], res[i++]);
        }
        ctx.stroke();
        ctx.restore();
    };
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const options = { alpha: false };
    const setState = createOffscreenCanvasWorker(animate, offscreenCanvas, options);

    
    return ({ path }) => {
        const arrayBuffer = toArrayBuffer(path);
        setState({ path: arrayBuffer }, [arrayBuffer]);
        return canvas;
    };
}, {});


export const PathReRenderCanvasWebgl = (appendTo) => {
    const canvas = FullWindowCanvas();

    const animate = (gl) => {
        const createShader = (gl, shaderType, shaderSource) => {
            const shader = gl.createShader(shaderType);
            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);
            return shader;
        }
        const createVertexShader = (gl, shaderSource) => createShader(gl, gl.VERTEX_SHADER, shaderSource);
        const createFragmentShader = (gl, shaderSource) => createShader(gl, gl.FRAGMENT_SHADER, shaderSource);
        const createProgram = (gl, ...shaders) => {
            const program = gl.createProgram();
            for (let shader of shaders) {
                gl.attachShader(program, shader);
            }
            gl.linkProgram(program);
            return {
                get program() { return program; },
                activateVariable(type, name) {
                    return ({
                        'vec2': () => {
                            const attribPosition = gl.getAttribLocation(program, name);
                            gl.vertexAttribPointer(attribPosition, 2, gl.FLOAT, false, 0, 0);
                            gl.enableVertexAttribArray(attribPosition);
                        }
                    })[type]()
                }
            };
        }
        const pathBuffer = (gl, path) => {
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(path), gl.STATIC_DRAW);
            return {
                draw () {
                    gl.drawArrays(gl.LINE_STRIP, 0, path.length / 2);
                }
            };
        }
        const clear = (gl) => {
            gl.clearColor(1, 1, 1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        const vs = createVertexShader(gl, `
            precision mediump float;

            attribute vec2 position;

            void main(void) {
                gl_Position = vec4(position.x, position.y, 0.0, 1.0);
            }
        `);
        const fs = createFragmentShader(gl, `
            precision highp float;

            void main(void) {
                gl_FragColor = vec4(0.0,0.0,0.0,1.0);
            }
        `);
        const program = createProgram(gl, vs, fs);
        // const points = [];

        // let deg = 0;
        // const toRad = (deg) => deg * (Math.PI / 180);

        return (gl, { path=[] }) => {
            const {width, height} = gl.canvas;
            const f = Array.from(new Int16Array(path))
                .map((value, i) => {
                    if (i % 2 === 0) {
                        return value / width;
                    }
                    return value / height;
                })
            const pp = pathBuffer(gl, f);
            gl.viewport(0, 0, width, height);
            program.activateVariable('vec2', 'position');
            gl.useProgram(program.program);
            clear(gl);
            pp.draw({ lineWidth: 5 });
        }
    };
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const options = { 
        antialias: true,
        transparent: false,
    };
    const setState = createOffscreenCanvasWorker(animate, offscreenCanvas, options, 'webgl');
    appendTo.appendChild(canvas);
    return ({ path }) => {
        const arrayBuffer = toArrayBuffer(path);
        setState({ path: arrayBuffer }, [arrayBuffer]);
    }
}