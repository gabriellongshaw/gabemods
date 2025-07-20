// --- Menu Toggle Logic ---
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

// --- Active Menu Link Highlighting Logic ---
const sideMenuLinks = document.querySelectorAll('.side-menu ul li a');
const currentPath = window.location.pathname.split('/').pop(); // Gets 'index.html', 'mods/', 'download/' etc.

sideMenuLinks.forEach(link => {
    const linkHref = link.getAttribute('href').split('/').pop(); // Gets 'index.html', 'mods', 'download'

    // Determine if the link's href matches the current page's path
    // Special handling for the home page (index.html or empty string for root)
    if (currentPath === '' && linkHref === 'index.html') {
        link.closest('li').classList.add('active');
    } else if (linkHref === currentPath) {
        link.closest('li').classList.add('active');
    }
});
