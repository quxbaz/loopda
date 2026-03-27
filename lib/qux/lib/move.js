export default function move(arr, fromIndex, toIndex) {
  const result = [...arr]
  const [item] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, item)
  return result
}
