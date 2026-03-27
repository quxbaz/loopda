export default function before(arr, item) {
  const index = arr.indexOf(item)
  if (index <= 0) return undefined
  return arr[index - 1]
}
