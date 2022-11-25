let selectTimeZone = document.getElementById("selectTimeZone")

selectTimeZone.addEventListener("change", function() {
  let timeZone = selectTimeZone.value;
  chrome.storage.sync.set({ timeZone });
});