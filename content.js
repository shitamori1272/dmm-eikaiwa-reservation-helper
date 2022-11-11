// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

let timeColumnsList = document.querySelectorAll(".time");
timeColumnsList.forEach((timeColumns) => {
  for(var i=0; i<timeColumns.childElementCount; i++ ) {
    var timeElement = timeColumns.children[i].firstChild;
    var timeText = timeElement.textContent;
    timeElement.textContent = timeElement.textContent + getLocalTimezondeDateString(timeText.replace("-", ""))
  } 
});

function getJSTCurrentDateString() {
  var currentDate = new Date(Date.now());
  options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour12: false,
    timeZone: 'Asia/Tokyo'
  };
  return new Intl.DateTimeFormat('ja-JP', options).format(currentDate);
}

function getLocalTimezondeDateString(jstHHMMString) {
  var [hour, minute] = jstHHMMString.split(":");
  [year, month, day] = getJSTCurrentDateString().split("/");
  var date = new Date(Date.UTC(+year, +month, +day, +hour, +minute));
  // JST -> UTC
  date.setTime(date.getTime() - (9 * 60 * 60 * 1000));
  // UTC -> CANADA
  // date.setTime(date.getTime() - (7 * 60 * 60 * 1000));
  options = {
    hour: 'numeric', minute: 'numeric',
    hour12: false,
    timeZone: 'MST'
  };
  return "(" + new Intl.DateTimeFormat('ja-JP', options).format(date) + "-)";
}

