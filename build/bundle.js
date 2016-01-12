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

	eval("'use strict';\n\nvar _app = __webpack_require__(1);\n\nvar _app2 = _interopRequireDefault(_app);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar d = document;\nvar body = d.getElementsByTagName('body')[0];\nvar div = d.createElement('div');\ndiv.innerHTML = 'i am a div';\nbody.appendChild(div);//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZW50cnkuanM/NjgzZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUNqQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0MsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztBQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZvbyBmcm9tICdhcHAnO1xuXG52YXIgZCA9IGRvY3VtZW50O1xudmFyIGJvZHkgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG52YXIgZGl2ID0gZC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmRpdi5pbm5lckhUTUwgPSAnaSBhbSBhIGRpdic7XG5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9lbnRyeS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n// var arr = [1, 2, 3, 4];\n// var res = arr.map(x => x * 2);\n// console.log(res);\n\n// import\n\n// console.log(React);\n\n// var Element = React.\n\n// module.exports = 'app';\n\nconsole.log('asdf j jklj');\n\nexports.default = 'app';//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvYXBwLmpzPzg2YTkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztrQkFFWixLQUFLIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB2YXIgYXJyID0gWzEsIDIsIDMsIDRdO1xuLy8gdmFyIHJlcyA9IGFyci5tYXAoeCA9PiB4ICogMik7XG4vLyBjb25zb2xlLmxvZyhyZXMpO1xuXG4vLyBpbXBvcnRcblxuLy8gY29uc29sZS5sb2coUmVhY3QpO1xuXG4vLyB2YXIgRWxlbWVudCA9IFJlYWN0LlxuXG4vLyBtb2R1bGUuZXhwb3J0cyA9ICdhcHAnO1xuXG5jb25zb2xlLmxvZygnYXNkZiBqIGprbGonKTtcblxuZXhwb3J0IGRlZmF1bHQgJ2FwcCc7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9hcHAuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);