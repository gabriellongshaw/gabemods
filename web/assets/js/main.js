document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const contentFadeOverlay = document.getElementById('content-fade-overlay');

    let menuOpen = false;

    gsap.set(menuToggle.children, { y: 0, x: 0, xPercent: 0, rotate: 0, opacity: 1, transformOrigin: '50% 50%' });
    gsap.set(sideMenu, { clipPath: 'inset(0% 100% 0% 0%)', visibility: 'hidden' });
    gsap.set(overlay, { opacity: 0, visibility: 'hidden' });

    const openMenu = () => {
        if (gsap.isTweening(sideMenu) || gsap.isTweening(overlay)) return;

        menuOpen = true;
        document.body.style.overflow = 'hidden';

        gsap.to(menuToggle.children[0], { duration: 0.1, y: 6.5, rotate: 45, transformOrigin: '50% 50%', ease: 'power3.out' });
        gsap.to(menuToggle.children[1], { duration: 0.1, xPercent: -50, opacity: 0, transformOrigin: '50% 50%', ease: 'power3.out' });
        gsap.to(menuToggle.children[2], { duration: 0.1, y: -6.5, rotate: -45, transformOrigin: '50% 50%', ease: 'power3.out' });

        gsap.to(sideMenu, {
            duration: 0.35,
            clipPath: 'inset(0% 0% 0% 0%)',
            visibility: 'visible',
            ease: 'power3.out'
        });

        gsap.to(overlay, {
            duration: 0.35,
            opacity: 1,
            visibility: 'visible',
            ease: 'power3.out'
        });

        menuToggle.classList.add('open');
        overlay.classList.add('show');
    };

    const closeMenu = () => {
        if (gsap.isTweening(sideMenu) || gsap.isTweening(overlay)) return;

        menuOpen = false;
        document.body.style.overflow = '';

        gsap.to(menuToggle.children[0], { duration: 0.1, y: 0, rotate: 0, ease: 'power3.out' });
        gsap.to(menuToggle.children[1], { duration: 0.1, xPercent: 0, opacity: 1, ease: 'power3.out' });
        gsap.to(menuToggle.children[2], { duration: 0.1, y: 0, rotate: 0, ease: 'power3.out' });

        gsap.to(sideMenu, {
            duration: 0.35,
            clipPath: 'inset(0% 100% 0% 0%)',
            ease: 'power3.out',
            onComplete: () => {
                sideMenu.style.visibility = 'hidden';
            }
        });

        gsap.to(overlay, {
            duration: 0.35,
            opacity: 0,
            visibility: 'hidden',
            ease: 'power3.out'
        });

        menuToggle.classList.remove('open');
        overlay.classList.remove('show');
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

        const isCurrentPage = (currentPath === "" || currentPath === "/index.html")
            ? (linkPath === "index.html" || linkPath === "")
            : (currentPath.includes(linkPath) && linkPath !== "");

        if (isCurrentPage) {
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
