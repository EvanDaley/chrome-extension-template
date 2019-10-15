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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

eval("/* in-content.js\n*\n* This file has an example on how to communicate with other parts of the extension through a long lived connection (port) and also through short lived connections (chrome.runtime.sendMessage).\n*\n* Note that in this scenario the port is open from the popup, but other extensions may open it from the background page or not even have either background.js or popup.js.\n* */\n\n// Extension port to communicate with the popup, also helps detecting when it closes\nlet port = null;\n\n// Send messages to the open port (Popup)\nconst sendPortMessage = data => port.postMessage(data);\n\n// Handle incoming popup messages\nconst popupMessageHandler = message => console.log('in-content.js - message from popup:', message);\n\n// Start scripts after setting up the connection to popup\nchrome.extension.onConnect.addListener(popupPort => {\n    // Listen for popup messages\n    popupPort.onMessage.addListener(popupMessageHandler);\n    // Set listener for disconnection (aka. popup closed)\n    popupPort.onDisconnect.addListener(() => {\n        console.log('in-content.js - disconnected from popup');\n    });\n    // Make popup port accessible to other methods\n    port = popupPort;\n    // Perform any logic or set listeners\n    sendPortMessage('message from in-content.js');\n});\n\n// Response handler for short lived messages\nconst handleBackgroundResponse = response => console.log('in-content.js - Received response:', response);\n\n// Send a message to background.js\nchrome.runtime.sendMessage('Message from in-content.js!', handleBackgroundResponse);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvaW4tY29udGVudC5qcz9iODc5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIGluLWNvbnRlbnQuanNcbipcbiogVGhpcyBmaWxlIGhhcyBhbiBleGFtcGxlIG9uIGhvdyB0byBjb21tdW5pY2F0ZSB3aXRoIG90aGVyIHBhcnRzIG9mIHRoZSBleHRlbnNpb24gdGhyb3VnaCBhIGxvbmcgbGl2ZWQgY29ubmVjdGlvbiAocG9ydCkgYW5kIGFsc28gdGhyb3VnaCBzaG9ydCBsaXZlZCBjb25uZWN0aW9ucyAoY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UpLlxuKlxuKiBOb3RlIHRoYXQgaW4gdGhpcyBzY2VuYXJpbyB0aGUgcG9ydCBpcyBvcGVuIGZyb20gdGhlIHBvcHVwLCBidXQgb3RoZXIgZXh0ZW5zaW9ucyBtYXkgb3BlbiBpdCBmcm9tIHRoZSBiYWNrZ3JvdW5kIHBhZ2Ugb3Igbm90IGV2ZW4gaGF2ZSBlaXRoZXIgYmFja2dyb3VuZC5qcyBvciBwb3B1cC5qcy5cbiogKi9cblxuLy8gRXh0ZW5zaW9uIHBvcnQgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgcG9wdXAsIGFsc28gaGVscHMgZGV0ZWN0aW5nIHdoZW4gaXQgY2xvc2VzXG5sZXQgcG9ydCA9IG51bGw7XG5cbi8vIFNlbmQgbWVzc2FnZXMgdG8gdGhlIG9wZW4gcG9ydCAoUG9wdXApXG5jb25zdCBzZW5kUG9ydE1lc3NhZ2UgPSBkYXRhID0+IHBvcnQucG9zdE1lc3NhZ2UoZGF0YSk7XG5cbi8vIEhhbmRsZSBpbmNvbWluZyBwb3B1cCBtZXNzYWdlc1xuY29uc3QgcG9wdXBNZXNzYWdlSGFuZGxlciA9IG1lc3NhZ2UgPT4gY29uc29sZS5sb2coJ2luLWNvbnRlbnQuanMgLSBtZXNzYWdlIGZyb20gcG9wdXA6JywgbWVzc2FnZSk7XG5cbi8vIFN0YXJ0IHNjcmlwdHMgYWZ0ZXIgc2V0dGluZyB1cCB0aGUgY29ubmVjdGlvbiB0byBwb3B1cFxuY2hyb21lLmV4dGVuc2lvbi5vbkNvbm5lY3QuYWRkTGlzdGVuZXIocG9wdXBQb3J0ID0+IHtcbiAgICAvLyBMaXN0ZW4gZm9yIHBvcHVwIG1lc3NhZ2VzXG4gICAgcG9wdXBQb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihwb3B1cE1lc3NhZ2VIYW5kbGVyKTtcbiAgICAvLyBTZXQgbGlzdGVuZXIgZm9yIGRpc2Nvbm5lY3Rpb24gKGFrYS4gcG9wdXAgY2xvc2VkKVxuICAgIHBvcHVwUG9ydC5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnaW4tY29udGVudC5qcyAtIGRpc2Nvbm5lY3RlZCBmcm9tIHBvcHVwJyk7XG4gICAgfSk7XG4gICAgLy8gTWFrZSBwb3B1cCBwb3J0IGFjY2Vzc2libGUgdG8gb3RoZXIgbWV0aG9kc1xuICAgIHBvcnQgPSBwb3B1cFBvcnQ7XG4gICAgLy8gUGVyZm9ybSBhbnkgbG9naWMgb3Igc2V0IGxpc3RlbmVyc1xuICAgIHNlbmRQb3J0TWVzc2FnZSgnbWVzc2FnZSBmcm9tIGluLWNvbnRlbnQuanMnKTtcbn0pO1xuXG4vLyBSZXNwb25zZSBoYW5kbGVyIGZvciBzaG9ydCBsaXZlZCBtZXNzYWdlc1xuY29uc3QgaGFuZGxlQmFja2dyb3VuZFJlc3BvbnNlID0gcmVzcG9uc2UgPT5cbiAgICBjb25zb2xlLmxvZygnaW4tY29udGVudC5qcyAtIFJlY2VpdmVkIHJlc3BvbnNlOicsIHJlc3BvbnNlKTtcblxuLy8gU2VuZCBhIG1lc3NhZ2UgdG8gYmFja2dyb3VuZC5qc1xuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ01lc3NhZ2UgZnJvbSBpbi1jb250ZW50LmpzIScsIGhhbmRsZUJhY2tncm91bmRSZXNwb25zZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2luLWNvbnRlbnQuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ })

/******/ });