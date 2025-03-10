import { rotate, add, floor, Vector } from '../../shared/vector';
import { toRad } from '../../shared/math';
import { applyLinkConfig, setLinkRotation, setPath } from '../modules/Link';
import { batchActions } from '../../shared/batchedActions';

export function rotateLines(deltaTime, frameTime) {
    const iterationsPerSecond = {
        min: 100,
        max: 10000,
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
        let linkConf = linkConfig.map(i => {
            if (i.modifier) {
                const res = {
                    ...i,
                    ...i.modifier(i, frameTime),
                };
                res.speedRad = toRad(res.speed);
                return res;
            }
            return i;
        });
        
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
export function updateForm({ speed, options, optionsConfig }) {
    return (dispatch, getState) => {
        var a = instance++;
        if (animationInstance) cancelAnimationFrame(animationInstance);
        const lineData = optionsConfig.map((optionConfig) => ({ ...optionConfig, speedRad: toRad(optionConfig.speed), rotation: 0 }));
        // var string = options.trim().split('\n');
        // var lineData = string
        //     .map(line => line.trim())
        //     .filter(line => !!Boolean(line))
        //     .map(line =>
        //         line
        //             .split(/\s+/)
        //             .map(line => line.trim())
        //             .map(parseFloat)
        //     )
        //     .map(([length, speed, sizeIncrease = 0]) => ({ length, speed, speedRad: toRad(speed), sizeIncrease, rotation: 0 }));
        
        dispatch(applyLinkConfig(lineData));
        dispatch(setPath([]));
        let lastTime;
        animationInstance = requestAnimationFrame(animate);
        function animate(time) {
            let deltaTime = (time - lastTime) || 0;
            zzz(1000 / (deltaTime || 1));
            // logger.postMessage(1000 / deltaTime);
            // item.value = 1000 / deltaTime;
            dispatch(rotateLines(deltaTime, time));
            lastTime = time;
            animationInstance = requestAnimationFrame(animate);
        }
    };
}
