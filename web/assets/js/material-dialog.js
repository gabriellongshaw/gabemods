const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeButton = settingsModal ? settingsModal.querySelector('#close-settings') : null;
const resetButton = settingsModal ? settingsModal.querySelector('#reset-settings-button') : null;
const backdrop = document.getElementById('backdrop');

function _openDialogInternal() {
  if (!settingsModal) {
    console.error("settingsModal element not found in material-dialog.js");
    return;
  }
  if (!backdrop) {
    console.error("backdrop element not found in material-dialog.js");
    return;
  }
  
  backdrop.classList.remove('hidden');
  requestAnimationFrame(() => {
    backdrop.classList.add('show');
  });
  
  if (!settingsModal.open) {
    settingsModal.showModal();
    requestAnimationFrame(() => {
      settingsModal.classList.add('open');
      settingsModal.classList.remove('closing');
    });
  }
}

function _closeDialogInternal() {
  if (!settingsModal) {
    console.error("settingsModal element not found in material-dialog.js");
    return;
  }
  if (!backdrop) {
    console.error("backdrop element not found in material-dialog.js");
    return;
  }
  
  settingsModal.classList.remove('open');
  settingsModal.classList.add('closing');
  backdrop.classList.remove('show');
  
  setTimeout(() => {
    settingsModal.close();
    backdrop.classList.add('hidden');
    settingsModal.classList.remove('closing');
  }, 250);
}

export function openDialogAsync() {
  return new Promise(resolve => {
    _openDialogInternal();
    const onOpenTransitionEnd = (event) => {
      if (event.target === settingsModal && (event.propertyName === 'opacity' || event.propertyName === 'transform') && settingsModal.classList.contains('open')) {
        settingsModal.removeEventListener('transitionend', onOpenTransitionEnd);
        resolve();
      }
    };
    settingsModal.addEventListener('transitionend', onOpenTransitionEnd);
  });
}

export function closeDialogAsync() {
  return new Promise(resolve => {
    _closeDialogInternal();
    setTimeout(() => {
      resolve();
    }, 250);
  });
}

if (settingsButton) {
  settingsButton.addEventListener('click', _openDialogInternal);
} else {
  console.warn("settingsButton element not found in material-dialog.js. Dialog may not be openable.");
}

if (closeButton) {
  closeButton.addEventListener('click', _closeDialogInternal);
} else {
  console.warn("closeButton element not found in material-dialog.js. Dialog may not be closeable from inside.");
}

if (resetButton) {
  resetButton.addEventListener('click', () => {
    
    const resetEvent = new CustomEvent('resetSettings', {
      detail: {
        theme: 'system',
        font: 'system',
        translucency: false,
        cardTransparency: false,
        backgroundImage: '',
        hardReset: true
      }
    });
    
    settingsModal.dispatchEvent(resetEvent);
  });
} else {
  console.warn("resetButton element not found in material-dialog.js. Reset functionality will not work.");
}

if (settingsModal) {
  settingsModal.addEventListener('click', e => {
    if (e.target === settingsModal) {
      _closeDialogInternal();
    }
  });
  
  settingsModal.addEventListener('cancel', e => {
    e.preventDefault();
    _closeDialogInternal();
  });
} else {
  console.warn("settingsModal element not found in material-dialog.js. Dialog interactions may not work.");
}

document.addEventListener('DOMContentLoaded', () => {
    const infoButton = document.getElementById('info-card-transparency');
    const infoDialog = document.getElementById('info-dialog');
    const closeInfoDialogButton = document.getElementById('close-info-dialog');

    if (infoButton && infoDialog && closeInfoDialogButton) {
        infoButton.addEventListener('click', () => {
            infoDialog.classList.add('show');
            closeInfoInfoDialogButton.focus();
        });

        closeInfoDialogButton.addEventListener('click', () => {
            infoDialog.classList.remove('show');
            infoButton.focus();
        });

        infoDialog.addEventListener('click', (event) => {
            if (event.target === infoDialog) {
                infoDialog.classList.remove('show');
                infoButton.focus();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && infoDialog.classList.contains('show')) {
                infoDialog.classList.remove('show');
                infoButton.focus();
            }
        });
    }
});
