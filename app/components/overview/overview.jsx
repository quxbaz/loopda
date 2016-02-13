/*
  Overview component
*/

import React from 'react';
import store from 'app/store';
import SequencerComponent from 'components/sequencer/sequencer';

export default (props) => {

   // <TODO> Not great. This is in the render function remember?
  let record = store.recordFor(props.sequencer);

  return <SequencerComponent model={props.sequencer} record={record} />;
};
