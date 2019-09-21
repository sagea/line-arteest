export function createWorkerFromMethod(method) {
    const methodStr = method.toString() + '';
    const content = methodStr.substring(methodStr.indexOf('{') + 1, methodStr.lastIndexOf('}'));
    const blob = new Blob([content], {
        type: 'application/javascript'
    });
    return new Worker(URL.createObjectURL(blob));
}