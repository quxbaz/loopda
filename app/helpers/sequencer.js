export default {

  soloMode(sequencer) {
    /*
      Returns if any channels have the solo attribute true.
    */
    return sequencer.state.channels.some(channel => channel.state.solo);
  }

};
