/*
  timer.js

  <Usage>

   // Creates a timer that ticks every 100ms.
  var t = new timer.Timer({tickInterval: 100});

  // The timer will stop after ticking 10 times.
  t.on('tick', function() {
    console.log(t.elapsed);
    if (t.tickCount == 10)
      t.stop();
  });

*/


function has(obj, key) {
  return obj.hasOwnProperty(key);
}

function each(coll, fn, context) {
  if (Array.isArray(coll)) {
    for (var i=0; i < coll.length; i++)
      fn.call(context, coll[i], i);
  }
  else {
    for (var k in coll) {
      if (coll.hasOwnProperty(k))
        fn.call(context, coll[k], k);
    }
  }
}

function now() {
  return performance.now();
};

/*
  This is webworker code that should be treated as if it were on
  another page/url. It should not reference any other
  code/variables/functions except what is declared within itself.
*/
var workerJs = function(tickInterval) {

  /*
    This worker posts only one kind of message (via postMessage), a
    data object consisting of various time properties.
  */

  var running = false;

  function tick() {
    if (!running)
      return;
    setTimeout(function() {
      postMessage('');
      tick();
    }, tickInterval);
  };

  self.addEventListener('message', function(event) {
    if (event.data.message == 'stop')
      running = false;
    else if (event.data.message == 'start') {
      running = true;
      tick();
    } else if (event.data.message == 'setTickInterval')
      tickInterval = event.data.tickInterval;
  });

};
/****/

var Timer = function(opts) {
  this.checkBrowserSupport();
  if (typeof opts == 'undefined')
    opts = {};
  this.events = {
    'tick': []
  };
  this.tickInterval = opts.tickInterval || 25;
  this.tickCount = 0;
  this.elapsed = 0;
  // Make sure this is called only after tickInterval have been set.
  this.worker = this.createWorker();
  this.on('tick', this.update.bind(this));
};

var fn = Timer.prototype;

fn.checkBrowserSupport = function() {
  var features = ['Blob', 'Worker', 'URL', 'performance'];
  each(features, function(feature) {
    if (typeof self[feature] == 'undefined')
      throw new Error(feature + ' is not supported in this browser environment.');
  });
};

fn.createWorker = function() {
  var blobUrl = URL.createObjectURL(
    new Blob(['(', workerJs.toString(), ')(' + this.tickInterval + ')'], {type: 'application/javascript'})
  );
  var worker = new Worker(blobUrl);
  URL.revokeObjectURL(blobUrl);
  worker.addEventListener('message', function(event) {
    this.trigger('tick', event.data);
  }.bind(this));
  return worker;
};

fn.checkValidEvent = function(eventName) {
  if (!has(this.events, eventName))
    throw new Error('Event "' + eventName + '" not a valid event.');
}

fn.update = function() {
  this.dt = now() - (this.startTime + this.elapsed);
  this.elapsed += this.dt;
  this.tickCount++;
};

fn.start = function() {
  /*
    <Warning> This method is asynchronous. See Timer.stop
  */
  this.startTime = now();
  this.worker.postMessage({message: 'start'});
  return this;
};

fn.stop = function() {
  /*
    <Warning>: This method is asynchronous. A timer does not stop
    immediately when this function is called. It stops when the
    message is passed to the worker, which takes a few milliseconds in
    most cases.
  */
  this.worker.postMessage({message: 'stop'});
  return this;
};

fn.on = function(eventName, callback) {
  this.checkValidEvent(eventName);
  this.events[eventName].push(callback);
  return this;
};

fn.trigger = function(eventName, eventArgs) {
  this.checkValidEvent(eventName);
  var eventArgs = Array.prototype.slice.call(arguments, 1);
  each(this.events[eventName], function(callback) {
    callback.apply(this, eventArgs);
  }, this);
  return this;
};

fn.setTickInterval = function(tickInterval) {
  this.tickInterval = tickInterval;
  this.worker.postMessage({
    message: 'setTickInterval',
    tickInterval: tickInterval
  });
};

module.exports = Timer;
