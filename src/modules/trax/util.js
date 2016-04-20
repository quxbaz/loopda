export default {

  randomChannelHSL() {
    /*
      Generates a random color (within a limited palette) for a channel
    */
    const hue = Math.random() * 160 + 200
    return `hsl(${hue}, 100%, 70%)`
  }

}
