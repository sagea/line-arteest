const v2 = (x, y) => [x, y]
v2.add = (a, b) => {
  b = typeof b === 'number' ? v2(b, b) : b
  return v2(a[0] + b[0], a[1] + b[1])
}
v2.mult = (a, b) => {
  b = typeof b === 'number' ? v2(b, b) : b
  return v2(a[0] * b[0], a[1] * b[1])
}
v2.fromAngle = angle => v2(Math.cos(angle), Math.sin(angle))
v2.distance = (a, b) => {
  b = typeof b === 'number' ? v2(b, b) : b
  const xDist = b[0] - a[0]
  const yDist = b[1] - a[1]
  if (xDist === 0) return yDist
  if (yDist === 0) return xDist
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2))
}

export { v2 }
