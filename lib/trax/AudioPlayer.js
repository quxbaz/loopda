/*
  Audio player and timer

  API:

  constructor({
    audioService: <AudioService instance>,
    store: <redux store>,
    tickInterval: <interval in milliseconds between ticks>
  })

*/

import isNil from 'qux/lib/isNil'
import Timer from 'timer2'
import blips from './blips'
import channels from './channels'
import blocks from './blocks'
import songs from './songs'
import mixables from './mixables'
import player from './player'
import songPlayer from './song-player'
import AudioService from './AudioService'

const identity = (x) => x

class AudioPlayer {

  constructor({audioService, store, tickInterval, songTickInterval}) {

    // Method bindings
    this.handleTimerTick = this.handleTimerTick.bind(this)
    this.handleSongTimerTick = this.handleSongTimerTick.bind(this)

    // Keepings references to arguments
    this.audioService = audioService
    this.store = store

    // Timers
    this.timer = new Timer({tickInterval})
    this.songTimer = new Timer({tickInterval: songTickInterval || tickInterval})

    // Timer events
    this.timer.on('tick', this.handleTimerTick)
    this.songTimer.on('tick', this.handleSongTimerTick)

  }

  start() {
    this.timer.start()
  }

  pause() {
    this.timer.stop()
  }

  tick() {
    this.store.dispatch(player.actions.tick())
    const state = this.store.getState()
    const block = player.selectors.getCurrentBlock(state)
    if (isNil(block))
      return
    blocks.selectors.getEnabledChannels(block.id)(state).forEach((channel) => {
      this.playBlip(state, channel.blips[state.player.currentBeat])
    })
  }

  handleTimerTick() {
    if (!this.store.getState().player.playing)
      return
    this.tick()
  }

  restartSong() {
    this.store.dispatch(
      songPlayer.actions.restart()
    )
    this.songTimer.restart()
  }

  startSong() {
    this.store.dispatch(
      songPlayer.actions.play()
    )
    this.songTimer.start()
  }

  pauseSong() {
    this.songTimer.stop()
    this.store.dispatch(
      songPlayer.actions.pause()
    )
  }

  stopSong() {
    this.songTimer.stop()
    this.store.dispatch(
      songPlayer.actions.stop()
    )
  }

  tickSong() {

    this.store.dispatch(songPlayer.actions.tick())

    const state = this.store.getState()
    const {beats, currentBeat, loop} = state.songPlayer
    const song = songPlayer.selectors.getCurrentSong(state)
    const totalBeats = song.blocks.length * beats
    const nBlock = Math.floor(currentBeat / beats)
    const nBlip = currentBeat % beats

    if (!isNil(song.blocks[nBlock])) {
      const block = blocks.selectors.getById(song.blocks[nBlock])(state)
      const channels = blocks.selectors.getEnabledChannels(block.id)(state)
      channels.forEach((channel) => {
        this.playBlip(state, channel.blips[nBlip])
      })
    }

    if (currentBeat >= totalBeats - 1) {
      if (loop) {
        this.store.dispatch(songPlayer.actions.restart())
      } else {
        this.stopSong()
      }
    }

  }

  handleSongTimerTick() {
    if (!this.store.getState().songPlayer.playing)
      return
    this.tickSong()
  }

  playBlip(state, blipId, stateTransform=identity) {
    if (isNil(blipId))
      return
    const blip = blips.selectors.getById(blipId)(state)
    const mixable = mixables.selectors.getById(blip.mixable)(state)
    this.audioService.play(
      stateTransform({...blip, ...mixable})
    )
  }

}

export default AudioPlayer
