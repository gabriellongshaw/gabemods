const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  sideMenu.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  menuToggle.classList.remove('open');
  sideMenu.classList.remove('open');
  overlay.classList.remove('show');
});

// In your main.js or a similar script file
document.addEventListener('DOMContentLoaded', () => {
    const sideMenuLinks = document.querySelectorAll('.side-menu ul li a');
    const currentPath = window.location.pathname.split('/').pop(); // Gets 'index.html', 'mods/', 'download/' etc.

    sideMenuLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop(); // Gets 'index.html', 'mods', 'download'

        // Special handling for the home page (index.html or empty string for root)
        if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
            link.closest('li').classList.add('active');
        } else if (linkHref === 'mods' && currentPath === 'mods') {
            link.closest('li').classList.add('active');
        } else if (linkHref === 'download' && currentPath === 'download') {
            link.closest('li').classList.add('active');
        }
    });

    // Existing menu toggle logic (ensure this is present or add it)
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        sideMenu.classList.remove('open');
        overlay.classList.remove('show');
    });
});
