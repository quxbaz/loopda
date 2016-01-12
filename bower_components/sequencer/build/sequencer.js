/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AudioService = exports.Blip = exports.Channel = exports.Sequencer = undefined;

	var _sequencer = __webpack_require__(1);

	var _sequencer2 = _interopRequireDefault(_sequencer);

	var _channel = __webpack_require__(3);

	var _channel2 = _interopRequireDefault(_channel);

	var _blip = __webpack_require__(4);

	var _blip2 = _interopRequireDefault(_blip);

	var _audioservice = __webpack_require__(7);

	var _audioservice2 = _interopRequireDefault(_audioservice);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Sequencer = _sequencer2.default;
	exports.Channel = _channel2.default;
	exports.Blip = _blip2.default;
	exports.AudioService = _audioservice2.default;
	exports.default = { Sequencer: _sequencer2.default, Channel: _channel2.default, Blip: _blip2.default, AudioService: _audioservice2.default };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       sequencer.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       <Usage>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       let sequencer = new Sequencer();
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       sequencer.play();
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       <TODO>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Move this file to /lib.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Create file called index.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - export this, audioservice, blip, and channel from index.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stateful = __webpack_require__(2);

	var _stateful2 = _interopRequireDefault(_stateful);

	var _channel = __webpack_require__(3);

	var _channel2 = _interopRequireDefault(_channel);

	var _timer = __webpack_require__(5);

	var _timer2 = _interopRequireDefault(_timer);

	var _dispatcher = __webpack_require__(6);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function defaultState() {
	  return {
	    playing: false,
	    currentBeat: 0,
	    beatDuration: 200,
	    channels: []
	  };
	}

	var Sequencer = function () {
	  function Sequencer(state) {
	    var _this = this;

	    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Sequencer);

	    this.state = Object.assign(defaultState(), state);
	    this.props = props;
	    this.timer = new _timer2.default({ tickInterval: this.state.beatDuration });
	    this.timer.on('tick', function () {
	      if (_this.state.playing) _this.tick();
	    });
	    this.timerStarted = false;
	  }

	  _createClass(Sequencer, [{
	    key: 'play',
	    value: function play() {
	      this.state.playing = true;
	      if (!this.timerStarted) {
	        this.timer.start();
	        this.timerStarted = true;
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.state.playing = false;
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      /*
	        Plays a beat and moves onto the next one.
	      */
	      this.playCurrentBeat();
	      this.advanceBeat();
	    }
	  }, {
	    key: 'playCurrentBeat',
	    value: function playCurrentBeat() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.state.channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var channel = _step.value;

	          channel.playBeat(this.state.currentBeat);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'advanceBeat',
	    value: function advanceBeat() {
	      this.state.currentBeat = (this.state.currentBeat + 1) % 16;
	    }
	  }, {
	    key: 'addChannel',
	    value: function addChannel() {
	      var _this2 = this;

	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      this.state.channels.push(new _channel2.default(state, {
	        onPlay: function onPlay(blipState) {
	          return _this2.publish('play-blip', blipState);
	        }
	      }));
	    }
	  }]);

	  return Sequencer;
	}();

	exports.default = Sequencer;

	var dispatcher = new _dispatcher2.default();
	Object.assign(Sequencer.prototype, _stateful2.default.mixin, {
	  subscribe: dispatcher.subscribe.bind(dispatcher),
	  publish: dispatcher.publish.bind(dispatcher)
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	  stateful.js

	  Mixin for stateful objects.

	  <TODO>
	  This needs to trigger a state change event whenever the state
	  changes.
	*/

	var mixin = exports.mixin = {
	  setState: function setState(state) {
	    if (this.state === undefined) this.state = {};
	    Object.assign(this.state, state);
	  }
	};

	exports.default = {
	  mixin: mixin
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       channel.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stateful = __webpack_require__(2);

	var _stateful2 = _interopRequireDefault(_stateful);

	var _blip = __webpack_require__(4);

	var _blip2 = _interopRequireDefault(_blip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function defaultState() {
	  var blips = [];
	  for (var i = 0; i < 16; i++) {
	    blips.push(new _blip2.default());
	  }return {
	    sampleName: '',
	    blips: blips
	  };
	}

	var Channel = function () {
	  function Channel(state) {
	    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Channel);

	    this.state = Object.assign(defaultState(), state);
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = this.state.blips[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var blip = _step.value;

	        blip.props.onPlay = props.onPlay;
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    this.props = props;
	  }

	  _createClass(Channel, [{
	    key: 'playBeat',
	    value: function playBeat(beat) {
	      this.state.blips[beat].play();
	    }
	  }]);

	  return Channel;
	}();

	exports.default = Channel;

	Object.assign(Channel.prototype, _stateful2.default.mixin);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       blip.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stateful = __webpack_require__(2);

	var _stateful2 = _interopRequireDefault(_stateful);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function defaultState() {
	  return {
	    sampleName: '',
	    mute: false,
	    duration: 200,
	    offset: 0,
	    gain: 1,
	    playbackRate: 1
	  };
	}

	var Blip = function () {
	  function Blip(state) {
	    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Blip);

	    this.state = Object.assign(defaultState(), state);
	    this.props = props;
	  }

	  _createClass(Blip, [{
	    key: 'play',
	    value: function play() {
	      this.props.onPlay(this.state);
	    }
	  }]);

	  return Blip;
	}();

	exports.default = Blip;

	Object.assign(Blip.prototype, _stateful2.default.mixin);

/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	  audioservice.js

	  <Usage>
	  let sequencer = new Sequencer();
	  let audioService = new AudioService();
	  sequencer.subscribe('play-blip', blipState => {
	    audioService.playBlip(blipState);
	  });
	*/

	var defaultGainValue = function () {
	  var val = undefined;
	  return function (audioContext) {
	    if (val) return val;
	    val = audioContext.createGain().gain.value;
	    return val;
	  };
	}();

	var AudioService = function () {
	  function AudioService(audioContext) {
	    var sampleMap = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, AudioService);

	    if (audioContext === undefined) throw Error('You must provide an AudioContext object.');
	    this.audioContext = audioContext;
	    this.sampleMap = sampleMap;
	  }

	  _createClass(AudioService, [{
	    key: 'playBlip',
	    value: function playBlip(blipState) {
	      if (blipState.mute || !blipState.sampleName) return;
	      var source = this.audioContext.createBufferSource();
	      source.buffer = this.sampleMap[blipState.sampleName];
	      this.linkModifiers(blipState, source);
	      source.connect(this.audioContext.destination);
	      source.start(this.audioContext.currentTime + blipState.offset / 1000);
	    }
	  }, {
	    key: 'linkModifiers',
	    value: function linkModifiers(blipState, source) {
	      // Links modifier nodes to a buffer source.
	      source.playbackRate.value = blipState.playbackRate;
	      if (blipState.gain != defaultGainValue(this.audioContext)) {
	        var gainNode = this.audioContext.createGain();
	        gainNode.gain.value = blipState.gain;
	        source.connect(gainNode);
	        gainNode.connect(this.audioContext.destination);
	      }
	    }
	  }]);

	  return AudioService;
	}();

	exports.default = AudioService;

/***/ }
/******/ ]);