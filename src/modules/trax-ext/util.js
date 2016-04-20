export default {

  randomChannelHSL() {
    /*
      Generates a random color (within a limited palette) for a channel
    */
    const hue = Math.random() * 160 + 200
    return `hsl(${hue}, 100%, 70%)`
  },

  getNextNumber(channels) {
    let highest = 0
    channels.forEach((channel) => {
      if (channel.number > highest)
        highest = channel.number
    })
    return highest + 1
  }

}
