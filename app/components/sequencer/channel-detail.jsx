import React from 'react';
import bindTo from 'components/mixins/bindto';
import classNames from 'classnames';
// import dispatcher from 'app/dispatcher';
// import channelActions from 'actions/sequencer/channel';
// import BlipsComponent from 'components/sequencer/blips';
import ChannelComponent from 'components/sequencer/channel';
import store from 'app/store';

export default React.createClass({

  mixins: [bindTo],

  render() {
    let {model, sequencer} = this.props;
    let channelProps = {
      key: model.id,
      model: model,
      bindTo: model,
      record: store.recordFor(model),
      currentBeat: sequencer.state.currentBeat,
      // onRemove: props.onRemove.bind(null, channel)
      onRemove: () => {}
    };
    return <ChannelComponent {...channelProps} />;
  }

  // render() {
  //   let {model, sequencer} = this.props;
  //   let blipsProps = {
  //     blips: model.state.blips,
  //     mute: model.state.mute,
  //     currentBeat: sequencer.state.currentBeat
  //   };
  //   return (
  //     <div className="channel-detail">
  //       <div className="channel">
  //         <div className="inner-channel">
  //           <BlipsComponent {...blipsProps} />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

});
