export default {

  sorted(channels) {
    // Returns a new array of channels sorted by order created
    return  [...channels].sort((a, b) => {
      let diff = a.state.time_created - b.state.time_created;
      return diff / Math.abs(diff);
    });
  }

};
