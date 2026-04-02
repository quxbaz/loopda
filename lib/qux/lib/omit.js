export default function omit(obj, ...keys) {
  if (typeof keys[0] === 'function') {
    const predicate = keys[0]
    const result = {}
    Object.keys(obj).forEach((key) => {
      if (!predicate(obj[key], key)) {
        result[key] = obj[key]
      }
    })
    return result
  }
  const keysToOmit = keys.flat()
  const result = {}
  Object.keys(obj).forEach((key) => {
    if (!keysToOmit.includes(key)) {
      result[key] = obj[key]
    }
  })
  return result
}
