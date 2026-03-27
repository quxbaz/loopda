import isNil from 'qux/lib/isNil'
import last from 'qux/lib/last'

export default class AudioService {

  constructor(audioContext, sampleMap={}) {
    if (audioContext === undefined)
      throw new Error('You must provide an AudioContext object.')
    this.audioContext = audioContext
    this.sampleMap = sampleMap
    this.nodes = {
      end: audioContext.destination,
      masterGain: this.audioContext.createGain(),
    }
    this.nodes.masterGain.connect(this.nodes.end)
  }

  drop() {
    /*
      Silences any sounds currently playing, but does not prevent
      scheduling future sounds.
    */
    this.switchOff(true)
    this.switchOn()
  }

  switchOff(drop=true) {
    /*
      If @drop is true, scheduled sounds will not be resumed when
      switchOn() is called.
    */
    this.nodes.masterGain.gain.value = 0
    if (drop) {
      this.nodes.masterGain = this.audioContext.createGain()
      this.nodes.masterGain.gain.value = 0
      this.nodes.masterGain.connect(this.nodes.end)
    }
  }

  switchOn() {
    this.nodes.masterGain.gain.value = 1
  }

  isMute(state) {
    return state.mute || !state.sample
  }

  play(state) {
    if (this.isMute(state))
      return
    const source = this.audioContext.createBufferSource()
    source.buffer = this.sampleMap[state.sample]
    this.setSourceNode(source, state)
    const nodes = [
      source,
      ...this.createNodes(state)
    ]
    for (let i=1; i < nodes.length; i++)
      nodes[i - 1].connect(nodes[i])
    last(nodes).connect(this.nodes.masterGain)
    source.start(this.audioContext.currentTime + (state.offset || 0) / 1000)
  }

  setSourceNode(source, state) {
    if (!isNil(state.rate))
      source.playbackRate.value = state.rate
  }

  createNodes(state) {
    const gainNode = this.audioContext.createGain()
    if (!isNil(state.gain))
      gainNode.gain.value = state.gain
    return [gainNode]
  }

}
