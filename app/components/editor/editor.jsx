import React from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import EditorCtrl from 'controllers/editor/editor';

export default React.createClass({

  mixins: [LinkedStateMixin],

  propTypes: {
    editor: React.PropTypes.object.isRequired
  },

  getInitialState() {
    this.defaultTitle = 'untitled';
    return {
      title: this.defaultTitle
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

  render() {
    return (
      <div className="editor">
        <form onSubmit={this.addSong}>
          <input type="text" placeholder="Untitled" valueLink={this.linkState('title')} />
          <input type="submit" value="Add song" />
        </form>
      </div>
    );
  }

});
