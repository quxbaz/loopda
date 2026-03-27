const replaceAt = (arr, i, sub) => {
  /*
    Returns a copy of arr where the item at position @i is replaced by
    @sub. Does not affect the passed in array @arr.
  */
  const newArr = [...arr]
  newArr[i] = sub
  return newArr
}

const replaceAt2d = (arr, [x, y], sub) => {
  const newArr = [...arr]
  newArr[y] = replaceAt(newArr[y], x, sub)
  return newArr
}

const getEnabledChannels = (channels) => {
  /*
    From @channels, pick out only the ones that are enabled.
  */
  const soloChannels = channels.filter(c => c.solo && !c.archived)
  if (soloChannels.length > 0)
    return soloChannels
  else
    return channels.filter(c => !c.mute && !c.archived)
}

export default {
  replaceAt, replaceAt2d,
  getEnabledChannels,
}
