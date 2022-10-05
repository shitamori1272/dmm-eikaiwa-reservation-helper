// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: appendLocalTimezoneTime,
  });
});

function appendLocalTimezoneTime() {
  chrome.storage.sync.get("color", ({ color }) => {
    let timeColumns = document.querySelector(".time")
    for(var i=0; i<timeColumns.childElementCount; i++ ) {
      var timeElement = timeColumns.children[i].firstChild;
      var timeText = timeElement.textContent;
      var [hour, minute] = timeText.split(":");
      var date = new Date(Date.UTC(2022, 1, 1, +hour, +minute));
      // JST -> UTC
      date.setTime(date.getTime() - (9 * 60 * 60 * 1000));
      // UTC -> CANADA
      date.setTime(date.getTime() - (6 * 60 * 60 * 1000));
      var new_hour = date.getUTCHours();
      var new_minute = date.getUTCMinutes();
      if(new_minute == 0) {
        new_minute = "00";
      }
      timeElement.textContent = timeElement.textContent + "(" + new_hour+":"+new_minute + ")";
    }
  });
}