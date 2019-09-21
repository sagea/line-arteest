import { html, directive } from 'lit-html/lit-html';
// import { StatefullComponent } from "../../shared/Component.js";
import { drawLine, clear, translateToCenter, FullWindowCanvas } from '../../../shared/canvas';
import { StatefullComponent } from '../../../shared/Component';

const createWorker = (fn) => {
    if (typeof fn !== 'function') throw new Error('Fn requires a function');
    const blobWorkerCode = new Blob([`(${fn.toString()})();`], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blobWorkerCode));
}
const canvasStasher = new WeakMap();
export const PathCanvas = StatefullComponent(() => {
    const canvas = FullWindowCanvas();
    const ctx = canvas.getContext('2d');
    let lastLength = 0;
    function next() {
        return lastLength++;
    }
    return ({ path }) => {
        function render(path) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.save();
                ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.moveTo(path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) {
                    ctx.lineTo(path[i].x, path[i].y);
                }
                ctx.stroke();
                ctx.restore();
        };
        function reset() {
            lastLength = 0;
            clear(ctx);
        }
        if (path.length) {
            render(path);
        } else {
            reset();
        }
        
        return canvas;
    };
}, {});
