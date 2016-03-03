import React from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import classNames from 'classnames';
import watchMixin from 'components/mixins/watch';
import ManagerCtrl from 'controllers/preset/manager';
import Preset from './preset';
import Mixer from 'components/mixer/mixer';
import SampleSelect from './sample-select';

export default React.createClass({

  mixins: [LinkedStateMixin, watchMixin],

  propTypes: {
    manager: React.PropTypes.object.isRequired
  },

  getInitialState() {
    this.defaultTitle = 'untitled';
    return {
      title: this.defaultTitle,
      sample: 'hihat',
      preset: null
    };
  },

  handleSubmit(event) {
    event.preventDefault();
    let {title, sample} = this.state;
    if (title === '')
      return;
    ManagerCtrl.addPreset(this.props.manager, title, sample);
    this.setState({title: this.defaultTitle});
  },

  handleClickPreset(preset) {
    this.setState({preset});
  },

  render() {

    let {manager} = this.props;
    let {presets} = manager.state;

    let coms = presets.map((preset) =>
      React.createElement(Preset, {
        key: preset.cid,
        preset,
        selected: this.state.preset === preset,
        onClick: this.handleClickPreset
      })
    );

    return (
      <div className="preset-manager">
        <div>
          <a href="/#/sequencer/overview">Sequencer</a>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Untitled" valueLink={this.linkState('title')} />
          <SampleSelect valueLink={this.linkState('sample')} />
          <input type="submit" value="Add preset" />
        </form>
        <div>{coms}</div>
        {this.state.preset ? <Mixer mixable={this.state.preset} /> : ''}
      </div>
    );
  }

});
