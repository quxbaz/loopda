/*
  controller.js

  <Note> A controller should not encapsulate any state. State belongs
  to models, not controllers.
*/

export default class Controller {

  constructor(props={}) {
    this.props = props;
    this.children = [];
    // this.eventNode = new EventNode();
  }

  addChild(ctrl) {
    this.children.push(ctrl);
  }

  addChildren(ctrls) {
    this.children = this.children.concat(ctrls);
  }

  getChild() {
    /*
      Returns the controller's sole child. If this controller does not
      have exactly one child, throws an error.
    */
    if (this.children.length !== 1)
      throw new Error('Controller does not have exactly 1 child.');
    return this.children[0];
  }

  trigger(event, ...args) {

    // if (event === 'addChannel') {
    //   import store from 'app/store';
    //   store.createRecord('channel', {sampleName: 'hihat'});
    //   sequencer.addChannel()
    //   this.addChild(new Controller({
    //     channel, record, parent
    //   }));
    //   // trigger component update
    //   //
    // }

    // this.eventNode.trigger(event, ...args);

    // console.log(this.constructor.actions[event]);
    // this.constructor.actions[event]();

  }

}
