// React stuff
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'stateful-router'

// Redux stuff
import {compose, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// App-related libs
import each from 'qux/lib/each'
import {sequencer, presets, AudioService, Player} from 'trax'

// CSS stuff
import {computeStyles} from './globals/style-constants'

// Audio stuff
import samples from './globals/samples'
import audioContext from './globals/audioContext'
import audioService from './globals/audioService'
import {loadAudioSamples} from './audio/audiohelper'

// Own stuff
import app from './app'
import url from './modules/url'
import traxExt from './modules/trax-ext'
import ui from './modules/ui'

export default class App {

  constructor() {
    this.store = createStore(
      app.reducer,
      compose(
        applyMiddleware(
          thunkMiddleware
          , createLogger({collapsed: true})
        )
        // , window.devToolsExtension ? window.devToolsExtension() : undefined
      )
    )
  }

  // createSequencer() {
  //   let sequencer = new Sequencer()
  //   this.sequencer = sequencer
  //   sequencer.on('playBlip', (blip, channel) => {
  //     if (SequencerHelper.soloMode(sequencer)) {
  //       if (channel.state.solo)
  //         audioService.playBlip(blip.getPlayState())
  //     } else
  //       audioService.playBlip(blip.getPlayState())
  //   })
  // }

  init() {
    return Promise.all([
      loadAudioSamples(audioContext, samples).then((sampleMap) => {
        audioService.sampleMap = sampleMap
      })
    ]).then(computeStyles)
  }

  start() {

    this.store.subscribe(() => {
      const state = this.store.getState()
      render(
        <Provider store={this.store}>
          <Router path={state.url}>
            <app.containers.App />
          </Router>
        </Provider>,
        document.getElementById('root')
      )
    })

    window.addEventListener('hashchange', () => {
      this.store.dispatch(url.actions.setUrl(
        location.hash.slice(1)
      ))
    })

    // <Testing>

    this.store.dispatch(
      sequencer.actions.createSequencer({playing: false})
    )

    this.store.dispatch(
      ui.actions.setSize(50)
    )

    // Create presets
    this.store.dispatch(presets.actions.createPreset({sample: 'hihat'}))
    this.store.dispatch(presets.actions.createPreset({sample: 'snare'}))
    this.store.dispatch(presets.actions.createPreset({sample: 'kick'}))
    this.store.dispatch(presets.actions.createPreset({sample: 'clap'}))

    each(this.store.getState().presets, (preset) => {
      this.store.dispatch(
        traxExt.actions.createChannel({preset: preset.id})
      )
    })

    this.store.dispatch(url.actions.setUrl(
      location.hash.slice(1)
    ))

    // Creating audio player
    this.player = new Player({
      audioService,
      store: this.store,
      tickInterval: this.store.getState().sequencer.beatDuration
    })

    this.player.start()

  }

}
