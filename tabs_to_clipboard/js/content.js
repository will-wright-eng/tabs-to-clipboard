console.log('content.js loaded');

function unsecuredCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
}

function copyToClipboard(content) {
  if (window.isSecureContext && navigator.clipboard) {
    console.log('navigator.clipboard.writeText');
    navigator.clipboard.writeText(content);
  } else {
    console.log('unsecuredCopyToClipboard');
    unsecuredCopyToClipboard(content);
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  console.log(message.copyText);
  copyToClipboard(message.copyText);
});
