/*
  Blip View-Model
*/

import {titleCase} from 'util';

export default class {

  constructor(blip) {
    this.model = blip;
  }

  toPercent(prop) {
    let value = this.model.state[prop];
    let min = this.model.state['min' + titleCase(prop)];
    let max = this.model.state['max' + titleCase(prop)];
    return Math.round((value - min) / (max - min) * 100);
  }

};
