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
import isNil from 'qux/lib/isNil'
import each from 'qux/lib/each'
import {
  blocks, blockAdmin,
  songs, songAdmin,
  presets, player,
  AudioService, AudioPlayer,
} from 'trax'

// CSS stuff
import {computeStyles} from './globals/style-constants'

// Audio stuff
import audioService from './globals/audioService'
import {createAudioBuffer} from './audio/helper'

// Database stuff
import db from './db'

// Own stuff
import app from './app'
import url from './modules/url'
import traxExt from './modules/trax-ext'
import audio from './modules/audio'

export default class App {

  constructor() {
    window.loopda = this  // Set to global object
    const data = localStorage.getItem('loopda')
    this.isNew = isNil(data)
    this.store = createStore(
      app.reducer,
      this.isNew ? {} : JSON.parse(data),
      compose(
        applyMiddleware(
          thunkMiddleware
          , createLogger({collapsed: true})
        )
        // , window.devToolsExtension ? window.devToolsExtension() : undefined
      )
    )
    this.dispatch = this.store.dispatch.bind(this.store)
  }

  init() {

    const defaultSamples = ['hihat', 'snare', 'kick', 'clap']

    return db.create().then(
      db.getSamples
    ).then((samples) => {
      if (samples.length === 0) {
        // Fetch initial samples if none were found in cache.
        const pending = defaultSamples.map(
          (name) => createAudioBuffer.from.url(`media/samples/${name}.mp3`, name)
        )
        return Promise.all(pending).then(() => {
          defaultSamples.forEach((name) => {
            this.store.dispatch(audio.actions.addSample(name))
          })
        })
      } else {
        // Load samples from cache.
        const pending = samples.map(
          (sample) => createAudioBuffer.from.db(sample)
        )
        return Promise.all(pending).then(() => {
          samples.forEach(({name}) => {
            this.store.dispatch(audio.actions.addSample(name))
          })
        })
      }
    }).then(computeStyles)

  }

  start() {

    const {store} = this

    store.subscribe(() => {
      const state = store.getState()
      render(
        <Provider store={store}>
          <Router path={state.url}>
            <app.containers.App />
          </Router>
        </Provider>,
        document.getElementById('root')
      )
    })

    const processUrl = () => {
      let hash = location.hash.slice(1)
      if (store.getState().url === hash)
        return
      store.dispatch(url.actions.setUrl(hash))
      // if (hash === '' || hash === '/') {
      //   location.hash = '/overview'
      // } else {
      //   store.dispatch(url.actions.setUrl(hash))
      // }
    }

    // <Testing>

    if (this.isNew) {

      store.dispatch(
        player.actions.createPlayer({playing: false})
      )

      // Create presets
      store.dispatch(presets.actions.createPreset({sample: 'hihat'}))
      store.dispatch(presets.actions.createPreset({sample: 'snare'}))
      store.dispatch(presets.actions.createPreset({sample: 'kick'}))
      store.dispatch(presets.actions.createPreset({sample: 'clap'}))

      each(store.getState().presets, (preset) => {
        store.dispatch(traxExt.actions.createChannel({preset: preset.id}))
      })

      const blockAction = blocks.actions.createBlock({
        channels: Object.keys(store.getState().channels),
      })
      store.dispatch(blockAction)
      store.dispatch(
        blockAdmin.actions.setCurrentBlock(blockAction.payload.id)
      )

      const songAction = songs.actions.createSong({
        title: 'my first song',
        blocks: [blockAction.payload.id],
      })
      store.dispatch(songAction)
      store.dispatch(
        songAdmin.actions.setCurrentSong(songAction.payload.id)
      )

      store.dispatch(url.actions.setBrowserUrl(
        '/songs/' + songAction.payload.id + '/blocks/' + blockAction.payload.id
      ))

    }

    // store.dispatch(url.actions.setUrl('no known url'))
    window.addEventListener('hashchange', processUrl)
    // processUrl()

    // Creating audio player
    this.audioPlayer = new AudioPlayer({
      audioService,
      store: store,
      tickInterval: store.getState().player.beatDuration,
    })

    this.audioPlayer.start()

  }

}
