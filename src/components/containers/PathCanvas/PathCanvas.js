import { directive } from 'lit-html/lit-html';
import { clear } from '../../../shared/canvas';
import { rotate, Vector, zero, add } from '../../../shared/vector';

const pathContextStore = new WeakMap();

export const getPathDimensions = (path) => {
    let top = 0
    let bottom = 0;
    let left = 0;
    let right = 0;
    for (let point of path) {
        top = Math.min(point.y, top)
        bottom = Math.max(point.y, bottom)
        left = Math.min(point.x, left)
        right = Math.max(point.x, right)
    }
    return {
        top,
        bottom,
        left,
        right,
        height: bottom - top,
        width: right - left,
    };
}
export const defaultColorModifier = () => 'black';
export const PathCanvas = directive(({ linkConfig, path, width, height, colorModifier=defaultColorModifier }) => (part) => {
    if (!pathContextStore.has(part)) {
        const div = document.createElement('div');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        Object.assign(div.style, {
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        })
        div.appendChild(canvas);
        pathContextStore.set(part, ctx);
        part.setValue(div);
    }
    const ctx = pathContextStore.get(part);
    if (ctx.canvas.width !== width) {
        ctx.canvas.width = width;
    }
    if (ctx.canvas.height !== height) {
        ctx.canvas.height = height;
    }
    clear(ctx);
    if (path.length) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawPath(ctx, path, { colorModifier, lineWidth: .5 });
    }
    if (linkConfig && linkConfig.length) {
        const path = linkConfig
            .map(link => rotate(Vector(link.length, 0), link.rotation))
            .reduce((a, b) => a.concat(add(a[a.length - 1], b)), [zero()])
        drawPath(ctx, path, { colorModifier, lineWidth: 2 });
    }
});

const drawPath = (ctx, path, { colorModifier, lineWidth }) => {
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.beginPath();
    ctx.strokeStyle = colorModifier();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
    ctx.restore();
}

/*
    interface StyledPath {
        styles: {
            color: string;
        },
        path: Vector[]
    }

*/
export const isObjectEqual = (a, b) => {
    const keys = Array.from(new Set(Object.keys(a), Object.keys(b)));
    for (let key of keys) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
// const processPath = (path, colorModifier) => {
//     return path.reduce((styledPath, point) => {
        
//     }, []);
// }
