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

// React stuff
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'stateful-router'

// Redux stuff
import {compose, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// Own stuff
import app from './app'
import url from './modules/url'

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

    window.addEventListener('hashchange', () => {
      this.store.dispatch(url.actions.setUrl(
        location.hash.slice(1)
      ))
    })

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

    this.store.dispatch(url.actions.setUrl(
      location.hash.slice(1)
    ))

    // testing
    this.store.dispatch({
      type: 'trax/CREATE_CHANNEL'
    })

  }

}
