document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('overlay');
  const contentFadeOverlay = document.getElementById('content-fade-overlay');
  
  let menuTween = null;
  
  gsap.set(menuToggle.children, { y: 0, x: 0, xPercent: 0, rotate: 0, opacity: 1, transformOrigin: '50% 50%' });
  gsap.set(sideMenu, { clipPath: 'inset(0% 100% 0% 0%)', visibility: 'hidden' });
  gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
  
  const createMenuTween = () => {
    return gsap.timeline({
        paused: true,
        onStart: function() {
          
          if (!this.reversed()) {
            sideMenu.style.visibility = 'visible';
            overlay.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
          }
        },
        onReverseComplete: () => {
          
          sideMenu.style.visibility = 'hidden';
          overlay.style.visibility = 'hidden';
          document.body.style.overflow = '';
        }
      })
      .to(sideMenu, {
        duration: 0.3,
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power2.inOut'
      }, 0)
      .to(overlay, {
        duration: 0.3,
        opacity: 1,
        ease: 'power2'
      }, 0);
  };
  
  menuTween = createMenuTween();
  
  const toggleMenuState = () => {
    const isOpen = menuToggle.classList.contains('open');
    
    gsap.killTweensOf(menuToggle.children);
    
    if (isOpen) {
      
      gsap.to(menuToggle.children[0], { duration: 0.15, y: 0, rotate: 0, ease: 'power2.out' });
      gsap.to(menuToggle.children[1], { duration: 0.15, xPercent: 0, opacity: 1, ease: 'power2.out' });
      gsap.to(menuToggle.children[2], { duration: 0.15, y: 0, rotate: 0, ease: 'power2.out' });
      
      menuToggle.classList.remove('open');
      menuTween.reverse();
    } else {
      
      const lineOffset = menuToggle.offsetHeight / 2 - menuToggle.children[0].offsetHeight / 2;
      gsap.to(menuToggle.children[0], { duration: 0.15, y: lineOffset, rotate: 45, ease: 'power2.out' });
      gsap.to(menuToggle.children[1], { duration: 0.15, xPercent: -50, opacity: 0, ease: 'power2.out' });
      gsap.to(menuToggle.children[2], { duration: 0.15, y: -lineOffset, rotate: -45, ease: 'power2.out' });
      
      menuToggle.classList.add('open');
      menuTween.play();
    }
  };
  
  menuToggle.addEventListener('click', toggleMenuState);
  overlay.addEventListener('click', toggleMenuState);
  
  sideMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle.classList.contains('open')) {
        toggleMenuState();
      }
    });
  });
  
  const currentPath = window.location.pathname.replace(/\/$/, "");
  const menuLinks = sideMenu.querySelectorAll('a');
  
  menuLinks.forEach(link => {
    const linkPath = link.getAttribute('href').replace(/\/$/, "");
    const isCurrentPage = (currentPath === "" || currentPath === "/index.html") ?
      (linkPath === "index.html" || linkPath === "") :
      (currentPath.includes(linkPath) && linkPath !== "");
    
    link.parentElement.classList.toggle('current-page', isCurrentPage);
  });
  
  window.addEventListener('beforeunload', () => {
    contentFadeOverlay.classList.add('fade-active');
  });
  
  window.addEventListener('load', () => {
    contentFadeOverlay.classList.remove('fade-active');
  });
  
  const setupDropdown = (toggleButton, contentArea) => {
    toggleButton.addEventListener('click', () => {
      const isOpen = toggleButton.classList.toggle('open');
      
      if (isOpen) {
        contentArea.classList.add('open');
        contentArea.style.maxHeight = '0px';
        contentArea.style.padding = '0 16px';
        
        requestAnimationFrame(() => {
          contentArea.style.maxHeight = `${contentArea.scrollHeight + 32}px`;
          contentArea.style.padding = '16px';
        });
        
        const transitionEndHandler = () => {
          if (contentArea.style.maxHeight !== '0px') {
            contentArea.style.maxHeight = 'auto';
          }
          contentArea.removeEventListener('transitionend', transitionEndHandler);
        };
        contentArea.addEventListener('transitionend', transitionEndHandler);
        
      } else {
        contentArea.style.maxHeight = `${contentArea.scrollHeight}px`;
        contentArea.style.padding = '16px';
        
        requestAnimationFrame(() => {
          contentArea.style.maxHeight = '0px';
          contentArea.style.padding = '0 16px';
          contentArea.classList.remove('open');
        });
      }
    });
  };
  
  setupDropdown(document.getElementById('app-credits-toggle'), document.getElementById('app-credits-content'));
  setupDropdown(document.getElementById('website-credits-toggle'), document.getElementById('website-credits-content'));
});