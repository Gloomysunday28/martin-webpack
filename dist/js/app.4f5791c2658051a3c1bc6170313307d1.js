
    /******/ (function(modules) { // webpackBootstrap
      /******/ 	// The module cache
      /******/ 	var installedModules = {};
      /******/
      /******/ 	// The require function
      /******/ 	function __webpack_require__(moduleId) {
      /******/
      /******/ 		// Check if module is in cache
      /******/ 		if(installedModules[moduleId]) {
      /******/ 			return installedModules[moduleId].exports;
      /******/ 		}
      /******/ 		// Create a new module (and put it into the cache)
      /******/ 		var module = installedModules[moduleId] = {
      /******/ 			i: moduleId,
      /******/ 			l: false,
      /******/ 			exports: {}
      /******/ 		};
      /******/
      /******/ 		// Execute the module function
      /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ 		// Flag the module as loaded
      /******/ 		module.l = true;
      /******/
      /******/ 		// Return the exports of the module
      /******/ 		return module.exports;
      /******/ 	}
      /******/
      /******/
      /******/ 	// expose the modules object (__webpack_modules__)
      /******/ 	__webpack_require__.m = modules;
      /******/
      /******/ 	// expose the module cache
      /******/ 	__webpack_require__.c = installedModules;
      /******/
      /******/ 	// define getter function for harmony exports
      /******/ 	__webpack_require__.d = function(exports, name, getter) {
      /******/ 		if(!__webpack_require__.o(exports, name)) {
      /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/ 		}
      /******/ 	};
      /******/
      /******/ 	// define __esModule on exports
      /******/ 	__webpack_require__.r = function(exports) {
      /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/ 		}
      /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
      /******/ 	};
      /******/
      /******/ 	// create a fake namespace object
      /******/ 	// mode & 1: value is a module id, require it
      /******/ 	// mode & 2: merge all properties of value into the ns
      /******/ 	// mode & 4: return value when already ns object
      /******/ 	// mode & 8|1: behave like require
      /******/ 	__webpack_require__.t = function(value, mode) {
      /******/ 		if(mode & 1) value = __webpack_require__(value);
      /******/ 		if(mode & 8) return value;
      /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
      /******/ 		var ns = Object.create(null);
      /******/ 		__webpack_require__.r(ns);
      /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
      /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
      /******/ 		return ns;
      /******/ 	};
      /******/
      /******/ 	// getDefaultExport function for compatibility with non-harmony modules
      /******/ 	__webpack_require__.n = function(module) {
      /******/ 		var getter = module && module.__esModule ?
      /******/ 			function getDefault() { return module['default']; } :
      /******/ 			function getModuleExports() { return module; };
      /******/ 		__webpack_require__.d(getter, 'a', getter);
      /******/ 		return getter;
      /******/ 	};
      /******/
      /******/ 	// Object.prototype.hasOwnProperty.call
      /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
      /******/
      /******/ 	// __webpack_public_path__
      /******/ 	__webpack_require__.p = "";
      /******/
      /******/
      /******/ 	// Load entry module and return exports
      /******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
      /******/ })
      /************************************************************************/
      /******/ ({
      /************************************************************************/
      /******/
      
      /***/ "./exportsDefault/index":
      /*!**************!*        !*** ./exportsDefault/index ***!
        **************/
      /*! exports provided: default */
      /***/ (function(module, __webpack_exports__, __webpack_require__) {
      
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\nconst exportDefault = 'lalal';\n/* harmony default export */ __webpack_exports__[\"default\"] =  exportDefault;//# sourceURL=webpack:///./exportsDefault/index?");
      
      /***/ })
    ,
      /************************************************************************/
      /******/
      
      /***/ "./test2":
      /*!**************!*        !*** ./test2 ***!
        **************/
      /*! exports provided: default */
      /***/ (function(module, __webpack_exports__, __webpack_require__) {
      
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _exportsDefault__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exportsDefault */ \"./exportsDefault/index\")\nconst test = '321';\nconsole.log(test);\n/* harmony default export */ __webpack_exports__[\"default\"] =  222 + _exportsDefault__WEBPACK_IMPORTED_MODULE_3__[\"default\"] + 321;//# sourceURL=webpack:///./test2?");
      
      /***/ })
    ,
      /************************************************************************/
      /******/
      
      /***/ "./test":
      /*!**************!*        !*** ./test ***!
        **************/
      /*! exports provided: default */
      /***/ (function(module, __webpack_exports__, __webpack_require__) {
      
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test2 */ \"./test2\")\nconsole.log(_test2__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] =  42141;//# sourceURL=webpack:///./test?");
      
      /***/ })
    ,
      /************************************************************************/
      /******/
      
      /***/ "./munderscore":
      /*!**************!*        !*** ./munderscore ***!
        **************/
      /*! exports provided: default */
      /***/ (function(module, __webpack_exports__, __webpack_require__) {
      
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n!function(t,n){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=n():\"function\"==typeof define&&define.amd?define([],n):\"object\"==typeof exports?exports.MUnderscore=n():t.MUnderscore=n()}(window,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var u=n[r]={i:r,l:!1,exports:{}};return t[r].call(u.exports,u,u.exports,e),u.l=!0,u.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&\"object\"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,\"default\",{enumerable:!0,value:t}),2&n&&\"string\"!=typeof t)for(var u in t)e.d(r,u,function(n){return t[n]}.bind(null,u));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,\"a\",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p=\"\",e(e.s=0)}([function(t,n,e){\"use strict\";e.r(n);var r=function(t){if(!(this instanceof r))return new r(t);this._wrapped=t};function u(t,n){return t._chain?t:n}r.slice=Array.prototype.slice,r.isFunction=function(t){return\"function\"==typeof t},r.sub_curry=function(t){const n=r.slice.call(arguments,1);return function(){const e=n.concat(r.slice.call(arguments));return t.apply(this,e)}},r.compose=function(){let t=arguments.length-1,n=r.slice.call(arguments);return function(){let e=n[t--].apply(this,arguments);for(;t>=0;)e=n[t--].call(this,e);return e}},r.debounce=function(t,n,e){let r=null;function u(){if(r&&clearTimeout(r),e){const e=!r;if(r=setTimeout(t=>{r=null},n),e)return t&&t.apply(this,arguments)}else r=setTimeout(n=>{t&&t.apply(this,arguments)},n)}return u.cancel=function(){clearTimeout(r),r=null},u},r.throttle=function(t,n){let e=null,r=+new Date;return function(){let u=+new Date;u-r<n?(e&&clearTimeout(e),e=setTimeout(n=>{t&&t.apply(this,arguments)},n)):(t&&t.apply(this,arguments),r=u)}},r.curry=function(t,n){let e=n||t.length;return function(){if(arguments.length<e){const n=[t];return n.push(...r.slice.call(arguments)),r.curry(r.sub_curry.apply(this,n),e-arguments.length)}return t.apply(this,arguments)}},r.addOne=function(t,n){return t+n},r.hasTwo=function(t){return t},r.changeFn=function(t){return t.apply(this,[1,2])},r.chain=function(t){var n=r(t);return n._chain=!0,n},r.push=function(t,n){return this._wrapped.push(n),u(this,this._wrapped)},r.unshift=function(t,n){return this._wrapped.unshift(n),u(this,this._wrapped)},r.value=function(){return this._chain=!1,this._wrapped},r.mixin=function(t){const n=Array.prototype.push;return Object.keys(t).forEach(e=>{const o=t[e];r.isFunction(o)&&(r.prototype[e]=function(){const t=[this._wrapped];return n.apply(t,arguments),u(this,o.apply(this,t))})}),r},r.mixin(r),n.default=r}]).default}));//# sourceURL=webpack:///./munderscore?");
      
      /***/ })
    ,
      /************************************************************************/
      /******/
      
      /***/ "./src/index.js":
      /*!**************!*        !*** ./src/index.js ***!
        **************/
      /*! exports provided: default */
      /***/ (function(module, __webpack_exports__, __webpack_require__) {
      
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MUnderscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MUnderscore */ \"./munderscore\")\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test */ \"./test\")\nconsole.log(_MUnderscore__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nconsole.log(_test__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nconsole.log(321);//# sourceURL=webpack:///./src/index.js?");
      
      /***/ })
    ,});
    