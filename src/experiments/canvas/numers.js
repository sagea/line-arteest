
const tl = v(0, 0)
const tm = v(0.3, 0)
const tr = v(0.6, 0)
const ml = v(0, 0.5)
const mm = v(0.3, 0.5)
const mr = v(0.6, 0.5)
const bl = v(0, 1)
const bm = v(0.3, 1)
const br = v(0.6, 1)

const zero = [
	tl, tr,
  br, bl,
  tl,
]
const one = [tm, bm]
const two = [
  tl, tr,
  mr, ml,
  bl, br
]
const three = [
  tl, tr,
  mr, ml, mr,
  br, bl,
]
const four = [
	tl, ml,
  mr, tr, mr,
	br
]

const five = [
	tr, tl,
  ml, mr,
  br, bl
]

const six = [
	tr, tl,
  bl, br,
  mr, ml,
]

const seven = [
	tl, tr,
  tr, bl,
]

const eight = [
	tl, tr,
  br, bl,
  tl, ml,
  mr,
]

const nine = [
	bl, br,
  tr, tl,
  ml, mr
]

const dot = [
  {}
]
const numbers = [zero, one, two, three, four, five, six, seven, eight, nine]
