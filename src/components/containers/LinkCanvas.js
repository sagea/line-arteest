import { StatefullComponent, OneTimeElementComponent } from '../../shared/Component';
import { clear, FullWindowCanvas, drawLine, translateToCenter, createOffscreenCanvasWorker } from '../../shared/canvas';
import { add, zero, Vector, rotate } from '../../shared/vector';

export const LinkCanvasPerformant = (appendTo) => {
    const canvas = FullWindowCanvas(2);

    const animate = () => (ctx, { path=[] }) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (path.length === 0) return;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.moveTo(path[0].x, path[0].y);
        for (let { x, y } of path) {
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
    };
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const options = {  };
    const setState = createOffscreenCanvasWorker(animate, offscreenCanvas, options);
    appendTo.appendChild(canvas);
    return ({ linkConfig }) => {
        const path = linkConfig
            .map(link => rotate(Vector(link.length, 0), link.rotation))
            .reduce((a, b) => a.concat(add(a[a.length - 1], b)), [zero()]);
        setState({ path });
    };
};

export const LinkCanvas = StatefullComponent(() => {
    const canvas = FullWindowCanvas(2);

    const animate = () => (ctx, { path=[] }) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (path.length === 0) return;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.moveTo(path[0].x, path[0].y);
        for (let { x, y } of path) {
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
    };
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const options = { desynchronized: true };
    const setState = createOffscreenCanvasWorker(animate, offscreenCanvas, options);
    return ({ linkConfig }) => {
        const path = linkConfig
            .map(link => rotate(Vector(link.length, 0), link.rotation))
            .reduce((a, b) => a.concat(add(a[a.length - 1], b)), [zero()]);
        setState({ path });
        return canvas;
    };
});
