import Controller from 'lib/controller';
import store from 'app/store';

export default class SequencerController extends Controller {}

SequencerController.actions = {

  createChild() {

  }

  addChannel: function(event, sampleName) {
    let {model, record} = this.props;
    let channelRecord = store.createRecord('channel', {
      sampleName,
      sequencer: record.cid
    });
    let channelModel = model.addChannel({sampleName});
    this.addChild(new Controller({
      parent: this.props.parent,
      record: channelRecord,
      model: channelModel
    }));
  }

};
