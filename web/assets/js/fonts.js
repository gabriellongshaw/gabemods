/* 2025 Gabe Mods (https://gabemods.github.io/about), All Rights Reserved. 
 */

import { openDialogAsync, closeDialogAsync } from './material-dialog.js';

document.addEventListener('DOMContentLoaded', () => {
  const settingsModal = document.getElementById('settings-modal');
  const fontSelect = document.getElementById('font-select');
  const contentFadeOverlay = document.getElementById('content-fade-overlay');
  
  let initialLoad = true;
  
  async function applyFont(fontName, isHardReset = false) {
    if (!initialLoad) {
      const wasModalOpen = settingsModal.open;
      
      if (wasModalOpen) {
        await closeDialogAsync();
      }
      
      contentFadeOverlay.classList.add('fade-active');
      
      await new Promise(resolve => {
        const onOverlayFadeIn = (event) => {
          if (event.propertyName === 'opacity' && contentFadeOverlay.classList.contains('fade-active')) {
            contentFadeOverlay.removeEventListener('transitionend', onOverlayFadeIn);
            resolve();
          }
        };
        contentFadeOverlay.addEventListener('transitionend', onOverlayFadeIn, { once: true });
      });
      
      document.body.classList.forEach(className => {
        if (className.startsWith('font-')) {
          document.body.classList.remove(className);
        }
      });
      
      if (fontName === 'OneUISans') {
        document.body.classList.add('font-OneUISans');
      } else if (fontName === 'system') {
        document.body.classList.add('font-system');
      } else if (fontName === 'Roboto') {
        document.body.classList.add('font-Roboto');
      } else if (fontName === 'Open Sans') {
        document.body.classList.add('font-Open-Sans');
      }
      
      if (isHardReset) {
        localStorage.removeItem('selectedFont');
        console.log("Removed 'selectedFont' from localStorage.");
      } else {
        localStorage.setItem('selectedFont', fontName);
        console.log(`Saved font '${fontName}' to localStorage.`);
      }
      
      contentFadeOverlay.classList.remove('fade-active');
      
      await new Promise(resolve => {
        const onOverlayFadeOut = (event) => {
          if (event.propertyName === 'opacity' && !contentFadeOverlay.classList.contains('fade-active')) {
            contentFadeOverlay.removeEventListener('transitionend', onOverlayFadeOut);
            resolve();
          }
        };
        contentFadeOverlay.addEventListener('transitionend', onOverlayFadeOut, { once: true });
      });
      
      if (wasModalOpen) {
        await openDialogAsync();
      }
      
    } else {
      
      document.body.classList.forEach(className => {
        if (className.startsWith('font-')) {
          document.body.classList.remove(className);
        }
      });
      
      if (fontName === 'OneUISans') {
        document.body.classList.add('font-OneUISans');
      } else if (fontName === 'system') {
        document.body.classList.add('font-system');
      } else if (fontName === 'Roboto') {
        document.body.classList.add('font-Roboto');
      } else if (fontName === 'Open Sans') {
        document.body.classList.add('font-Open-Sans');
      }
      
      localStorage.setItem('selectedFont', fontName);
    }
  }
  
  const savedFont = localStorage.getItem('selectedFont');
  const defaultFont = 'system';
  
  if (savedFont) {
    fontSelect.value = savedFont;
    if (fontSelect.value !== savedFont) {
      fontSelect.value = defaultFont;
      applyFont(defaultFont);
    } else {
      applyFont(savedFont);
    }
  } else {
    fontSelect.value = defaultFont;
    applyFont(defaultFont);
  }
  
  initialLoad = false;
  
  fontSelect.addEventListener('change', (event) => {
    applyFont(event.target.value);
  });
  
  const settingsModalElement = document.getElementById('settings-modal');
  if (settingsModalElement) {
    settingsModalElement.addEventListener('resetSettings', (event) => {
      console.log("fonts.js: Resetting font based on custom event:", event.detail);
      const { font, hardReset } = event.detail;
      
      fontSelect.value = font;
      applyFont(font, hardReset);
    });
  } else {
    console.warn("settingsModal not found in fonts.js. Cannot listen for reset event.");
  }
});
