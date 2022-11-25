let timeZone = 'Asia/Tokyo';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timeZone });
});