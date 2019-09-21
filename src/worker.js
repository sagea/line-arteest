importScripts('https://unpkg.com/esprima@4.0.1/dist/esprima.js');


var CACHE_NAME = 'my-site-cache-v1';

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll([]);
      })
      .catch(err => console.log('err', err))
  );
});

self.addEventListener('fetch', function (event) {
  const request = event.request;
  event.respondWith((async () => {
    const cacheResponse = await caches.match(request);
    if (cacheResponse) {
      return cacheResponse;
    }
    if (request.url.startsWith('https://unpkg.com/')) {
      const cache = await caches.open(CACHE_NAME);
      const response = await fetch(request);
      const init = {
        status: response.status,
        statusText: response.statusText,
        headers: {},
      };
      response.headers.forEach((v,k) => init.headers[k] = v);
      let text = await response.text();
      if (event.request.url.startsWith('https://unpkg.com/redux-actions@2.6.5')) {
          console.log('HELLO BRO!');    
      }
      try {
        text = await convertJavascriptFileToEsModule(text);
      } catch (err) {
        console.error(`Unable to convert ${request.url} file to browser module`, err);
      }
      const newResponse = new Response(text, init);
      cache.put(request, newResponse.clone());
      return newResponse.clone();
    }
    return fetch(request);
  })())
});
self.addEventListener('activate', function (event) {
  console.log('active');
  console.log('Finally active. Ready to start serving content!');
});

function convertJavascriptFileToEsModule(moduleText) {
  return new Promise((resolve, reject) => {
      const blob = new Blob([getWorkerScript()], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      const worker = new Worker(blobUrl);
      worker.onmessage = (event) => {
          worker.terminate();
          resolve(event.data);
      };
      worker.onerror = (event) => {
          worker.terminate();
          reject(event);
      };
      worker.postMessage(moduleText);
  });
  function getWorkerScript() {
    return `
    importScripts('https://unpkg.com/esprima@4.0.1/dist/esprima.js');
    
    onmessage = (event) => {
        postMessage(
            isEsModule(event.data)
                ? event.data
                : createExport(event.data)
        )
    }
    
    function isEsModule(text) {
        const parsed = esprima.parseModule(text);
        const { ImportDeclaration, ExportAllDeclaration, ExportNamedDeclaration, ExportDefaultDeclaration } = esprima.Syntax;
        const importExportDeclarations = [ExportAllDeclaration, ExportNamedDeclaration, ExportDefaultDeclaration];
        const hasEsModuleDeclarations = parsed.body.some(item => importExportDeclarations.includes(item.type));
        return hasEsModuleDeclarations;
    
    }
    function buildJs(wrapper) {
        return (imports, text) => {
            return \`
                    const f = ${wrapper(text).trim()}
                    ${
                        imports
                            .map(key => `export let ${key} = f.${key};`)
                            .join('\n')
                    }
                \`;
        }
    }
    
    function randomJavascriptVariable () {
        return '__' + Math.floor(Math.random() * 99999999999999);
    }
    
    function windowWrapper(text) {
        return \`
            (() => {
                let __WINDOW_SET_CHECKER__ = {};
                let __OG_WINDOW__ = window;
                let window = new Proxy(__OG_WINDOW__, {
                    get(obj, key) {
                        if (__WINDOW_SET_CHECKER__[key]) {
                            return Reflect.get(__WINDOW_SET_CHECKER__, key);
                        }
                        return Reflect.get(obj, key);
                    },
                    set(obj, key, value) {
                        return Reflect.set(__WINDOW_SET_CHECKER__, key, value);
                    }
                });
                __TEXT__
                return __WINDOW_SET_CHECKER__;
            })();
        \`
        .replace('__WINDOW_SET_CHECKER__', randomJavascriptVariable())
        .replace('__OG_WINDOW__', randomJavascriptVariable())
        .replace('__TEXT__', text);
    }
    function exportsWrapper(text) {
        return \`
            (() => {
                let exports = {};
                ${text};
                return exports;
            })();
        \`;
    }
    function thisWrapper(text) {
        return \`
            (function () {
                ${text}
                return this;
            }).call({});
        \`;
    }
    function isExportMethod(obj) {
        return Object.keys(obj).length !== 0;
    }
    function createExport(text) {
        function calc() {
            let exports = {};
            let window = {};
            eval(\`
                ${text}
            \`);
            
            if (isExportMethod(this)) {
                let imports = Object.keys(this);
                if (imports.length === 1) {
                    imports = Object.keys(this[imports[0]]);
                }
                console.log('this', imports);
                return buildJs(thisWrapper)(imports, text);
            }
    
            if (isExportMethod(window)) {
                let imports = Object.keys(window);
                if (imports.length === 1) {
                    imports = Object.keys(window[imports[0]]);
                }
                return buildJs(windowWrapper)(imports, text);
            }
    
            if (isExportMethod(exports)) {
                const imports = Object.keys(exports);
                return buildJs(exportsWrapper)(imports, text)
            }
        }
        return calc.call({}, text);
    }`
  }
}
