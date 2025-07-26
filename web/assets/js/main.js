document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const contentFadeOverlay = document.getElementById('content-fade-overlay');
    
    const openMenu = () => {
        sideMenu.classList.add('open');
        menuToggle.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    
    const closeMenu = () => {
        sideMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    };
    
    menuToggle.addEventListener('click', () => {
        if (sideMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    overlay.addEventListener('click', () => {
        if (sideMenu.classList.contains('open')) {
            closeMenu();
        }
    });
    
    sideMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const menuLinks = sideMenu.querySelectorAll('a');
    
    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href').replace(/\/$/, "");
        
        if (currentPath === "" || currentPath === "/index.html") {
            if (linkPath === "index.html" || linkPath === "") {
                link.parentElement.classList.add('current-page');
            }
        } else if (currentPath.includes(linkPath) && linkPath !== "") {
            link.parentElement.classList.add('current-page');
        } else {
            link.parentElement.classList.remove('current-page');
        }
    });
    
    window.addEventListener('beforeunload', () => {
        contentFadeOverlay.classList.add('fade-active');
    });
    
    window.addEventListener('load', () => {
        contentFadeOverlay.classList.remove('fade-active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const appCreditsToggle = document.getElementById('app-credits-toggle');
    const appCreditsContent = document.getElementById('app-credits-content');
    
    const websiteCreditsToggle = document.getElementById('website-credits-toggle');
    const websiteCreditsContent = document.getElementById('website-credits-content');
    
    function setupDropdown(toggleButton, contentArea) {
        toggleButton.addEventListener('click', () => {
            
            toggleButton.classList.toggle('open');
            const isOpen = toggleButton.classList.contains('open');
            
            if (isOpen) {
                contentArea.classList.add('open');
                
                contentArea.style.maxHeight = 'auto';
                const scrollHeight = contentArea.scrollHeight;
                contentArea.style.maxHeight = '0px';
                
                requestAnimationFrame(() => {
                    contentArea.style.maxHeight = `${scrollHeight}px`;
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
    }
    
    setupDropdown(appCreditsToggle, appCreditsContent);
    setupDropdown(websiteCreditsToggle, websiteCreditsContent);
});