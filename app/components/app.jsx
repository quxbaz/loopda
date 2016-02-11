import React from 'react';
import SequencerComponent from 'components/sequencer/sequencer';

export default (props) => {
  let {sequencer} = props.model;
  return <SequencerComponent model={sequencer} record={props.record} />;
};
