export default function each(obj, fn) {
  if (Array.isArray(obj)) {
    obj.forEach(fn)
  } else if (obj != null) {
    Object.keys(obj).forEach((key) => fn(obj[key], key))
  }
}
