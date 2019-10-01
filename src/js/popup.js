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


// Send a message to background.js
function submitForm() {
    console.log("Submitting")
    chrome.runtime.sendMessage('submitting!')
    // chrome.tabs.update({url: "http://www.baidu.com"});
}

// Start the popup script, this could be anything from a simple script to a webapp
const initPopupScript = () => {
    // Access the background window object
    const backgroundWindow = chrome.extension.getBackgroundPage();
    // Do anything with the exposed variables from background.js
    console.log(backgroundWindow.sampleBackgroundGlobal);

    document.getElementById("submit").addEventListener('click', submitForm);
};

// Fire scripts after page has loaded
document.addEventListener('DOMContentLoaded', initPopupScript);