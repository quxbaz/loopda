import React from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import EditorCtrl from 'controllers/editor/editor';
import OverviewCtrl from 'controllers/overview/overview';
import Song from './song';

export default React.createClass({

  mixins: [LinkedStateMixin],

  propTypes: {
    sequencer: React.PropTypes.object,
    editor: React.PropTypes.object.isRequired,
    currentSong: React.PropTypes.object
  },

  getInitialState() {
    this.defaultTitle = 'untitled';
    return {
      title: this.defaultTitle,
    };
  },

  handleEscKey(event) {
    if (event.keyCode === 27)
      OverviewCtrl.viewOverview();
  },

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKey);
  },

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKey);
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
    let {sequencer, editor, currentSong} = this.props;
    if (currentSong)
      EditorCtrl.playSong(sequencer, currentSong);
  },

  handleSelectChange(event) {
    let {editor} = this.props;
    let song = editor.take('songs').find(
      song => song.cid === event.target.value
    );
    EditorCtrl.changeSong(editor, song);
  },

  render() {
    let {editor, currentSong} = this.props;
    let songs = editor.take('songs').map(
      song => <option key={song.cid} value={song.cid}>{song.state.title}</option>
    );
    let render = {};
    if (currentSong)
      render.song = <Song song={currentSong} />;
    return (
      <div className="editor">
        <div>
          <a href="/#/sequencer/overview">Close</a> <a onClick={this.playSong}>Play</a>
        </div>
        <form onSubmit={this.addSong}>
          <input type="text" placeholder="Untitled" valueLink={this.linkState('title')} />
          <input type="submit" value="Add song" />
        </form>
        <select value={currentSong ? currentSong.cid : 'default'} onChange={this.handleSelectChange}>
          <option value="default" disabled>Select a song</option>
          {songs}
        </select>
        {render.song}
      </div>
    );
  }

});
