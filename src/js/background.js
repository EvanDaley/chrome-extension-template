/* background.js
 *
 * This file has an example of how to make variables accessible to other scripts of the extension.
 *
 * It also shows how to handle short lived messages from other scripts, in this case, from in-content.js
 *
 * Note that not all extensions need of a background.js file, but extensions that need to persist data after a popup has closed may need of it.
 */

// A sample object that will be exposed further down and used on popup.js
const sampleBackgroundGlobal = {
    message: 'This object comes from background.js'
};

// TODO: Experiment with saving:
//  1. save one of the form fields to storage on input change
//  2. Load it back on refresh / popup.
//  3. Reference:
// TODO: https://stackoverflow.com/questions/5364062/how-can-i-save-information-locally-in-my-chrome-extension

// Listen to short lived messages from in-content.js
chrome.runtime.onMessage.addListener((message, sender) => {
    // Perform any other actions depending on the message
    console.log('background.js - received message:', message);

    if (message.type == 'FORM_SUBMISSION') {
        // TODO: attempt a post.
        // post to http://localhost:8080/api/v3/client/companies
        // {company: {name: "yo-momma-666", entity_type_id: "454d86ee-5c8c-4106-a91a-78643e46ef1d"}}
    }

    // chrome.tabs.update({url: "http://www.baidu.com"});
});

// Make variables accessible from chrome.extension.getBackgroundPage()
window.sampleBackgroundGlobal = sampleBackgroundGlobal;