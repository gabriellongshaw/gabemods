document.addEventListener('DOMContentLoaded', () => {
  const translucencyToggle = document.getElementById('translucency-toggle');
  const translucentElements = document.querySelectorAll('.translucent, .header');

  function applyTranslucency(isTranslucent, isHardReset = false) {
    translucentElements.forEach(el => {
      el.classList.toggle('translucent', isTranslucent);
      el.classList.toggle('no-translucency', !isTranslucent);
    });
    
    if (isHardReset) {
      localStorage.removeItem('translucency');
    } else {
      localStorage.setItem('translucency', isTranslucent ? 'on' : 'off');
    }
  }
  
  // Initial Load for Translucency
  const savedTranslucency = localStorage.getItem('translucency');
  let initialTranslucencyState = false; // Default to off
  if (savedTranslucency === 'on') {
    initialTranslucencyState = true;
  }
  translucencyToggle.checked = initialTranslucencyState;
  applyTranslucency(initialTranslucencyState);

  // Event Listener for Translucency Toggle
  translucencyToggle.addEventListener('change', () => {
    const enabled = translucencyToggle.checked;
    applyTranslucency(enabled);
  });
  
  // Settings Modal Reset Listener (for translucency only)
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    settingsModal.addEventListener('resetSettings', (event) => {
      const { translucency, hardReset } = event.detail; // Only destructure what's needed
      
      translucencyToggle.checked = translucency;
      applyTranslucency(translucency, hardReset);
    });
  }
});
