chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: getSelectedText,
    },
    (results) => {
      const selectedText = results[0]?.result || "";
      if (selectedText) {
        const chatGPTUrl = `https://chatgpt.com/?q=${encodeURIComponent(
          selectedText
        )}`;
        chrome.tabs.create({ url: chatGPTUrl });
      } else {
        chrome.tabs.create({ url: "https://chatgpt.com/" });
      }
    }
  );
});

function getSelectedText() {
  return window.getSelection().toString();
}
