export default function after(arr, item) {
  const index = arr.indexOf(item)
  if (index === -1 || index >= arr.length - 1) return undefined
  return arr[index + 1]
}
