document.addEventListener('DOMContentLoaded', () => {
  const translucencyToggle = document.getElementById('translucency-toggle');
  const themeSelect = document.getElementById('theme-select');
  const translucentElements = document.querySelectorAll('.header');
  
  function applyTheme(theme, isHardReset = false) {
    const body = document.body;
    
    body.classList.remove('light-mode', 'dark-mode', 'amoled-dark-mode');
    
    if (theme === 'light') {
      body.classList.add('light-mode');
    } else if (theme === 'dark') {
      body.classList.add('dark-mode');
    } else if (theme === 'amoled-dark') {
      body.classList.add('amoled-dark-mode');
    } else {
      
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
      } else {
        body.classList.add('light-mode');
      }
    }
    
    applyTranslucency(translucencyToggle.checked);
    
    if (isHardReset) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }
  
  function applyTranslucency(isTranslucent, isHardReset = false) {
    translucentElements.forEach(el => {
      el.classList.toggle('translucent', isTranslucent);
      el.classList.toggle('no-translucent', !isTranslucent);
      
      if (document.body.classList.contains('amoled-dark-mode')) {
        
        el.classList.add('amoled-dark-header');
      } else {
        el.classList.remove('amoled-dark-header');
      }
    });
    
    if (isHardReset) {
      localStorage.removeItem('translucency');
    } else {
      localStorage.setItem('translucency', isTranslucent ? 'on' : 'off');
    }
  }
  
  const savedTheme = localStorage.getItem('theme');
  let initialTheme = savedTheme || 'system';
  themeSelect.value = initialTheme;
  applyTheme(initialTheme);
  
  const savedTranslucency = localStorage.getItem('translucency');
  let initialTranslucencyState = (savedTranslucency === 'on');
  translucencyToggle.checked = initialTranslucencyState;
  applyTranslucency(initialTranslucencyState);
  
  themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    applyTheme(selectedTheme);
  });
  
  translucencyToggle.addEventListener('change', () => {
    const enabled = translucencyToggle.checked;
    applyTranslucency(enabled);
  });
  
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    settingsModal.addEventListener('resetSettings', (event) => {
      const { theme, translucency, hardReset } = event.detail;
      
      themeSelect.value = theme;
      applyTheme(theme, hardReset);
      
      translucencyToggle.checked = translucency;
      applyTranslucency(translucency, hardReset);
    });
  }
});