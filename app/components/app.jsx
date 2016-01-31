import React from 'react';
import SequencerComponent from 'components/sequencer/sequencer';

export default (props) => <SequencerComponent ctrl={props.ctrl.getChild()} />;
