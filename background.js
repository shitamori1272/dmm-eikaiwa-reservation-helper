let timeZone = 'Asia/Tokyo';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('timeZone', (result) => {
    if (!result.timeZone) {
      chrome.storage.sync.set({ timeZone });
    }
  });
});