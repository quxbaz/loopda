export default function omit(obj, ...keys) {
  const keysToOmit = keys.flat()
  const result = {}
  Object.keys(obj).forEach((key) => {
    if (!keysToOmit.includes(key)) {
      result[key] = obj[key]
    }
  })
  return result
}
