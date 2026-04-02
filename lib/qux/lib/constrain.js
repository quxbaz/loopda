export default function constrain(value, min, max) {
  if (Array.isArray(min)) {
    max = min[1]
    min = min[0]
  }
  return Math.min(Math.max(value, min), max)
}
