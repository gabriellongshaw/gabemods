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