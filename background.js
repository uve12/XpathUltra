let isOpen = false;

chrome.browserAction.onClicked.addListener(() => {
    isOpen = !isOpen;
    
    // Send a message to the content script to toggle visibility
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: isOpen ? "show" : "hide" });
    });
});
