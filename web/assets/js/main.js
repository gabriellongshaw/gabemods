const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  sideMenu.classList.toggle('open');
});
