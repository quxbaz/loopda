export default {

  soloMode(sequencer) {
    /*
      Returns if any channels have the solo attribute true.
    */
    return sequencer.state.channels.filter(channel => channel.state.solo)
      .length > 0;
  }

};
