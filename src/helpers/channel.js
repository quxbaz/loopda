export default {

  sorted(channels) {
    // Returns a new array of channels sorted by order created
    return  [...channels].sort((a, b) => {
      let diff = a.state.time_created - b.state.time_created;
      return diff / Math.abs(diff);
    });
  },

  randomChannelHSL() {
    /*
      Generates a random color (within a limited palette) for a channel
    */
    let hue = Math.random() * 160 + 200;
    return `hsl(${hue}, 100%, 70%)`;
  }

};
