import id from './id'
import sequencer from './sequencer'
import channels from './channels'
import blips from './blips'
import blocks from './blocks'
import presets from './presets'
import mixables from './mixables'
import songs from './songs'
import player from './player'
import songPlayer from './song-player'
import AudioService from './AudioService'
import AudioPlayer from './AudioPlayer'

const reducers = {
  id: id.reducer,
  sequencer: sequencer.reducer,
  channels: channels.reducer,
  blips: blips.reducer,
  blocks: blocks.reducer,
  presets: presets.reducer,
  mixables: mixables.reducer,
  songs: songs.reducer,
  player: player.reducer,
  songPlayer: songPlayer.reducer,
}

export {
  reducers,
  id,
  sequencer, channels, blips,
  blocks, songs,
  presets, mixables,
  player, songPlayer,
  AudioService, AudioPlayer,
}
