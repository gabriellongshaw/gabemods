// --- Corrected applyTheme function ---

function applyTheme(theme, isHardReset = false) {
    const body = document.body;

    // Remove all potential theme classes (ensure 'dark-mode' and 'light-mode' are removed too)
    body.classList.remove('light-mode', 'dark-mode', 'amoled-dark-mode', 'light', 'dark', 'amoled-dark');

    let currentTheme = theme;

    if (theme === 'system') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
      } else {
        currentTheme = 'light';
      }
    }

    // *** FIX APPLIED HERE ***
    if (currentTheme === 'light') {
      // In CSS, lack of a dark class implies light mode, but we can add 'light' for consistency
      body.classList.add('light'); 
    } else if (currentTheme === 'dark') {
      // **CSS USES 'dark' - JS MUST USE 'dark' **
      body.classList.add('dark');
    } else if (currentTheme === 'amoled-dark') {
      // **CSS USES 'amoled-dark-mode' - JS must use this exact string**
      body.classList.add('amoled-dark-mode');
    }

    applyTranslucency(translucencyToggle.checked);

    if (isHardReset) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
}

// --- FULL, CORRECTED JS FILE ---
document.addEventListener('DOMContentLoaded', () => {
  const translucencyToggle = document.getElementById('translucency-toggle');
  const themeSelect = document.getElementById('theme-select');
  const translucentElements = document.querySelectorAll('.header');

  function applyTheme(theme, isHardReset = false) {
    const body = document.body;

    // Ensure all variants (old and new) are removed before applying the correct one
    body.classList.remove('light-mode', 'dark-mode', 'amoled-dark-mode', 'light', 'dark');

    let currentTheme = theme;

    if (theme === 'system') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
      } else {
        currentTheme = 'light';
      }
    }

    if (currentTheme === 'light') {
      // No specific class needed for light mode, but we can add 'light' if you want
      // body.classList.add('light');
    } else if (currentTheme === 'dark') {
      // *** THE FIX: Use 'dark' to match body.dark in CSS ***
      body.classList.add('dark');
    } else if (currentTheme === 'amoled-dark') {
      // *** THE FIX: Use 'amoled-dark-mode' to match body.amoled-dark-mode in CSS ***
      body.classList.add('amoled-dark-mode');
    }

    applyTranslucency(translucencyToggle.checked); // Re-apply translucency based on current state and new theme

    if (isHardReset) {
      localStorage.removeItem('theme');
    } else {
      // Store the user's selected preference ('system', 'light', 'dark', 'amoled-dark')
      localStorage.setItem('theme', theme); 
    }
  }

  function applyTranslucency(isTranslucent, isHardReset = false) {
    translucentElements.forEach(el => {
      el.classList.toggle('translucent', isTranslucent);
      el.classList.toggle('no-translucent', !isTranslucent);
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
  
  // Ensure the theme select element exists before trying to access its value property
  if (themeSelect) {
      themeSelect.value = initialTheme;
  }
  applyTheme(initialTheme);

  const savedTranslucency = localStorage.getItem('translucency');
  let initialTranslucencyState = (savedTranslucency === 'on');
  
  // Ensure the translucency toggle element exists before trying to access its checked property
  if (translucencyToggle) {
    translucencyToggle.checked = initialTranslucencyState;
  }
  applyTranslucency(initialTranslucencyState);

  // Event Listeners
  if (themeSelect) {
    themeSelect.addEventListener('change', () => {
      const selectedTheme = themeSelect.value;
      applyTheme(selectedTheme);
    });
  }

  if (translucencyToggle) {
    translucencyToggle.addEventListener('change', () => {
      const enabled = translucencyToggle.checked;
      applyTranslucency(enabled);
    });
  }

  // Listen for system theme changes if 'system' is selected
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (themeSelect && themeSelect.value === 'system') {
        applyTheme('system'); // Re-apply theme to pick up system change
      }
    });
  }

  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    settingsModal.addEventListener('resetSettings', (event) => {
      const { theme, translucency, hardReset } = event.detail;

      if (themeSelect) {
        themeSelect.value = theme;
      }
      applyTheme(theme, hardReset);

      if (translucencyToggle) {
        translucencyToggle.checked = translucency;
      }
      applyTranslucency(translucency, hardReset);
    });
  }
});
