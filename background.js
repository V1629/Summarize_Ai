chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => {
        chrome.runtime.sendMessage({action: "simplify-page"});
      }
    });
  });