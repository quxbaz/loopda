import React from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import EditorCtrl from 'controllers/editor/editor';
import Song from './song';

export default React.createClass({

  mixins: [LinkedStateMixin],

  propTypes: {
    sequencer: React.PropTypes.object,
    editor: React.PropTypes.object.isRequired
  },

  getInitialState() {
    this.defaultTitle = 'untitled';
    return {
      title: this.defaultTitle,
      songId: null
    };
  },

  resetForm() {
    this.setState({title: ''});
  },

  addSong(event) {
    event.preventDefault();
    if (this.state.title === '')
      return;
    this.resetForm();
    EditorCtrl.addSong(this.props.editor, this.state.title);
  },

  playSong() {
    let {sequencer, editor} = this.props;
    if (this.state.songId) {
      EditorCtrl.playSong(sequencer, editor.take('songs').find(
        song => song.cid === this.state.songId
      ));
    }
  },

  render() {
    let {editor} = this.props;
    let {songId} = this.state;
    let songs = editor.take('songs').map(
      song => <option key={song.cid} value={song.cid}>{song.state.title}</option>
    );
    let render = {};
    if (songId) {
      let song = editor.take('songs').find(song => song.cid === songId);
      render.song = <Song song={song} />;
    }
    return (
      <div className="editor">
        <div>
          <a href="/#/sequencer/overview">Close</a> <a onClick={this.playSong}>Play</a>
        </div>
        <form onSubmit={this.addSong}>
          <input type="text" placeholder="Untitled" valueLink={this.linkState('title')} />
          <input type="submit" value="Add song" />
        </form>
        <select defaultValue="default" valueLink={this.linkState('songId')}>
          <option value="default" disabled>Select a song</option>
          {songs}
        </select>
        {render.song}
      </div>
    );
  }

});
