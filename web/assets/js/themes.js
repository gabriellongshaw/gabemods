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
  
  const savedTranslucency = localStorage.getItem('translucency');
  let initialTranslucencyState = (savedTranslucency === 'on');
  
  translucencyToggle.checked = initialTranslucencyState;
  applyTranslucency(initialTranslucencyState);
  
  translucencyToggle.addEventListener('change', () => {
    const enabled = translucencyToggle.checked;
    applyTranslucency(enabled);
  });
  
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    settingsModal.addEventListener('resetSettings', (event) => {
      const { translucency, hardReset } = event.detail;
      
      translucencyToggle.checked = translucency;
      applyTranslucency(translucency, hardReset);
    });
  }
});