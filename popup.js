// DOM elements
const timeLeftDisplay = document.querySelector('.time-left');
const progressCircle = document.querySelector('.progress-circle-fg');
const toggleButton = document.getElementById('toggle-timer');
const toggleButtonText = toggleButton.querySelector('.button-text');
const statusText = document.querySelector('.status-text');
const workDurationInput = document.getElementById('work-duration');
const increaseWorkButton = document.getElementById('increase-work');
const decreaseWorkButton = document.getElementById('decrease-work');

// State variables
let currentState = {
  isRunning: true,
  workMinutes: 20,
  workSecondsLeft: 20 * 60,
  isOnBreak: false,
  isOnWarning: false
};

// Initialize
function initialize() {
  // Get current state from background
  chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
    if (response) {
      updateState(response);
    }
  });
  
  // Set up event listeners
  toggleButton.addEventListener('click', toggleTimer);
  increaseWorkButton.addEventListener('click', () => adjustWorkDuration(1));
  decreaseWorkButton.addEventListener('click', () => adjustWorkDuration(-1));
}

// Update UI based on state
function updateUI() {
  // Update time display
  timeLeftDisplay.textContent = formatTime(currentState.workSecondsLeft);
  
  // Update progress circle
  const totalSeconds = currentState.workMinutes * 60;
  const progress = currentState.workSecondsLeft / totalSeconds;
  const circumference = 2 * Math.PI * 45;
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = circumference * (1 - progress);
  
  // Update play/pause button
  toggleButton.classList.toggle('paused', !currentState.isRunning);
  toggleButtonText.textContent = currentState.isRunning ? 'Pause' : 'Resume';
  
  // Update status text
  if (currentState.isOnBreak) {
    statusText.textContent = 'On break:';
  } else if (currentState.isOnWarning) {
    statusText.textContent = 'Break starting soon:';
  } else {
    statusText.textContent = 'Next break in:';
  }
  
  // Update work duration input
  workDurationInput.value = currentState.workMinutes;
}

// Format seconds into MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Toggle timer running state
function toggleTimer() {
  chrome.runtime.sendMessage({ action: 'toggleTimer' }, (response) => {
    if (response) {
      updateState(response);
    }
  });
}

// Adjust work duration
function adjustWorkDuration(change) {
  let newDuration = currentState.workMinutes + change;
  
  // Enforce min and max values
  if (newDuration < 1) newDuration = 1;
  if (newDuration > 60) newDuration = 60;
  
  if (newDuration !== currentState.workMinutes) {
    chrome.runtime.sendMessage({ 
      action: 'setWorkMinutes', 
      minutes: newDuration 
    }, (response) => {
      if (response) {
        updateState(response);
      }
    });
  }
}

// Update state based on message from background
function updateState(newState) {
  currentState = { ...currentState, ...newState };
  updateUI();
}

// Initialize when popup opens
document.addEventListener('DOMContentLoaded', initialize);