export default {

  soloMode(sequencer) {
    /*
      Returns true if any channels have the solo attribute true.
    */
    return sequencer.state.channels.some(channel =>
      !channel.state.archived && channel.state.solo
    );
  },

  newChannelNumber(channels) {
    /*
      Generates a new channel number.
    */
    let highest = 0;
    for (let channel of channels)
      highest = Math.max(channel.state.number, highest);
    return highest + 1;
  }

};
