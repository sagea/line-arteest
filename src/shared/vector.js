export function Vector(x, y) {
    return { x, y };
};

export function Line(from, to) {
    return { from, to };
}

export function zero () {
    return Vector(0, 0);
}

export function rotate ({x, y}, rad) {
	return Vector(
        (x * Math.cos(rad)) - (y * Math.sin(rad)),
        (x * Math.sin(rad)) + (y * Math.cos(rad)),
    );
}

export function add(...vectors) {
    return vectors.reduce((a, b) => Vector(
        a.x + b.x,
        a.y + b.y,
    ));
}

export function floor({ x, y }) {
    return Vector(Math.floor(x), Math.floor(y));
}