// CSS stuff
// import {computeStyles} from 'globals/style-constants'

// Audio stuff
// import samples from 'globals/samples'
// import {loadAudioSamples} from 'audio/audiohelper'
// import audioContext from 'globals/audioContext'
// import audioService from 'globals/audioService'

// Sequencer
// import {Sequencer} from 'trax'
// import SequencerHelper from 'helpers/sequencer'

import React from 'react'
import {render} from 'react-dom'
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import app from './app'

export default class App {

  constructor() {
    // window.app = this  // Set app to global property
    // this.createSequencer()
    this.store = createStore(
      app.reducer,
      compose(
        applyMiddleware(
          thunkMiddleware,
          createLogger()
        ),
        window.devToolsExtension ? window.devToolsExtension() : undefined
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
    return Promise.resolve()
    // return Promise.all([
    //   loadAudioSamples(audioContext, samples).then((sampleMap) => {
    //     audioService.sampleMap = sampleMap
    //   })
    // ]).then(computeStyles)
  }

  start() {
    this.store.subscribe(() => {
      render(
        <Provider store={this.store}>
          <app.AppContainer />
        </Provider>,
        document.getElementById('root')
      )
    })
    this.store.dispatch({type: null})
  }

}
