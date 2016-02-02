/*
  controller.js

  <Note> A controller should not encapsulate any state. State belongs
  to models, not controllers.
*/

import EventNode from 'eventnode';
import {each} from 'lib/util';

export default class Controller {

  constructor(props={}) {
    this.props = props;
    this.children = [];
    this.eventNode = new EventNode({
      parent: props.parent && props.parent.eventNode
    });
    each(this.constructor.actions, (handler, event) => {
      this.eventNode.on(event, handler.bind(this));
    });
  }

  addChild(ctrl) {
    this.eventNode.addChild(ctrl.eventNode);
    this.children.push(ctrl);
  }

  addChildren(ctrls) {
    this.eventNode.addChildren(ctrls.map(ctrl => ctrl.eventNode));
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
    this.eventNode.trigger(event, ...args);
  }

}
