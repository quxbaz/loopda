/*
  dispatcher.js

  <Usage>

  var d = new Dispatcher();

  d.subscribe('click', function(event, counter) {
     ...
  });

  d.dispatch('click', clickEvent, clicks + 1);

*/

function Dispatcher() {
  this.handlers = {};
}

var fn = Dispatcher.prototype;

fn.subscribe = function(event, handler) {
  if (!this.handlers.hasOwnProperty(event))
    this.handlers[event] = [];
  this.handlers[event].push(handler);
};

fn.publish = function(event) {
  if (!this.handlers.hasOwnProperty(event))
    return;
  var rest = Array.prototype.slice.call(arguments, 1);
  this.handlers[event].forEach(function(handler) {
    handler.apply(null, rest);
  });
};

module.exports = Dispatcher;
