document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const contentFadeOverlay = document.getElementById('content-fade-overlay');

    // Function to open the menu
    const openMenu = () => {
        sideMenu.classList.add('open');
        menuToggle.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling body
    };

    // Function to close the menu
    const closeMenu = () => {
        sideMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Event listener for menu toggle button
    menuToggle.addEventListener('click', () => {
        if (sideMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Event listener for overlay to close menu
    overlay.addEventListener('click', () => {
        if (sideMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // Close menu when a link inside is clicked
    sideMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Set 'current-page' class based on the current URL
    const currentPath = window.location.pathname.replace(/\/$/, ""); // Remove trailing slash if present
    const menuLinks = sideMenu.querySelectorAll('a');

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href').replace(/\/$/, "");

        // Handle index.html and root path appropriately
        if (currentPath === "" || currentPath === "/index.html") {
            if (linkPath === "index.html" || linkPath === "") {
                link.parentElement.classList.add('current-page');
            }
        } else if (currentPath.includes(linkPath) && linkPath !== "") {
            link.parentElement.classList.add('current-page');
        } else {
            link.parentElement.classList.remove('current-page'); // Ensure other links don't have it
        }
    });


    // Fade overlay for page transitions (if still in use or planned)
    window.addEventListener('beforeunload', () => {
        contentFadeOverlay.classList.add('fade-active');
    });

    window.addEventListener('load', () => {
        contentFadeOverlay.classList.remove('fade-active');
    });
});

