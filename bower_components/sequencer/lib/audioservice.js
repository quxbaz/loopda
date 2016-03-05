/*
  audioservice.js

  <Usage>
  let sequencer = new Sequencer();
  let audioService = new AudioService();
  sequencer.on('playBlip', blipState => {
    audioService.playBlip(blipState);
  });
*/

let defaultGainValue = (() => {
  let val;
  return audioContext => {
    if (val)
      return val;
    val = audioContext.createGain().gain.value;
    return val;
  };
})();

export default class AudioService {

  constructor(audioContext, sampleMap={}) {
    if (audioContext === undefined)
      throw Error('You must provide an AudioContext object.');
    this.audioContext = audioContext;
    this.sampleMap = sampleMap;
  }

  playBlip(blipState) {
    if (blipState.mute || !blipState.sample)
      return;
    let source = this.audioContext.createBufferSource();
    source.buffer = this.sampleMap[blipState.sample];
    this.linkModifiers(blipState, source);
    source.connect(this.audioContext.destination);
    source.start(this.audioContext.currentTime + (blipState.offset || 0) / 1000);
  }

  linkModifiers(blipState, source) {
    // Links modifier nodes to a buffer source.
    source.playbackRate.value = blipState.rate;
    if (blipState.gain != defaultGainValue(this.audioContext)) {
      let gainNode = this.audioContext.createGain();
      gainNode.gain.value = blipState.gain;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
    }
  }

}
