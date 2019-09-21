import { html, directive } from 'lit-html/lit-html';
// import { StatefullComponent } from "../../shared/Component.js";
import { drawLine, clear, translateToCenter } from '../../../shared/canvas';
import { StatefullComponent } from '../../../shared/Component';

const createWorker = (fn) => {
    if (typeof fn !== 'function') throw new Error('Fn requires a function');
    const blobWorkerCode = new Blob([`(${fn.toString()})();`], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blobWorkerCode));
}
const canvasStasher = new WeakMap();
export const PathCanvas = StatefullComponent(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    Object.assign(canvas.style, {
        maxWidth: '100%',
    });
    const ctx = canvas.getContext('2d');
    let lastLength = 0;
    function next() {
        return lastLength++;
    }
    return ({ path }) => {
        function render(path) {
            const pathLength = path.length;
            if (pathLength === 0) return;
            if (lastLength === pathLength) return;

            if (lastLength <= path.length) {
                const next = () => {
                    return path[lastLength++];
                }
                ctx.save();
                translateToCenter(ctx);
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                lastLength = Math.max(lastLength - 4, 0);
                ctx.moveTo(next(), next());
                while(lastLength <= pathLength) {
                    ctx.lineTo(next(), next());
                }
                ctx.stroke();
                ctx.restore();
            }
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
