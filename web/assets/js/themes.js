document.addEventListener('DOMContentLoaded', () => {
  const translucencyToggle = document.getElementById('translucency-toggle');
  const themeSelect = document.getElementById('theme-select');
  const translucentElements = document.querySelectorAll('.header');

  function applyTheme(theme, isHardReset = false) {
    const body = document.body;

    body.classList.remove('light-mode', 'dark-mode', 'amoled-dark-mode');

    let currentTheme = theme;

    if (theme === 'system') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
      } else {
        currentTheme = 'light';
      }
    }

    if (currentTheme === 'light') {
      body.classList.add('light-mode');
    } else if (currentTheme === 'dark') {
      body.classList.add('dark-mode');
    } else if (currentTheme === 'amoled-dark') {
      body.classList.add('amoled-dark-mode');
    }

    applyTranslucency(translucencyToggle.checked); // Re-apply translucency based on current state and new theme

    if (isHardReset) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme); // Store the user's selected preference ('system', 'light', 'dark', 'amoled-dark')
    }
  }

  function applyTranslucency(isTranslucent, isHardReset = false) {
    translucentElements.forEach(el => {
      el.classList.toggle('translucent', isTranslucent);
      el.classList.toggle('no-translucent', !isTranslucent);
      // The amoled-dark-header class is no longer needed here.
      // Its styling should be handled purely by CSS rules based on body.amoled-dark-mode.
    });

    if (isHardReset) {
      localStorage.removeItem('translucency');
    } else {
      localStorage.setItem('translucency', isTranslucent ? 'on' : 'off');
    }
  }

  // Initial load
  const savedTheme = localStorage.getItem('theme');
  let initialTheme = savedTheme || 'system';
  themeSelect.value = initialTheme;
  applyTheme(initialTheme);

  const savedTranslucency = localStorage.getItem('translucency');
  let initialTranslucencyState = (savedTranslucency === 'on');
  translucencyToggle.checked = initialTranslucencyState;
  applyTranslucency(initialTranslucencyState);

  // Event Listeners
  themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    applyTheme(selectedTheme);
  });

  translucencyToggle.addEventListener('change', () => {
    const enabled = translucencyToggle.checked;
    applyTranslucency(enabled);
  });

  // Listen for system theme changes if 'system' is selected
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (themeSelect.value === 'system') {
        applyTheme('system'); // Re-apply theme to pick up system change
      }
    });
  }

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
