/* 2025 Gabe Mods (https://gabemods.github.io/about), All Rights Reserved.
 */

document.addEventListener('DOMContentLoaded', () => {
  const downloadModal = document.getElementById('download-modal');
  const directDownloadButton = document.getElementById('direct-download-button');
  const telegramDownloadButton = document.getElementById('telegram-download-button');
  const closeDownloadModalButton = document.getElementById('close-download-modal');
  const cards = document.querySelectorAll('.card-container');
  const backdrop = document.getElementById('backdrop');
  
  function openDownloadModal(telegramUrl, directUrl) {
    if (!downloadModal || !backdrop) {
      console.error("Download modal or backdrop element not found.");
      return;
    }
    
    telegramDownloadButton.href = telegramUrl;
    directDownloadButton.href = directUrl;
    
    backdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
      backdrop.classList.add('show');
    });
    
    if (!downloadModal.open) {
      downloadModal.showModal();
      
      requestAnimationFrame(() => {
        downloadModal.classList.add('show');
        downloadModal.classList.remove('hide');
      });
    }
  }
  
  function closeDownloadModal() {
    if (!downloadModal || !backdrop) {
      console.error("Download modal or backdrop element not found.");
      return;
    }
    
    downloadModal.classList.remove('show');
    downloadModal.classList.add('hide');
    
    backdrop.classList.remove('show');
    
    setTimeout(() => {
      downloadModal.close();
      backdrop.classList.add('hidden');
      downloadModal.classList.remove('hide');
    }, 300);
  }
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const telegramUrl = card.dataset.telegramUrl;
      const directUrl = card.dataset.directUrl;
      
      if (telegramUrl || directUrl) {
        openDownloadModal(telegramUrl, directUrl);
      } else {
        console.warn('No download URLs specified for this card.', card);
      }
    });
  });
  
  if (closeDownloadModalButton) {
    closeDownloadModalButton.addEventListener('click', () => {
      closeDownloadModal();
    });
  }
  
  if (backdrop) {
    backdrop.addEventListener('click', e => {
      
      if (e.target === backdrop && downloadModal.hasAttribute('open')) {
        closeDownloadModal();
      }
    });
  }
  
  if (downloadModal) {
    downloadModal.addEventListener('cancel', e => {
      e.preventDefault();
      closeDownloadModal();
    });
  }
});