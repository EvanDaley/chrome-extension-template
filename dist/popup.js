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

eval("/* popup.js\n *\n * This file initializes its scripts after the popup has loaded.\n *\n * It shows how to access global variables from background.js.\n * Note that getViews could be used instead to access other scripts.\n *\n * A port to the active tab is open to send messages to its in-content.js script.\n *\n */\n\n// This port enables a long-lived connection to in-content.js\nlet port = null;\n\nconst sendPortMessage = message => port.postMessage(message);\n\nconst messageHandler = message => {\n  console.log('popup.js - received message:', message);\n};\n\n// Find the current active tab\nconst getTab = () => new Promise(resolve => {\n  chrome.tabs.query({\n    active: true,\n    currentWindow: true\n  }, tabs => resolve(tabs[0]));\n});\n\n// Start the popup script, this could be anything from a simple script to a webapp\nconst initPopupScript = () => {\n  document.getElementById(\"searchForm\").addEventListener('submit', function (event) {\n    event.preventDefault();\n    submitForm();\n  });\n\n  // Access the background window object\n  const backgroundWindow = chrome.extension.getBackgroundPage();\n\n  // Do anything with the exposed variables from background.js\n  console.log(backgroundWindow.sampleBackgroundGlobal);\n\n  // Find the current active tab, then open a port to it\n  getTab().then(tab => {\n    // Connects to tab port to enable communication with inContent.js\n    port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });\n    // Set up the message listener\n    port.onMessage.addListener(messageHandler);\n    // Send a test message to in-content.js\n    sendPortMessage('Message from popup!');\n  });\n};\n\nconst submitForm = () => {\n  try {\n    const form = document.getElementById(\"searchForm\");\n    const elements = form.elements;\n\n    const data = {};\n    for (let i = 0; i < elements.length; i++) {\n      const item = elements.item(i);\n      data[item.name] = item.value;\n    }\n\n    let messsage = {\n      type: 'SEARCH',\n      formData: data.search\n    };\n\n    sendPortMessage(messsage);\n  } catch (err) {\n    // This is necessary to unify error logs.\n    chrome.extension.getBackgroundPage().console.log(err);\n  }\n};\n\n// Fire scripts after page has loaded\ndocument.addEventListener('DOMContentLoaded', initPopupScript);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvcG9wdXAuanM/MDIyNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBwb3B1cC5qc1xuICpcbiAqIFRoaXMgZmlsZSBpbml0aWFsaXplcyBpdHMgc2NyaXB0cyBhZnRlciB0aGUgcG9wdXAgaGFzIGxvYWRlZC5cbiAqXG4gKiBJdCBzaG93cyBob3cgdG8gYWNjZXNzIGdsb2JhbCB2YXJpYWJsZXMgZnJvbSBiYWNrZ3JvdW5kLmpzLlxuICogTm90ZSB0aGF0IGdldFZpZXdzIGNvdWxkIGJlIHVzZWQgaW5zdGVhZCB0byBhY2Nlc3Mgb3RoZXIgc2NyaXB0cy5cbiAqXG4gKiBBIHBvcnQgdG8gdGhlIGFjdGl2ZSB0YWIgaXMgb3BlbiB0byBzZW5kIG1lc3NhZ2VzIHRvIGl0cyBpbi1jb250ZW50LmpzIHNjcmlwdC5cbiAqXG4gKi9cblxuLy8gVGhpcyBwb3J0IGVuYWJsZXMgYSBsb25nLWxpdmVkIGNvbm5lY3Rpb24gdG8gaW4tY29udGVudC5qc1xubGV0IHBvcnQgPSBudWxsO1xuXG5jb25zdCBzZW5kUG9ydE1lc3NhZ2UgPSBtZXNzYWdlID0+IHBvcnQucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG5cbmNvbnN0IG1lc3NhZ2VIYW5kbGVyID0gbWVzc2FnZSA9PiB7XG4gIGNvbnNvbGUubG9nKCdwb3B1cC5qcyAtIHJlY2VpdmVkIG1lc3NhZ2U6JywgbWVzc2FnZSk7XG59O1xuXG4vLyBGaW5kIHRoZSBjdXJyZW50IGFjdGl2ZSB0YWJcbmNvbnN0IGdldFRhYiA9ICgpID0+XG4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KFxuICAgICAge1xuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcbiAgICAgIH0sXG4gICAgICB0YWJzID0+IHJlc29sdmUodGFic1swXSlcbiAgICApO1xuICB9KTtcblxuLy8gU3RhcnQgdGhlIHBvcHVwIHNjcmlwdCwgdGhpcyBjb3VsZCBiZSBhbnl0aGluZyBmcm9tIGEgc2ltcGxlIHNjcmlwdCB0byBhIHdlYmFwcFxuY29uc3QgaW5pdFBvcHVwU2NyaXB0ID0gKCkgPT4ge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzdWJtaXRGb3JtKCk7XG4gIH0pXG5cbiAgLy8gQWNjZXNzIHRoZSBiYWNrZ3JvdW5kIHdpbmRvdyBvYmplY3RcbiAgY29uc3QgYmFja2dyb3VuZFdpbmRvdyA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcblxuICAvLyBEbyBhbnl0aGluZyB3aXRoIHRoZSBleHBvc2VkIHZhcmlhYmxlcyBmcm9tIGJhY2tncm91bmQuanNcbiAgY29uc29sZS5sb2coYmFja2dyb3VuZFdpbmRvdy5zYW1wbGVCYWNrZ3JvdW5kR2xvYmFsKTtcblxuICAvLyBGaW5kIHRoZSBjdXJyZW50IGFjdGl2ZSB0YWIsIHRoZW4gb3BlbiBhIHBvcnQgdG8gaXRcbiAgZ2V0VGFiKCkudGhlbih0YWIgPT4ge1xuICAgIC8vIENvbm5lY3RzIHRvIHRhYiBwb3J0IHRvIGVuYWJsZSBjb21tdW5pY2F0aW9uIHdpdGggaW5Db250ZW50LmpzXG4gICAgcG9ydCA9IGNocm9tZS50YWJzLmNvbm5lY3QodGFiLmlkLCB7bmFtZTogJ2Nocm9tZS1leHRlbnNpb24tdGVtcGxhdGUnfSk7XG4gICAgLy8gU2V0IHVwIHRoZSBtZXNzYWdlIGxpc3RlbmVyXG4gICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobWVzc2FnZUhhbmRsZXIpO1xuICAgIC8vIFNlbmQgYSB0ZXN0IG1lc3NhZ2UgdG8gaW4tY29udGVudC5qc1xuICAgIHNlbmRQb3J0TWVzc2FnZSgnTWVzc2FnZSBmcm9tIHBvcHVwIScpO1xuICB9KTtcbn07XG5cbmNvbnN0IHN1Ym1pdEZvcm0gPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoRm9ybVwiKTtcbiAgICBjb25zdCBlbGVtZW50cyA9IGZvcm0uZWxlbWVudHM7XG5cbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbSA9IGVsZW1lbnRzLml0ZW0oaSk7XG4gICAgICBkYXRhW2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuICAgIH1cblxuICAgIGxldCBtZXNzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdTRUFSQ0gnLFxuICAgICAgZm9ybURhdGE6IGRhdGEuc2VhcmNoXG4gICAgfVxuXG4gICAgc2VuZFBvcnRNZXNzYWdlKG1lc3NzYWdlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gVGhpcyBpcyBuZWNlc3NhcnkgdG8gdW5pZnkgZXJyb3IgbG9ncy5cbiAgICBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCkuY29uc29sZS5sb2coZXJyKVxuICB9XG59XG5cblxuLy8gRmlyZSBzY3JpcHRzIGFmdGVyIHBhZ2UgaGFzIGxvYWRlZFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRQb3B1cFNjcmlwdCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3BvcHVwLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);