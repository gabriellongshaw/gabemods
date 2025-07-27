document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const contentFadeOverlay = document.getElementById('content-fade-overlay');
    
    let menuOpen = false;
    
    sideMenu.style.display = 'block';
    const targetMenuWidth = sideMenu.offsetWidth;
    sideMenu.style.display = '';
    
    const menuTimeline = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: {
            duration: 0.3,
            ease: 'power3.out'
        },
        onStart: () => {
            
            sideMenu.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
        },
        onReverseComplete: () => {
            
            sideMenu.style.visibility = 'hidden';
            document.body.style.overflow = '';
        },
        
    });
    
    menuTimeline.to(sideMenu, {
        width: targetMenuWidth,
    });
    
    gsap.set(sideMenu, { width: 0, visibility: 'hidden' });
    
    const openMenu = () => {
        if (menuTimeline.isActive()) return;
        menuTimeline.play();
        menuToggle.classList.add('open');
        overlay.classList.add('show');
        menuOpen = true;
    };
    
    const closeMenu = () => {
        if (menuTimeline.isActive()) return;
        menuTimeline.reverse();
        menuToggle.classList.remove('open');
        overlay.classList.remove('show');
        menuOpen = false;
    };
    
    menuToggle.addEventListener('click', () => {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    overlay.addEventListener('click', () => {
        if (menuOpen) {
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