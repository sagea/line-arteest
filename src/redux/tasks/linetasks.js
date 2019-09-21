import { rotate, add, floor, Vector } from '../../shared/vector.js';
import { toRad } from '../../shared/math.js';
import { applyLinkConfig, setLinkRotation, setPath } from '../modules/Link.js';
import { createWorkerFromMethod } from '../../shared/worker.js';
import { batchActions } from '../../shared/batchedActions.js';

export function rotateLines(deltaTime) {
    const iterationsPerSecond = {
        min: 100,
        max: 3000,
    }
    return (dispatch, getState) => {
        const {
            linkReducer: {
                path,
                linkConfig,
                links,
            },
            optionFormReducer: {
                speed,
                maxPoints
            }
        } = getState();
        let newPath = [...path];
        let currentLinkRotation = links;
        const iterationsPerSecondTotal = iterationsPerSecond.min + ((iterationsPerSecond.max - iterationsPerSecond.min) * speed);
        const iterations = Math.floor((deltaTime / 1000) * iterationsPerSecondTotal);
        let linkConf = linkConfig;
        for (let i = 0; i < iterations; i++) {
            linkConf = linkConf.map((conf) => {
                return {
                    ...conf,
                    rotation: conf.rotation + conf.speedRad,
                };
            });
            const items = linkConf
                .map((conf) => rotate(Vector(conf.length, 0), conf.rotation));
                
            newPath.push(floor(add(...items)));
        }
        dispatch(batchActions([
            applyLinkConfig(linkConf),
            setPath(newPath.slice(-maxPoints)),
        ]));
    };
}
const f = document.createElement('input');
document.body.appendChild(f);
Object.assign(f.style, {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 999,
});
let arr = new Array(15).fill(0);
let total = 0;
function zzz(item) {
    total += item;
    arr.push(item);
    total -= arr.shift(item);
    f.value = Math.round(total / 15);
}
// const logger = createWorkerFromMethod(() => {
//     onmessage = e => ;
// })
let animationInstance; 
let instance = 0;
export function updateForm({ speed, options }) {
    return (dispatch, getState) => {
        var a = instance++;
        if (animationInstance) cancelAnimationFrame(animationInstance);
        var string = options.trim().split('\n');
        var lineData = string
            .map(line => line.trim())
            .filter(line => !!Boolean(line))
            .map(line =>
                line
                    .split(/\s+/)
                    .map(line => line.trim())
                    .map(parseFloat)
            )
            .map(([length, speed, sizeIncrease = 0]) => ({ length, speed, speedRad: toRad(speed), sizeIncrease, rotation: 0 }));
        
        dispatch(applyLinkConfig(lineData));
        dispatch(setPath([]));
        let lastTime;
        animationInstance = requestAnimationFrame(animate);
        function animate(time) {
            let deltaTime = (time - lastTime) || 0;
            zzz(1000 / (deltaTime || 1));
            // logger.postMessage(1000 / deltaTime);
            // item.value = 1000 / deltaTime;
            dispatch(rotateLines(deltaTime));
            lastTime = time;
            animationInstance = requestAnimationFrame(animate);
        }
    };
}
