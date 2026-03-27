export default function mapValues(obj, fn) {
  const result = {}
  Object.keys(obj).forEach((key) => {
    result[key] = fn(obj[key], key)
  })
  return result
}
