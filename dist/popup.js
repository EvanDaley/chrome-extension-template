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

eval("/* popup.js\n *\n * This file initializes its scripts after the popup has loaded.\n *\n * It shows how to access global variables from background.js.\n * Note that getViews could be used instead to access other scripts.\n *\n * A port to the active tab is open to send messages to its in-content.js script.\n *\n */\n\n// Start the popup script, this could be anything from a simple script to a webapp\nconst initPopupScript = () => {\n  document.getElementById(\"searchForm\").addEventListener('submit', function (event) {\n    event.preventDefault();\n    submitForm();\n  });\n\n  // Access the background window object\n  const backgroundWindow = chrome.extension.getBackgroundPage();\n  // Do anything with the exposed variables from background.js\n  console.log(backgroundWindow.sampleBackgroundGlobal);\n\n  // This port enables a long-lived connection to in-content.js\n  let port = null;\n\n  // Send messages to the open port\n  const sendPortMessage = message => port.postMessage(message);\n\n  // Find the current active tab\n  const getTab = () => new Promise(resolve => {\n    chrome.tabs.query({\n      active: true,\n      currentWindow: true\n    }, tabs => resolve(tabs[0]));\n  });\n\n  // Handle port messages\n  const messageHandler = message => {\n    console.log('popup.js - received message:', message);\n  };\n\n  // Find the current active tab, then open a port to it\n  getTab().then(tab => {\n    // Connects to tab port to enable communication with inContent.js\n    port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });\n    // Set up the message listener\n    port.onMessage.addListener(messageHandler);\n    // Send a test message to in-content.js\n    sendPortMessage('Message from popup!');\n  });\n};\n\n// Send a message to in-content.js\nconst submitForm = () => {\n  try {\n    chrome.extension.getBackgroundPage().console.log('here');\n\n    const form = document.getElementById(\"searchForm\");\n    const elements = form.elements;\n\n    const data = {};\n    for (let i = 0; i < elements.length; i++) {\n      const item = elements.item(i);\n      data[item.name] = item.value;\n    }\n\n    // Find the current active tab\n    const getTab = () => new Promise(resolve => {\n      chrome.tabs.query({\n        active: true,\n        currentWindow: true\n      }, tabs => resolve(tabs[0]));\n    });\n\n    const messageHandler = message => {\n      console.log('popup.js - received message:', message);\n    };\n\n    chrome.extension.getBackgroundPage().console.log('here3');\n    chrome.extension.getBackgroundPage().console.log(data);\n\n    // This port enables a long-lived connection to in-content.js\n    let port = null;\n\n    // Send messages to the open port\n    const sendPortMessage = message => port.postMessage(message);\n\n    // Find the current active tab, then open a port to it\n    getTab().then(tab => {\n      // Connects to tab port to enable communication with inContent.js\n      port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });\n      // Set up the message listener\n      port.onMessage.addListener(messageHandler);\n      // Send a test message to in-content.js\n\n      let messsage = {\n        type: 'SEARCH',\n        formData: 'asdfasdf'\n      };\n\n      sendPortMessage('asdfasdfa');\n    });\n\n    // chrome.runtime.sendMessage({\n    //   type: 'FORM_SUBMISSION',\n    //   formData: data\n    // })\n\n    chrome.extension.getBackgroundPage().console.log('here5');\n  } catch (err) {\n    // This is necessary to unify error logs.\n    chrome.extension.getBackgroundPage().console.log(err);\n  }\n};\n\n// Fire scripts after page has loaded\ndocument.addEventListener('DOMContentLoaded', initPopupScript);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvcG9wdXAuanM/MDIyNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBwb3B1cC5qc1xuICpcbiAqIFRoaXMgZmlsZSBpbml0aWFsaXplcyBpdHMgc2NyaXB0cyBhZnRlciB0aGUgcG9wdXAgaGFzIGxvYWRlZC5cbiAqXG4gKiBJdCBzaG93cyBob3cgdG8gYWNjZXNzIGdsb2JhbCB2YXJpYWJsZXMgZnJvbSBiYWNrZ3JvdW5kLmpzLlxuICogTm90ZSB0aGF0IGdldFZpZXdzIGNvdWxkIGJlIHVzZWQgaW5zdGVhZCB0byBhY2Nlc3Mgb3RoZXIgc2NyaXB0cy5cbiAqXG4gKiBBIHBvcnQgdG8gdGhlIGFjdGl2ZSB0YWIgaXMgb3BlbiB0byBzZW5kIG1lc3NhZ2VzIHRvIGl0cyBpbi1jb250ZW50LmpzIHNjcmlwdC5cbiAqXG4gKi9cblxuLy8gU3RhcnQgdGhlIHBvcHVwIHNjcmlwdCwgdGhpcyBjb3VsZCBiZSBhbnl0aGluZyBmcm9tIGEgc2ltcGxlIHNjcmlwdCB0byBhIHdlYmFwcFxuY29uc3QgaW5pdFBvcHVwU2NyaXB0ID0gKCkgPT4ge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzdWJtaXRGb3JtKCk7XG4gIH0pXG5cbiAgLy8gQWNjZXNzIHRoZSBiYWNrZ3JvdW5kIHdpbmRvdyBvYmplY3RcbiAgY29uc3QgYmFja2dyb3VuZFdpbmRvdyA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcbiAgLy8gRG8gYW55dGhpbmcgd2l0aCB0aGUgZXhwb3NlZCB2YXJpYWJsZXMgZnJvbSBiYWNrZ3JvdW5kLmpzXG4gIGNvbnNvbGUubG9nKGJhY2tncm91bmRXaW5kb3cuc2FtcGxlQmFja2dyb3VuZEdsb2JhbCk7XG5cbiAgLy8gVGhpcyBwb3J0IGVuYWJsZXMgYSBsb25nLWxpdmVkIGNvbm5lY3Rpb24gdG8gaW4tY29udGVudC5qc1xuICBsZXQgcG9ydCA9IG51bGw7XG5cbiAgLy8gU2VuZCBtZXNzYWdlcyB0byB0aGUgb3BlbiBwb3J0XG4gIGNvbnN0IHNlbmRQb3J0TWVzc2FnZSA9IG1lc3NhZ2UgPT4gcG9ydC5wb3N0TWVzc2FnZShtZXNzYWdlKTtcblxuICAvLyBGaW5kIHRoZSBjdXJyZW50IGFjdGl2ZSB0YWJcbiAgY29uc3QgZ2V0VGFiID0gKCkgPT5cbiAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgdGFicyA9PiByZXNvbHZlKHRhYnNbMF0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gIC8vIEhhbmRsZSBwb3J0IG1lc3NhZ2VzXG4gIGNvbnN0IG1lc3NhZ2VIYW5kbGVyID0gbWVzc2FnZSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3BvcHVwLmpzIC0gcmVjZWl2ZWQgbWVzc2FnZTonLCBtZXNzYWdlKTtcbiAgfTtcblxuICAvLyBGaW5kIHRoZSBjdXJyZW50IGFjdGl2ZSB0YWIsIHRoZW4gb3BlbiBhIHBvcnQgdG8gaXRcbiAgZ2V0VGFiKCkudGhlbih0YWIgPT4ge1xuICAgIC8vIENvbm5lY3RzIHRvIHRhYiBwb3J0IHRvIGVuYWJsZSBjb21tdW5pY2F0aW9uIHdpdGggaW5Db250ZW50LmpzXG4gICAgcG9ydCA9IGNocm9tZS50YWJzLmNvbm5lY3QodGFiLmlkLCB7bmFtZTogJ2Nocm9tZS1leHRlbnNpb24tdGVtcGxhdGUnfSk7XG4gICAgLy8gU2V0IHVwIHRoZSBtZXNzYWdlIGxpc3RlbmVyXG4gICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobWVzc2FnZUhhbmRsZXIpO1xuICAgIC8vIFNlbmQgYSB0ZXN0IG1lc3NhZ2UgdG8gaW4tY29udGVudC5qc1xuICAgIHNlbmRQb3J0TWVzc2FnZSgnTWVzc2FnZSBmcm9tIHBvcHVwIScpO1xuICB9KTtcbn07XG5cbi8vIFNlbmQgYSBtZXNzYWdlIHRvIGluLWNvbnRlbnQuanNcbmNvbnN0IHN1Ym1pdEZvcm0gPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpLmNvbnNvbGUubG9nKCdoZXJlJylcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEZvcm1cIik7XG4gICAgY29uc3QgZWxlbWVudHMgPSBmb3JtLmVsZW1lbnRzO1xuXG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBlbGVtZW50cy5pdGVtKGkpO1xuICAgICAgZGF0YVtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBGaW5kIHRoZSBjdXJyZW50IGFjdGl2ZSB0YWJcbiAgICBjb25zdCBnZXRUYWIgPSAoKSA9PlxuICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRhYnMgPT4gcmVzb2x2ZSh0YWJzWzBdKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBtZXNzYWdlSGFuZGxlciA9IG1lc3NhZ2UgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3BvcHVwLmpzIC0gcmVjZWl2ZWQgbWVzc2FnZTonLCBtZXNzYWdlKTtcbiAgICB9O1xuXG4gICAgY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpLmNvbnNvbGUubG9nKCdoZXJlMycpXG4gICAgY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpLmNvbnNvbGUubG9nKGRhdGEpXG5cbiAgICAvLyBUaGlzIHBvcnQgZW5hYmxlcyBhIGxvbmctbGl2ZWQgY29ubmVjdGlvbiB0byBpbi1jb250ZW50LmpzXG4gICAgbGV0IHBvcnQgPSBudWxsO1xuXG4gICAgLy8gU2VuZCBtZXNzYWdlcyB0byB0aGUgb3BlbiBwb3J0XG4gICAgY29uc3Qgc2VuZFBvcnRNZXNzYWdlID0gbWVzc2FnZSA9PiBwb3J0LnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgLy8gRmluZCB0aGUgY3VycmVudCBhY3RpdmUgdGFiLCB0aGVuIG9wZW4gYSBwb3J0IHRvIGl0XG4gICAgZ2V0VGFiKCkudGhlbih0YWIgPT4ge1xuICAgICAgLy8gQ29ubmVjdHMgdG8gdGFiIHBvcnQgdG8gZW5hYmxlIGNvbW11bmljYXRpb24gd2l0aCBpbkNvbnRlbnQuanNcbiAgICAgIHBvcnQgPSBjaHJvbWUudGFicy5jb25uZWN0KHRhYi5pZCwge25hbWU6ICdjaHJvbWUtZXh0ZW5zaW9uLXRlbXBsYXRlJ30pO1xuICAgICAgLy8gU2V0IHVwIHRoZSBtZXNzYWdlIGxpc3RlbmVyXG4gICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlSGFuZGxlcik7XG4gICAgICAvLyBTZW5kIGEgdGVzdCBtZXNzYWdlIHRvIGluLWNvbnRlbnQuanNcblxuICAgICAgbGV0IG1lc3NzYWdlID0ge1xuICAgICAgICB0eXBlOiAnU0VBUkNIJyxcbiAgICAgICAgZm9ybURhdGE6ICdhc2RmYXNkZidcbiAgICAgIH1cblxuICAgICAgc2VuZFBvcnRNZXNzYWdlKCdhc2RmYXNkZmEnKTtcbiAgICB9KTtcblxuICAgIC8vIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAvLyAgIHR5cGU6ICdGT1JNX1NVQk1JU1NJT04nLFxuICAgIC8vICAgZm9ybURhdGE6IGRhdGFcbiAgICAvLyB9KVxuXG4gICAgY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpLmNvbnNvbGUubG9nKCdoZXJlNScpXG5cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gVGhpcyBpcyBuZWNlc3NhcnkgdG8gdW5pZnkgZXJyb3IgbG9ncy5cbiAgICBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCkuY29uc29sZS5sb2coZXJyKVxuICB9XG5cbn1cblxuXG4vLyBGaXJlIHNjcmlwdHMgYWZ0ZXIgcGFnZSBoYXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdFBvcHVwU2NyaXB0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvcG9wdXAuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);