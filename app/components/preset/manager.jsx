import React from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import classNames from 'classnames';
import watchMixin from 'components/mixins/watch';
import ManagerCtrl from 'controllers/preset/manager';
import Mixer from 'components/mixer/mixer';

export default React.createClass({

  mixins: [LinkedStateMixin, watchMixin],

  propTypes: {
    manager: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      title: '',
      sample: 'hihat',
      preset: null
    };
  },

  handleSubmit(event) {
    event.preventDefault();
    let {title, sample} = this.state;
    ManagerCtrl.addPreset(this.props.manager, title, sample);
    this.setState({title: ''});
  },

  render() {

    let {manager} = this.props;
    let {presets} = manager.state;

    let coms = presets.map((preset, i) => {
      let {title, sample} = preset.state;
      let handleClick = () => this.setState({preset});
      let className = classNames({
        preset: true,
        selected: this.state.preset === preset
      });
      return (
        <div key={i} className={className}>
          <a onClick={handleClick}>
            ({title}) - <i>{sample}</i>
          </a>
        </div>
      );
    });

    return (
      <div className="preset-manager">
        <div>
          <a href="/#/sequencer/overview">Sequencer</a>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Untitled" valueLink={this.linkState('title')} />
          <select valueLink={this.linkState('sample')}>
            <option value="hihat">Hi-hat</option>
            <option value="snare">Snare</option>
          </select>
          <input type="submit" value="Add preset" />
        </form>
        <div>{coms}</div>
        {this.state.preset ? <Mixer mixable={this.state.preset} /> : ''}
      </div>
    );
  }

});
