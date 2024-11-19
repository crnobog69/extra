browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs
    .executeScript({
      code: "window.getSelection().toString()",
    })
    .then((results) => {
      const selectedText = results[0] || "";
      if (selectedText) {
        const chatGPTUrl = `https://chatgpt.com/?q=${encodeURIComponent(
          selectedText
        )}`;
        browser.tabs.create({ url: chatGPTUrl });
      } else {
        browser.tabs.create({ url: "https://chatgpt.com/" });
      }
    });
});
