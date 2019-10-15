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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("/* popup.js\n *\n * This file initializes its scripts after the popup has loaded.\n *\n * It shows how to access global variables from background.js.\n * Note that getViews could be used instead to access other scripts.\n *\n * A port to the active tab is open to send messages to its in-content.js script.\n *\n */\n\n// Start the popup script, this could be anything from a simple script to a webapp\nconst initPopupScript = () => {\n    // Access the background window object\n    const backgroundWindow = chrome.extension.getBackgroundPage();\n    // Do anything with the exposed variables from background.js\n    console.log(backgroundWindow.sampleBackgroundGlobal);\n\n    // This port enables a long-lived connection to in-content.js\n    let port = null;\n\n    // Send messages to the open port\n    const sendPortMessage = message => port.postMessage(message);\n\n    // Find the current active tab\n    const getTab = () => new Promise(resolve => {\n        chrome.tabs.query({\n            active: true,\n            currentWindow: true\n        }, tabs => resolve(tabs[0]));\n    });\n\n    // Handle port messages\n    const messageHandler = message => {\n        console.log('popup.js - received message:', message);\n    };\n\n    // Find the current active tab, then open a port to it\n    getTab().then(tab => {\n        // Connects to tab port to enable communication with inContent.js\n        port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });\n        // Set up the message listener\n        port.onMessage.addListener(messageHandler);\n        // Send a test message to in-content.js\n        sendPortMessage('Message from popup!');\n    });\n};\n\n// Fire scripts after page has loaded\ndocument.addEventListener('DOMContentLoaded', initPopupScript);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvcG9wdXAuanM/MDIyNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBwb3B1cC5qc1xuICpcbiAqIFRoaXMgZmlsZSBpbml0aWFsaXplcyBpdHMgc2NyaXB0cyBhZnRlciB0aGUgcG9wdXAgaGFzIGxvYWRlZC5cbiAqXG4gKiBJdCBzaG93cyBob3cgdG8gYWNjZXNzIGdsb2JhbCB2YXJpYWJsZXMgZnJvbSBiYWNrZ3JvdW5kLmpzLlxuICogTm90ZSB0aGF0IGdldFZpZXdzIGNvdWxkIGJlIHVzZWQgaW5zdGVhZCB0byBhY2Nlc3Mgb3RoZXIgc2NyaXB0cy5cbiAqXG4gKiBBIHBvcnQgdG8gdGhlIGFjdGl2ZSB0YWIgaXMgb3BlbiB0byBzZW5kIG1lc3NhZ2VzIHRvIGl0cyBpbi1jb250ZW50LmpzIHNjcmlwdC5cbiAqXG4gKi9cblxuLy8gU3RhcnQgdGhlIHBvcHVwIHNjcmlwdCwgdGhpcyBjb3VsZCBiZSBhbnl0aGluZyBmcm9tIGEgc2ltcGxlIHNjcmlwdCB0byBhIHdlYmFwcFxuY29uc3QgaW5pdFBvcHVwU2NyaXB0ID0gKCkgPT4ge1xuICAgIC8vIEFjY2VzcyB0aGUgYmFja2dyb3VuZCB3aW5kb3cgb2JqZWN0XG4gICAgY29uc3QgYmFja2dyb3VuZFdpbmRvdyA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcbiAgICAvLyBEbyBhbnl0aGluZyB3aXRoIHRoZSBleHBvc2VkIHZhcmlhYmxlcyBmcm9tIGJhY2tncm91bmQuanNcbiAgICBjb25zb2xlLmxvZyhiYWNrZ3JvdW5kV2luZG93LnNhbXBsZUJhY2tncm91bmRHbG9iYWwpO1xuXG4gICAgLy8gVGhpcyBwb3J0IGVuYWJsZXMgYSBsb25nLWxpdmVkIGNvbm5lY3Rpb24gdG8gaW4tY29udGVudC5qc1xuICAgIGxldCBwb3J0ID0gbnVsbDtcblxuICAgIC8vIFNlbmQgbWVzc2FnZXMgdG8gdGhlIG9wZW4gcG9ydFxuICAgIGNvbnN0IHNlbmRQb3J0TWVzc2FnZSA9IG1lc3NhZ2UgPT4gcG9ydC5wb3N0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgIC8vIEZpbmQgdGhlIGN1cnJlbnQgYWN0aXZlIHRhYlxuICAgIGNvbnN0IGdldFRhYiA9ICgpID0+XG4gICAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRhYnMgPT4gcmVzb2x2ZSh0YWJzWzBdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgcG9ydCBtZXNzYWdlc1xuICAgIGNvbnN0IG1lc3NhZ2VIYW5kbGVyID0gbWVzc2FnZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3B1cC5qcyAtIHJlY2VpdmVkIG1lc3NhZ2U6JywgbWVzc2FnZSk7XG4gICAgfTtcblxuICAgIC8vIEZpbmQgdGhlIGN1cnJlbnQgYWN0aXZlIHRhYiwgdGhlbiBvcGVuIGEgcG9ydCB0byBpdFxuICAgIGdldFRhYigpLnRoZW4odGFiID0+IHtcbiAgICAgICAgLy8gQ29ubmVjdHMgdG8gdGFiIHBvcnQgdG8gZW5hYmxlIGNvbW11bmljYXRpb24gd2l0aCBpbkNvbnRlbnQuanNcbiAgICAgICAgcG9ydCA9IGNocm9tZS50YWJzLmNvbm5lY3QodGFiLmlkLCB7IG5hbWU6ICdjaHJvbWUtZXh0ZW5zaW9uLXRlbXBsYXRlJyB9KTtcbiAgICAgICAgLy8gU2V0IHVwIHRoZSBtZXNzYWdlIGxpc3RlbmVyXG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKG1lc3NhZ2VIYW5kbGVyKTtcbiAgICAgICAgLy8gU2VuZCBhIHRlc3QgbWVzc2FnZSB0byBpbi1jb250ZW50LmpzXG4gICAgICAgIHNlbmRQb3J0TWVzc2FnZSgnTWVzc2FnZSBmcm9tIHBvcHVwIScpO1xuICAgIH0pO1xufTtcblxuLy8gRmlyZSBzY3JpcHRzIGFmdGVyIHBhZ2UgaGFzIGxvYWRlZFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRQb3B1cFNjcmlwdCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3BvcHVwLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);