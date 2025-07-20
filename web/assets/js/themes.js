/* 2025 Gabe Mods (https://gabemods.github.io/about), All Rights Reserved.
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('theme-select');
  const metaColor = document.querySelector('meta[name="theme-color"]');
  const translucencyToggle = document.getElementById('translucency-toggle');
  const cardTransparencyToggle = document.getElementById('card-transparency-toggle'); // New toggle
  const translucentElements = document.querySelectorAll('.translucent, .main-header');

  const downloadModal = document.getElementById('download-modal');
  
  const chooseBackgroundButton = document.getElementById('choose-background-button');
  const clearBackgroundButton = document.getElementById('clear-background-button');
  const imageUploadInput = document.getElementById('image-upload-input');
  const currentBackgroundStatus = document.getElementById('current-background-status');
  const bodyElement = document.body;
  
  function updateTheme(mode, isHardReset = false) {
    document.body.classList.remove('light', 'dark');
    
    let finalThemeForBody = mode;
    let metaThemeColor = '#ffffff';
    
    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      finalThemeForBody = prefersDark ? 'dark' : 'light';
      metaThemeColor = prefersDark ? '#121212' : '#ffffff';
    } else if (mode === 'dark') {
      finalThemeForBody = 'dark';
      metaThemeColor = '#121212';
    } else {
      finalThemeForBody = 'light';
      metaThemeColor = '#ffffff';
    }
    
    document.body.classList.add(finalThemeForBody);
    if (metaColor) {
      metaColor.setAttribute('content', metaThemeColor);
    }
    
    if (isHardReset) {
      localStorage.removeItem('preferred-theme');
    } else {
      localStorage.setItem('preferred-theme', mode);
    }
  }
  
  function watchSystemTheme() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
      if (localStorage.getItem('preferred-theme') === 'system' || localStorage.getItem('preferred-theme') === null) {
        updateTheme('system');
      }
    });
  }
  
  function applyTranslucency(isTranslucent, isHardReset = false) {
    translucentElements.forEach(el => {
      el.classList.toggle('translucent', isTranslucent);
      el.classList.toggle('no-translucency', !isTranslucent);
    });

    applyDownloadDialogTranslucency(isTranslucent, isHardReset);
    
    if (isHardReset) {
      localStorage.removeItem('translucency');
    } else {
      localStorage.setItem('translucency', isTranslucent ? 'on' : 'off');
    }
  }

  function applyDownloadDialogTranslucency(isTranslucent, isHardReset = false) {
      if (downloadModal) {
          downloadModal.classList.toggle('opaque', !isTranslucent);
      }

      if (isHardReset) {
          localStorage.removeItem('download-dialog-opaque');
      } else {
          localStorage.setItem('download-dialog-opaque', !isTranslucent ? 'on' : 'off');
      }
  }

  function applyCardTransparency(isTransparent, isHardReset = false) {
    const cards = document.querySelectorAll('.card-container'); // Changed to .card-container
    cards.forEach(card => {
      card.classList.toggle('card-transparent', isTransparent);
    });

    if (isHardReset) {
      localStorage.removeItem('card-transparency');
    } else {
      localStorage.setItem('card-transparency', isTransparent ? 'on' : 'off');
    }
  }
  
  function applyBackgroundImage(imageUrlOrDataUrl, isHardReset = false) {
    if (imageUrlOrDataUrl) {
      bodyElement.style.backgroundImage = `url('${imageUrlOrDataUrl}')`;
      bodyElement.style.backgroundSize = 'cover';
      bodyElement.style.backgroundRepeat = 'no-repeat';
      bodyElement.style.backgroundPosition = 'center center';
      bodyElement.classList.add('custom-background');
      
      currentBackgroundStatus.textContent = localStorage.getItem('background-image-name') || 'Custom image applied';
    } else {
      bodyElement.style.backgroundImage = 'none';
      bodyElement.style.backgroundSize = '';
      bodyElement.style.backgroundRepeat = '';
      bodyElement.style.backgroundPosition = '';
      bodyElement.classList.remove('custom-background');
      currentBackgroundStatus.textContent = 'None selected';
    }
    
    if (isHardReset) {
      localStorage.removeItem('background-image');
      localStorage.removeItem('background-image-name');
    } else {
      
      localStorage.setItem('background-image', imageUrlOrDataUrl);
      
      if (imageUrlOrDataUrl && !localStorage.getItem('background-image-name')) {
        
        currentBackgroundStatus.textContent = 'Custom image applied';
      }
    }
  }
  
  // --- Initial Load ---

  const storedTheme = localStorage.getItem('preferred-theme');
  if (storedTheme) {
    themeSelect.value = storedTheme;
    updateTheme(storedTheme);
  } else {
    themeSelect.value = 'system';
    updateTheme('system');
  }
  watchSystemTheme();
  
  const savedTranslucency = localStorage.getItem('translucency');
  if (savedTranslucency === 'off') {
    translucencyToggle.checked = false;
    applyTranslucency(false);
  } else {
    translucencyToggle.checked = true;
    applyTranslucency(true);
  }

  const savedCardTransparency = localStorage.getItem('card-transparency');
  if (savedCardTransparency === 'on') {
    cardTransparencyToggle.checked = true;
    applyCardTransparency(true);
  } else {
    cardTransparencyToggle.checked = false;
    applyCardTransparency(false);
  }

  const savedDownloadDialogOpaque = localStorage.getItem('download-dialog-opaque');
  if (savedDownloadDialogOpaque === 'on') {
      applyDownloadDialogTranslucency(false); 
  } else {
      applyDownloadDialogTranslucency(translucencyToggle.checked);
  }
  
  const savedBackgroundImage = localStorage.getItem('background-image');
  if (savedBackgroundImage !== null) {
    applyBackgroundImage(savedBackgroundImage);
  } else {
    applyBackgroundImage('');
  }
  
  // --- Event Listeners ---

  themeSelect.addEventListener('change', () => {
    const choice = themeSelect.value;
    updateTheme(choice);
  });
  
  translucencyToggle.addEventListener('change', () => {
    const enabled = translucencyToggle.checked;
    applyTranslucency(enabled);
  });

  cardTransparencyToggle.addEventListener('change', () => {
    const enabled = cardTransparencyToggle.checked;
    applyCardTransparency(enabled);
  });
  
  if (chooseBackgroundButton) {
    chooseBackgroundButton.addEventListener('click', () => {
      imageUploadInput.click();
    });
  }
  
  if (imageUploadInput) {
    imageUploadInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          applyBackgroundImage(e.target.result);
          localStorage.setItem('background-image-name', file.name);
          currentBackgroundStatus.textContent = file.name;
        };
        reader.readAsDataURL(file);
      }
      event.target.value = '';
    });
  }
  
  if (clearBackgroundButton) {
    clearBackgroundButton.addEventListener('click', () => {
      applyBackgroundImage('');
      localStorage.removeItem('background-image-name');
      currentBackgroundStatus.textContent = 'None selected';
    });
  }
  
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    settingsModal.addEventListener('resetSettings', (event) => {
      const { theme, font, translucency, cardTransparency, backgroundImage, hardReset } = event.detail;
      
      themeSelect.value = theme;
      updateTheme(theme, hardReset);
      
      translucencyToggle.checked = translucency;
      applyTranslucency(translucency, hardReset);
      
      cardTransparencyToggle.checked = cardTransparency;
      applyCardTransparency(cardTransparency, hardReset);

      applyBackgroundImage(backgroundImage, hardReset);
      
      if (hardReset) {
        localStorage.removeItem('background-image-name');
        currentBackgroundStatus.textContent = 'None selected';
      }
    });
  }
});
