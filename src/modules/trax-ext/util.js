const BEATS = 16

export default {

  getNextNumber(channels) {
    let highest = 0
    channels.forEach((channel) => {
      if (channel.number > highest)
        highest = channel.number
    })
    return highest + 1
  },

  getBeatClicked(event, el) {
    /*
      Detects which beat position was clicked by looking at the position
      of the mouse click compared to the dimensions of the channel
      element. This exists as an optimization that bypasses the need to
      render individual click-watching blip elements.
    */
    const {left, right} = el.getBoundingClientRect()
    const channelWidth = right - left
    const blipWidth = channelWidth / BEATS
    return Math.floor((event.clientX - left) / blipWidth)
  },

}
