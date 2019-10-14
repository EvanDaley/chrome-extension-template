/* popup.js
 *
 * This file initializes its scripts after the popup has loaded.
 *
 * It shows how to access global variables from background.js.
 * Note that getViews could be used instead to access other scripts.
 *
 * A port to the active tab is open to send messages to its in-content.js script.
 */

// Send a message to background.js
function submitForm() {
  try {
    const form = document.getElementById("searchForm");
    const elements = form.elements;

    const data = {};
    for (let i = 0; i < elements.length; i++) {
      const item = elements.item(i);
      data[item.name] = item.value;
    }

    chrome.runtime.sendMessage({
      type: 'FORM_SUBMISSION',
      formData: data
    })
  } catch (err) {
    // This is necessary to unify error logs.
    chrome.extension.getBackgroundPage().console.log(err)
  }

}

// Start the popup script, this could be anything from a simple script to a webapp
const initPopupScript = () => {
  try {

    // Access the background window object
    const backgroundWindow = chrome.extension.getBackgroundPage();
    // Do anything with the exposed variables from background.js
    console.log(backgroundWindow.sampleBackgroundGlobal);

    document.getElementById("searchForm").addEventListener('submit', function (event) {
      event.preventDefault();
      submitForm();
    });
  } catch (err) {
    // This is necessary to unify error logs.
    chrome.extension.getBackgroundPage().console.log(err)
  }
};

// Fire scripts after page has loaded
document.addEventListener('DOMContentLoaded', initPopupScript);