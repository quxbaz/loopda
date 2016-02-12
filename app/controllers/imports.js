import dispatcher from 'app/dispatcher';
import {each} from 'lib/util';

let imports = [
  require('./sequencer/sequencer').default,
  require('./sequencer/channel').default,
  require('./sequencer/blip').default
];

// Attach imported event handlers to the global dispatcher
imports.forEach((actionMap) => {
  // Object.keys() is not used because it ignores symbols
  Object.getOwnPropertySymbols(actionMap).forEach((symbol) => {
    dispatcher.on(symbol, actionMap[symbol]);
  });
});
