document.addEventListener('DOMContentLoaded', () => {
  const translucencyToggle = document.getElementById('translucency-toggle');
  const themeSelect = document.getElementById('theme-select'); // Get the select element
  const translucentElements = document.querySelectorAll('.header'); // Target only header for translucency

  // Function to apply theme classes to the body
  function applyTheme(theme, isHardReset = false) {
    const body = document.body;
    // Remove all theme-related classes first
    body.classList.remove('light-mode', 'dark-mode', 'amoled-dark-mode');

    // Apply the selected theme class
    if (theme === 'light') {
      body.classList.add('light-mode');
    } else if (theme === 'dark') {
      body.classList.add('dark-mode');
    } else if (theme === 'amoled-dark') {
      body.classList.add('amoled-dark-mode');
    } else { // 'system' or unknown
      // Check system preference for 'system' theme
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode'); // Default to dark if system is dark
      } else {
        body.classList.add('light-mode'); // Default to light if system is light
      }
    }

    // Update translucency based on current state and new theme
    applyTranslucency(translucencyToggle.checked); // Re-apply translucency to ensure header colors are correct

    if (isHardReset) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }

  // Function to apply translucency and handle AMOLED header interaction
  function applyTranslucency(isTranslucent, isHardReset = false) {
    translucentElements.forEach(el => {
      el.classList.toggle('translucent', isTranslucent);
      el.classList.toggle('no-translucent', !isTranslucent); // Use no-translucent

      // Ensure AMOLED header class is correctly applied/removed with translucency state
      if (document.body.classList.contains('amoled-dark-mode')) {
        // If AMOLED is active, the header should get AMOLED-specific styles
        el.classList.add('amoled-dark-header'); // This class is handled by CSS based on body.amoled-dark-mode
      } else {
        el.classList.remove('amoled-dark-header'); // Remove if not AMOLED
      }
    });

    if (isHardReset) {
      localStorage.removeItem('translucency');
    } else {
      localStorage.setItem('translucency', isTranslucent ? 'on' : 'off');
    }
  }
  
  // --- Initial Load ---

  // Load saved theme preference or default to 'system'
  const savedTheme = localStorage.getItem('theme');
  let initialTheme = savedTheme || 'system';
  themeSelect.value = initialTheme; // Set the select dropdown to the saved/default value
  applyTheme(initialTheme); // Apply the theme immediately

  // Load saved translucency preference
  const savedTranslucency = localStorage.getItem('translucency');
  let initialTranslucencyState = (savedTranslucency === 'on');
  translucencyToggle.checked = initialTranslucencyState;
  applyTranslucency(initialTranslucencyState); // Apply translucency immediately

  // --- Event Listeners ---

  // Theme select change listener
  themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    applyTheme(selectedTheme);
  });

  // Translucency toggle change listener
  translucencyToggle.addEventListener('change', () => {
    const enabled = translucencyToggle.checked;
    applyTranslucency(enabled);
  });
  
  // Settings modal reset event listener
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    settingsModal.addEventListener('resetSettings', (event) => {
      const { theme, translucency, hardReset } = event.detail; // Get theme from reset event
      
      // Reset theme
      themeSelect.value = theme; // Set dropdown to system
      applyTheme(theme, hardReset); // Apply system theme

      // Reset translucency
      translucencyToggle.checked = translucency;
      applyTranslucency(translucency, hardReset);
    });
  }
});
