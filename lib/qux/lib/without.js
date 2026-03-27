export default function without(arr, ...values) {
  const toRemove = values.flat()
  return arr.filter((item) => !toRemove.includes(item))
}
