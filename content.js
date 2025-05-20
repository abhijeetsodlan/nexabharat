// DOM elements that will be created
let timerContainer = null;
let blurOverlay = null;
let breakPopup = null;
let warningPopup = null;

// Current state
let currentState = {
  isRunning: true,
  workMinutes: 20,
  workSecondsLeft: 20 * 60,
  isOnBreak: false,
  isOnWarning: false,
  breakCountdown: 20,
  warningCountdown: 5
};

// Initialize when the content script loads
function initialize() {
  createTimerContainer();
  createBlurOverlay();
  createBreakPopup();
  createWarningPopup();
  
  // Request current state from the background
  chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
    if (response) {
      updateState(response);
    }
  });
}

// Create the persistent timer in the bottom right
function createTimerContainer() {
  timerContainer = document.createElement('div');
  timerContainer.className = 'eye-break-timer-container';
  
  // Create timer display
  const timerDisplay = document.createElement('div');
  timerDisplay.className = 'eye-break-timer-display';
  
  // Create progress circle
  const progressCircle = document.createElement('svg');
  progressCircle.className = 'eye-break-progress-circle';
  progressCircle.innerHTML = `
    <circle class="eye-break-progress-circle-bg" cx="20" cy="20" r="16"></circle>
    <circle class="eye-break-progress-circle-fg" cx="20" cy="20" r="16"></circle>
  `;
  
  // Create timer text
  const timerText = document.createElement('div');
  timerText.className = 'eye-break-timer-text';
  timerText.textContent = formatTime(currentState.workSecondsLeft);
  
  // Assemble
  timerDisplay.appendChild(progressCircle);
  timerDisplay.appendChild(timerText);
  timerContainer.appendChild(timerDisplay);
  
  document.body.appendChild(timerContainer);
}

// Create the blur overlay for breaks
function createBlurOverlay() {
  blurOverlay = document.createElement('div');
  blurOverlay.className = 'eye-break-blur-overlay';
  blurOverlay.style.display = 'none';
  document.body.appendChild(blurOverlay);
}

// Create the break popup
function createBreakPopup() {
  breakPopup = document.createElement('div');
  breakPopup.className = 'eye-break-popup';
  breakPopup.style.display = 'none';
  
  const title = document.createElement('h2');
  title.textContent = 'Time for an Eye Break!';
  
  const subtitle = document.createElement('p');
  subtitle.textContent = 'Look 20 feet away for 20 seconds';
  
  const countdown = document.createElement('div');
  countdown.className = 'eye-break-popup-countdown';
  
  const countdownCircle = document.createElement('svg');
  countdownCircle.className = 'eye-break-countdown-circle';
  countdownCircle.innerHTML = `
    <circle class="eye-break-countdown-circle-bg" cx="50" cy="50" r="45"></circle>
    <circle class="eye-break-countdown-circle-fg" cx="50" cy="50" r="45"></circle>
  `;
  
  const countdownText = document.createElement('div');
  countdownText.className = 'eye-break-countdown-text';
  countdownText.textContent = currentState.breakCountdown;
  
  const skipButton = document.createElement('button');
  skipButton.className = 'eye-break-skip-button';
  skipButton.textContent = 'Skip Break';
  skipButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'skipBreak' });
  });
  
  countdown.appendChild(countdownCircle);
  countdown.appendChild(countdownText);
  
  breakPopup.appendChild(title);
  breakPopup.appendChild(subtitle);
  breakPopup.appendChild(countdown);
  breakPopup.appendChild(skipButton);
  
  document.body.appendChild(breakPopup);
}

// Create the warning popup
function createWarningPopup() {
  warningPopup = document.createElement('div');
  warningPopup.className = 'eye-break-warning-popup';
  warningPopup.style.display = 'none';
  
  const text = document.createElement('p');
  text.textContent = 'Eye break starting in ';
  
  const countdown = document.createElement('span');
  countdown.className = 'eye-break-warning-countdown';
  countdown.textContent = currentState.warningCountdown;
  
  text.appendChild(countdown);
  warningPopup.appendChild(text);
  
  document.body.appendChild(warningPopup);
}

// Update the UI based on state
function updateUI() {
  // Update timer display
  if (timerContainer) {
    const timerText = timerContainer.querySelector('.eye-break-timer-text');
    if (timerText) {
      timerText.textContent = formatTime(currentState.workSecondsLeft);
    }
    
    // Update progress circle
    const progressCircle = timerContainer.querySelector('.eye-break-progress-circle-fg');
    if (progressCircle) {
      const totalSeconds = currentState.workMinutes * 60;
      const progress = currentState.workSecondsLeft / totalSeconds;
      const circumference = 2 * Math.PI * 16;
      progressCircle.style.strokeDashoffset = circumference * (1 - progress);
    }
    
    // Show/hide based on break status
    timerContainer.style.display = (!currentState.isOnBreak && !currentState.isOnWarning) ? 'block' : 'none';
  }
  
  // Manage blur overlay
  if (blurOverlay) {
    blurOverlay.style.display = (currentState.isOnBreak) ? 'block' : 'none';
  }
  
  // Manage break popup
  if (breakPopup) {
    breakPopup.style.display = (currentState.isOnBreak) ? 'flex' : 'none';
    
    const countdownText = breakPopup.querySelector('.eye-break-countdown-text');
    if (countdownText) {
      countdownText.textContent = currentState.breakCountdown;
    }
    
    // Update countdown circle
    const countdownCircle = breakPopup.querySelector('.eye-break-countdown-circle-fg');
    if (countdownCircle) {
      const progress = currentState.breakCountdown / 20;
      const circumference = 2 * Math.PI * 45;
      countdownCircle.style.strokeDashoffset = circumference * (1 - progress);
    }
  }
  
  // Manage warning popup
  if (warningPopup) {
    warningPopup.style.display = (currentState.isOnWarning) ? 'flex' : 'none';
    
    const countdown = warningPopup.querySelector('.eye-break-warning-countdown');
    if (countdown) {
      countdown.textContent = currentState.warningCountdown;
    }
  }
}

// Update state based on message from background
function updateState(newState) {
  currentState = { ...currentState, ...newState };
  updateUI();
}

// Format seconds into MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'stateUpdate' && message.state) {
    updateState(message.state);
  }
  return true;
});

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}