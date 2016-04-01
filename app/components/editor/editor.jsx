import React from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import watchMixin from 'components/mixins/watch';
import EditorCtrl from 'controllers/editor/editor';
import OverviewCtrl from 'controllers/overview/overview';
import ChannelHelper from 'helpers/channel';
import Song from './song';

export default React.createClass({

  mixins: [LinkedStateMixin, watchMixin],

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

  handleKeyDown(event) {
    if (event.keyCode === 27)  // esc key
      OverviewCtrl.viewOverview();
  },

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  },

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
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

    let {sequencer, editor, currentSong} = this.props;
    let channels = ChannelHelper.sorted(sequencer.state.channels);

    // Render song option components
    let songs = editor.take('songs').map(
      song => <option key={song.cid} value={song.cid}>{song.state.title}</option>
    );

    let render = {};
    if (currentSong)
      render.song = <Song song={currentSong} channels={channels} />;

    return (
      <div className="editor">
        <div>
          <a href="/#/sequencer/overview">Overview</a> <a onClick={this.playSong}>Play</a>
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
