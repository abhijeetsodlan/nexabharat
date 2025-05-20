// Constants
const DEFAULT_WORK_MINUTES = 20;
const DEFAULT_BREAK_SECONDS = 20;
const WARNING_SECONDS = 5;

// State variables
let state = {
  isRunning: true,
  workMinutes: DEFAULT_WORK_MINUTES,
  workSecondsLeft: DEFAULT_WORK_MINUTES * 60,
  isOnBreak: false,
  isOnWarning: false,
  breakCountdown: DEFAULT_BREAK_SECONDS,
  warningCountdown: WARNING_SECONDS
};

// Initialize state from storage
chrome.storage.local.get(['eyeBreakState'], (result) => {
  if (result.eyeBreakState) {
    state = { ...state, ...result.eyeBreakState };
    
    // If we're loading from storage and a break was in progress,
    // reset to the beginning of the work period for simplicity
    if (state.isOnBreak || state.isOnWarning) {
      state.isOnBreak = false;
      state.isOnWarning = false;
      state.workSecondsLeft = state.workMinutes * 60;
    }
  }
});

// Main timer function
function runTimer() {
  if (!state.isRunning) return;

  if (!state.isOnBreak && !state.isOnWarning) {
    // During work time
    state.workSecondsLeft--;

    if (state.workSecondsLeft <= 0) {
      // Work period is over, start warning
      state.isOnWarning = true;
      state.warningCountdown = WARNING_SECONDS;
      broadcastState();
    }
  } else if (state.isOnWarning) {
    // During warning
    state.warningCountdown--;

    if (state.warningCountdown <= 0) {
      // Warning is over, start break
      state.isOnWarning = false;
      state.isOnBreak = true;
      state.breakCountdown = DEFAULT_BREAK_SECONDS;
      broadcastState();
    }
  } else if (state.isOnBreak) {
    // During break
    state.breakCountdown--;

    if (state.breakCountdown <= 0) {
      // Break is over, restart work timer
      state.isOnBreak = false;
      state.workSecondsLeft = state.workMinutes * 60;
      broadcastState();
    }
  }

  // Save state and broadcast to all tabs
  saveState();
  broadcastState();
}

// Run timer every second
setInterval(runTimer, 1000);

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getState') {
    sendResponse(state);
  } else if (message.action === 'toggleTimer') {
    state.isRunning = !state.isRunning;
    broadcastState();
    saveState();
    sendResponse(state);
  } else if (message.action === 'setWorkMinutes') {
    state.workMinutes = parseInt(message.minutes);
    state.workSecondsLeft = state.workMinutes * 60;
    broadcastState();
    saveState();
    sendResponse(state);
  } else if (message.action === 'skipBreak') {
    if (state.isOnBreak || state.isOnWarning) {
      state.isOnBreak = false;
      state.isOnWarning = false;
      state.workSecondsLeft = state.workMinutes * 60;
      broadcastState();
      saveState();
    }
    sendResponse(state);
  }
  return true; // Keep the message channel open for async response
});

// Broadcast state to all tabs
function broadcastState() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, { 
        action: 'stateUpdate', 
        state: state 
      }).catch(() => {
        // Silently fail if a tab can't receive messages
      });
    });
  });
}

// Save state to storage
function saveState() {
  chrome.storage.local.set({
    eyeBreakState: state
  });
}

// When a new tab is created, send it the current state
chrome.tabs.onCreated.addListener((tab) => {
  // Wait a moment for the tab to initialize
  setTimeout(() => {
    chrome.tabs.sendMessage(tab.id, {
      action: 'stateUpdate',
      state: state
    }).catch(() => {
      // Silently fail if the tab can't receive messages yet
    });
  }, 1000);
});