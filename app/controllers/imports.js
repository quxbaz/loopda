import dispatcher from 'app/dispatcher';
import {each} from 'lib/util';

let lists = [
  require('./sequencer/sequencer').default,
  require('./sequencer/blip').default
];

for (let callbacks of lists)
  each(callbacks, (fn) => dispatcher.register(fn));
