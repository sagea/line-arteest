console.log('hello!');
navigator.serviceWorker.register('/worker.js')
    .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
    .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
    });
