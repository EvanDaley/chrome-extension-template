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

eval("/* in-content.js\n*\n* This file has an example on how to communicate with other parts of the extension through a long lived connection (port) and also through short lived connections (chrome.runtime.sendMessage).\n*\n* Note that in this scenario the port is open from the popup, but other extensions may open it from the background page or not even have either background.js or popup.js.\n* */\n\n$(\"body\").append('Test');\n\n// Extension port to communicate with the popup, also helps detecting when it closes\nlet port = null;\n\n// Send messages to the open port (Popup)\nconst sendPortMessage = data => port.postMessage(data);\n\n// Handle incoming popup messages\nconst popupMessageHandler = message => {\n    console.log('in-content.js - message from popup:', message);\n\n    try {\n        if (message.type === 'SEARCH') {\n            console.log(\"searching the dom\");\n\n            jQuery(\"h1\").hide();\n\n            console.log(\"done\");\n        }\n    } catch (err) {\n        console.log(err);\n    }\n};\n\n// Start scripts after setting up the connection to popup\nchrome.extension.onConnect.addListener(popupPort => {\n    // Listen for popup messages\n    popupPort.onMessage.addListener(popupMessageHandler);\n    // Set listener for disconnection (aka. popup closed)\n    popupPort.onDisconnect.addListener(() => {\n        console.log('in-content.js - disconnected from popup');\n    });\n    // Make popup port accessible to other methods\n    port = popupPort;\n    // Perform any logic or set listeners\n    sendPortMessage('message from in-content.js');\n});\n\n// Response handler for short lived messages\nconst handleBackgroundResponse = response => {\n    console.log('in-content.js - Received response:', response);\n};\n\n// Send a message to background.js\nchrome.runtime.sendMessage('Message from in-content.js!', handleBackgroundResponse);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvaW4tY29udGVudC5qcz9iODc5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIGluLWNvbnRlbnQuanNcbipcbiogVGhpcyBmaWxlIGhhcyBhbiBleGFtcGxlIG9uIGhvdyB0byBjb21tdW5pY2F0ZSB3aXRoIG90aGVyIHBhcnRzIG9mIHRoZSBleHRlbnNpb24gdGhyb3VnaCBhIGxvbmcgbGl2ZWQgY29ubmVjdGlvbiAocG9ydCkgYW5kIGFsc28gdGhyb3VnaCBzaG9ydCBsaXZlZCBjb25uZWN0aW9ucyAoY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UpLlxuKlxuKiBOb3RlIHRoYXQgaW4gdGhpcyBzY2VuYXJpbyB0aGUgcG9ydCBpcyBvcGVuIGZyb20gdGhlIHBvcHVwLCBidXQgb3RoZXIgZXh0ZW5zaW9ucyBtYXkgb3BlbiBpdCBmcm9tIHRoZSBiYWNrZ3JvdW5kIHBhZ2Ugb3Igbm90IGV2ZW4gaGF2ZSBlaXRoZXIgYmFja2dyb3VuZC5qcyBvciBwb3B1cC5qcy5cbiogKi9cblxuJChcImJvZHlcIikuYXBwZW5kKCdUZXN0Jyk7XG5cbi8vIEV4dGVuc2lvbiBwb3J0IHRvIGNvbW11bmljYXRlIHdpdGggdGhlIHBvcHVwLCBhbHNvIGhlbHBzIGRldGVjdGluZyB3aGVuIGl0IGNsb3Nlc1xubGV0IHBvcnQgPSBudWxsO1xuXG4vLyBTZW5kIG1lc3NhZ2VzIHRvIHRoZSBvcGVuIHBvcnQgKFBvcHVwKVxuY29uc3Qgc2VuZFBvcnRNZXNzYWdlID0gZGF0YSA9PiBwb3J0LnBvc3RNZXNzYWdlKGRhdGEpO1xuXG4vLyBIYW5kbGUgaW5jb21pbmcgcG9wdXAgbWVzc2FnZXNcbmNvbnN0IHBvcHVwTWVzc2FnZUhhbmRsZXIgPSBtZXNzYWdlID0+IHtcbiAgICBjb25zb2xlLmxvZygnaW4tY29udGVudC5qcyAtIG1lc3NhZ2UgZnJvbSBwb3B1cDonLCBtZXNzYWdlKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdTRUFSQ0gnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlYXJjaGluZyB0aGUgZG9tXCIpXG5cbiAgICAgICAgICAgIGpRdWVyeShcImgxXCIpLmhpZGUoKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkb25lXCIpXG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH1cbn1cblxuLy8gU3RhcnQgc2NyaXB0cyBhZnRlciBzZXR0aW5nIHVwIHRoZSBjb25uZWN0aW9uIHRvIHBvcHVwXG5jaHJvbWUuZXh0ZW5zaW9uLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihwb3B1cFBvcnQgPT4ge1xuICAgIC8vIExpc3RlbiBmb3IgcG9wdXAgbWVzc2FnZXNcbiAgICBwb3B1cFBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKHBvcHVwTWVzc2FnZUhhbmRsZXIpO1xuICAgIC8vIFNldCBsaXN0ZW5lciBmb3IgZGlzY29ubmVjdGlvbiAoYWthLiBwb3B1cCBjbG9zZWQpXG4gICAgcG9wdXBQb3J0Lm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbi1jb250ZW50LmpzIC0gZGlzY29ubmVjdGVkIGZyb20gcG9wdXAnKTtcbiAgICB9KTtcbiAgICAvLyBNYWtlIHBvcHVwIHBvcnQgYWNjZXNzaWJsZSB0byBvdGhlciBtZXRob2RzXG4gICAgcG9ydCA9IHBvcHVwUG9ydDtcbiAgICAvLyBQZXJmb3JtIGFueSBsb2dpYyBvciBzZXQgbGlzdGVuZXJzXG4gICAgc2VuZFBvcnRNZXNzYWdlKCdtZXNzYWdlIGZyb20gaW4tY29udGVudC5qcycpO1xufSk7XG5cblxuLy8gUmVzcG9uc2UgaGFuZGxlciBmb3Igc2hvcnQgbGl2ZWQgbWVzc2FnZXNcbmNvbnN0IGhhbmRsZUJhY2tncm91bmRSZXNwb25zZSA9IHJlc3BvbnNlID0+IHtcbiAgICBjb25zb2xlLmxvZygnaW4tY29udGVudC5qcyAtIFJlY2VpdmVkIHJlc3BvbnNlOicsIHJlc3BvbnNlKTtcbn1cblxuLy8gU2VuZCBhIG1lc3NhZ2UgdG8gYmFja2dyb3VuZC5qc1xuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ01lc3NhZ2UgZnJvbSBpbi1jb250ZW50LmpzIScsIGhhbmRsZUJhY2tncm91bmRSZXNwb25zZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2luLWNvbnRlbnQuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ })

/******/ });