async function copyToTheClipboard(textToCopy){
  console.log(textToCopy)
  const el = document.createElement('textarea');
  el.value = textToCopy;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

const jsButton = document.querySelector("button#json-button");
jsButton.addEventListener("click", async () => {
  const windowsInfo = await chrome.windows.getAll({populate: true});
  copyToTheClipboard(JSON.stringify(windowsInfo));
});

const mdButtonWindow = document.querySelector("button#markdown-button-window");
mdButtonWindow.addEventListener("click", async () => {
  const tabs = await chrome.tabs.query({currentWindow: true});
  var mdTabs = await tabs.map(({ title, url }) => `- [${title}](${url})`);
  copyToTheClipboard(mdTabs.join('\n'));
});

const mdButtonTab = document.querySelector("button#markdown-button-tab");
mdButtonTab.addEventListener("click", async () => {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  var mdTabs = await tabs.map(({ title, url }) => `- [${title}](${url})`);
  copyToTheClipboard(mdTabs.join('\n'));
});
