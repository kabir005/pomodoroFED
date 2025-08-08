let sessionTime = 25;
let breakTime = 5;
let isRunning = false;
let isSession = true;
let timer;
let secondsLeft = sessionTime * 60;

function updateDisplay() {
  let mins = Math.floor(secondsLeft / 60);
  let secs = secondsLeft % 60;
  document.getElementById("time").innerText = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function changeSession(change) {
  if (isRunning) return;
  sessionTime += change;
  if (sessionTime < 0) sessionTime = 0;
  document.getElementById("session").innerText = sessionTime;
  secondsLeft = sessionTime * 60;
  updateDisplay();
}

function changeBreak(change) {
  if (isRunning) return;
  breakTime += change;
  if (breakTime < 0) breakTime = 0;
  document.getElementById("break").innerText = breakTime;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  document.getElementById("startBtn").disabled = true;

  timer = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      updateDisplay();
    } else {
      isSession = !isSession;
      secondsLeft = (isSession ? sessionTime : breakTime) * 60;
      updateDisplay();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isSession = true;
  sessionTime = parseInt(document.getElementById("session").innerText);
  secondsLeft = sessionTime * 60;
  updateDisplay();
  document.getElementById("startBtn").disabled = false;
}

updateDisplay();
