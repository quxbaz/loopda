export default {

  getNextNumber(channels) {
    let highest = 0
    channels.forEach((channel) => {
      if (channel.number > highest)
        highest = channel.number
    })
    return highest + 1
  },

}
