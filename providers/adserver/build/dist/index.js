module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
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
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(334);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 129:
/***/ (function(module) {

module.exports = require("child_process");

/***/ }),

/***/ 334:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const { execSync } = __webpack_require__(129);

try{
    console.info('⛏️ Building adserver source code...');
    execSync('npm run adserver-providers build', {stdio: 'inherit'});

    console.info('\n');
    console.info('🕹 Building playground...');
    execSync('npm run adserver-providers playground:build', {stdio: 'inherit'});

    console.info('\n');
    console.info('{} Preparing schemas...');
    execSync('npm run adserver-providers prepare-schema', {stdio: 'inherit'});
} catch (error) {
    core.setFailed(error.message);
}

/***/ })

/******/ });