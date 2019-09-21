
export function clear(ctx) {
    const { width, height } = ctx.canvas;
    ctx.clearRect((width / 2) - 200, (height / 2) - 200, width + 200, height + 200);
}

export function drawLine(ctx, from, to, {
    strokeStyle = 'black'
}={}) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
}

export function FullWindowCanvas () {
    const res = 2;
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        // maxWidth: '100%'
        transformOrigin: '0 0',
        transform: `scale(${1/res}, ${1/res})`,
        border: '1px solid #ccc',
    });
    window.addEventListener('resize', () => {
        console.log('resize');
        updateCanvasDimensions();
    })
    updateCanvasDimensions();
    function updateCanvasDimensions() {
        canvas.width = window.innerWidth * res;
        canvas.height = window.innerHeight * res;
    }
    return canvas;
}


export function translateToCenter(ctx) {
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
}

export function createOffscreenCanvasWorker(animateMethod, offScreenCanvas, contextOptions={}, context='2d') {
    const blob = new Blob([`
        const FpsTracker = (callback, debounceIterations=15) => {
            let arr = [];
            let lastTime;
            return (time) => {
                if (typeof time !== 'number') return;
                if (!lastTime) lastTime = time;
                let detla = time - lastTime;
                arr.push(time - lastTime);
                if (arr.length === debounceIterations) {
                    const fps = 1000 / (arr.reduce((a, b) => a + b) / debounceIterations);
                    callback(fps);
                    arr = [];
                }
                lastTime = time;
            };
        }
        const method = ${animateMethod.toString()};
        let state = {};
        let cvs;
        let ctx;
        let tracker = FpsTracker(console.log, 15);
        const handlers = {
            canvas: ({ canvas }) => {
                cvs = canvas;
                ctx = cvs.getContext('${context}', ${JSON.stringify(contextOptions)});
                ctx.imageSmoothingEnabled = false;
                console.log(ctx);
                const mname = method(ctx);
                const animate = (time) => {
                    // tracker(time);
                    mname(ctx, state);
                    requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            },
            setState: (newState) => {
                state = { ...state, ...newState };
            }
        };
        onmessage = event => handlers[event.data.type](event.data.payload);
    `], {
        type: 'application/javascript'
    });
    const worker = new Worker(URL.createObjectURL(blob));
    const createMessage = (type, payload) => ({ type, payload });
    worker.postMessage(createMessage('canvas', { canvas: offScreenCanvas }), [ offScreenCanvas ]);
    
    return (newState, transfers) => {
        worker.postMessage(createMessage('setState', { ...newState }), transfers)
    }
}
