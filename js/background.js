// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" called`);

  (async function wrapCopytoClipboard(){
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    var mdTabs = await tabs.map(({ title, url }) => `- [${title}](${url})`);
    var content = mdTabs.join('\n');
    console.log(content);

    // send message to content script
    // 1. Send a message to the service worker requesting the user's data
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", "copyText": content}, function(response) {
      // WARNING! Might be evaluating an evil script!
      // 3. Got an asynchronous response with the data from the service worker
      console.log(response);
    });

  })();
});