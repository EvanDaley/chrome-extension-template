/* popup.js
 *
 * This file initializes its scripts after the popup has loaded.
 *
 * It shows how to access global variables from background.js.
 * Note that getViews could be used instead to access other scripts.
 *
 * A port to the active tab is open to send messages to its in-content.js script.
 *
 */

// This port enables a long-lived connection to in-content.js
let port = null;

const sendPortMessage = message => port.postMessage(message);

const messageHandler = message => {
  console.log('popup.js - received message:', message);
};

// Find the current active tab
const getTab = () =>
  new Promise(resolve => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      tabs => resolve(tabs[0])
    );
  });

// Start the popup script, this could be anything from a simple script to a webapp
const initPopupScript = () => {
  document.getElementById("searchForm").addEventListener('submit', function (event) {
    event.preventDefault();
    submitForm();
  })

  // Access the background window object
  const backgroundWindow = chrome.extension.getBackgroundPage();

  // Do anything with the exposed variables from background.js
  console.log(backgroundWindow.sampleBackgroundGlobal);

  // Find the current active tab, then open a port to it
  getTab().then(tab => {
    // Connects to tab port to enable communication with inContent.js
    port = chrome.tabs.connect(tab.id, {name: 'chrome-extension-template'});
    // Set up the message listener
    port.onMessage.addListener(messageHandler);
    // Send a test message to in-content.js
    sendPortMessage('Message from popup!');
  });
};

const submitForm = () => {
  try {
    const form = document.getElementById("searchForm");
    const elements = form.elements;

    const data = {};
    for (let i = 0; i < elements.length; i++) {
      const item = elements.item(i);
      data[item.name] = item.value;
    }

    let message = {
      type: 'SEARCH',
      formData: data.search
    }

    sendPortMessage(message);
  } catch (err) {
    // This is necessary to unify error logs.
    chrome.extension.getBackgroundPage().console.log(err)
  }
}


// Fire scripts after page has loaded
document.addEventListener('DOMContentLoaded', initPopupScript);
