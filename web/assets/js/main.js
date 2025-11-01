document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('overlay');
  const contentFadeOverlay = document.getElementById('content-fade-overlay');
  const links = [
  { href: `${pathPrefix}`, text: 'Home' },
  { href: `${pathPrefix}mods/`, text: 'Mods' },
  { href: `${pathPrefix}download/`, text: 'Download' },
];
  
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

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

function openProjectModal(e) {

    e.preventDefault(); 

    if (e.target.closest('a') || e.target.closest('.button')) return;

    const card = e.currentTarget;
    const modal = document.getElementById("project-modal");
    if (!modal) return;

    const modalLogoLight = modal.querySelector(".modal-logo .logo-light");
    const modalLogoDark = modal.querySelector(".modal-logo .logo-dark");

    const modalTitle = modal.querySelector(".modal-title");
    const modalDesc = modal.querySelector(".modal-description");
    const modalWebsite = modal.querySelector(".modal-website");
    const modalGithub = modal.querySelector(".modal-github");

    let lightLogoPath = card.dataset.logo;
    let darkLogoPath = card.dataset.logoDark;

    if (!lightLogoPath) {
        const cardImg = card.querySelector(".project-logo-wrapper img:not(.logo-dark)");
        if (cardImg) {
            lightLogoPath = cardImg.src;
            darkLogoPath = darkLogoPath || lightLogoPath; 
        } else {
            lightLogoPath = "";
            darkLogoPath = "";
        }
    } else {
        darkLogoPath = darkLogoPath || lightLogoPath;
    }

    const title = card.dataset.name || (card.querySelector("h3") ? card.querySelector("h3").innerText : "");
    const desc = card.dataset.description || (card.querySelector(".project-description") ? card.querySelector(".project-description").innerText : "");
    const websiteLink = card.dataset.website || null;
    const githubLink = card.dataset.github || null;
    const isDiscontinued = card.classList.contains("project-discontinued");

    if (modalLogoLight) {
        modalLogoLight.src = lightLogoPath;
        modalLogoLight.alt = title + ' Logo Light';
    }
    if (modalLogoDark) {
        modalLogoDark.src = darkLogoPath;
        modalLogoDark.alt = title + ' Logo Dark';
    }

    if (modalTitle) modalTitle.innerText = title;
    if (modalDesc) modalDesc.innerText = desc;

    if (modalWebsite) {
        if (websiteLink) {
            modalWebsite.style.display = "flex";
            modalWebsite.href = websiteLink;
            modalWebsite.textContent = isDiscontinued ? "Archived Code" : "Open Website";
            if (isDiscontinued) {
                modalWebsite.classList.add('button-disabled');
                modalWebsite.removeAttribute('target'); 
            } else {
                modalWebsite.classList.remove('button-disabled');
                modalWebsite.setAttribute('target', '_blank');
            }
        } else {
            modalWebsite.style.display = "none";
        }
    }

    if (modalGithub) {
        if (githubLink) {
            modalGithub.style.display = "flex";
            modalGithub.href = githubLink;
            modalGithub.textContent = "Open GitHub";
            modalGithub.setAttribute('target', '_blank');
        } else {
            modalGithub.style.display = "none";
        }
    }

    modal.classList.add("active");
    if (document.body.classList.contains('dark')) {
        document.body.classList.add('dark-mode'); 
    } else {
        document.body.classList.remove('dark-mode');
    }
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    if (!modal) return;

    modal.classList.remove("active");
    document.body.classList.remove('modal-open');
}

function attachProjectCardListeners() {
    const modal = document.getElementById("project-modal");
    if (!modal) return;
    const modalClose = modal.querySelector(".modal-close");

    document.querySelectorAll(".projects-grid .project-card").forEach(card => {
        if (card._hasClickListener) return;

        card.addEventListener("click", openProjectModal);
        card._hasClickListener = true;
    });

    if (modalClose && !modalClose._hasClickListener) {
        modalClose.addEventListener("click", closeProjectModal);
        modalClose._hasClickListener = true;
    }

    if (!modal._hasOutsideClickListener) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProjectModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeProjectModal();
        });
        modal._hasOutsideClickListener = true;
    }
}

    const body = document.body;
    const yearSpan = document.getElementById('year');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const pathPrefix = window.location.pathname.split('/').length > 2 ? '../' : './';

    const footerHTML = `
    <footer class="footer">
      <div class="footer-top">
        <h2 class="footer-title">Gabe Mods</h2>
        <p class="footer-description">
          This website offers free mods for Android.
        </p>
      </div>

      <div class="footer-container">
        <div class="footer-section">
          <h3>Explore</h3>
          <ul>
            <li><a href="${pathPrefix}">Home</a></li>
            <li><a href="${pathPrefix}mods/">Mods</a></li>
            <li><a href="${pathPrefix}download/">Download</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Connect</h3>
          <p class="no-contact">No contact currently available.</p>
          <ul>
          <li><a href="https://github.com/gabriellongshaw">GitHub</a></li>
            <li><a href="https://www.instagram.com/gabriellongshaw">Instagram</a></li>
            <li><a href="https://youtube.com/@gabriellongshaw">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          <span class="copy">&copy </span><span id="year">${new Date().getFullYear()}</span> Gabriel Longshaw. All rights reserved.
          Website created and maintained by 
          <a class="name" href="https://gabriellongshaw.co.uk/" target="_blank" rel="noopener">Gabriel Longshaw</a>.
        </p>
        <p class="meta">
    Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father except through Me.” ‭‭John‬‭ 14‬: ‭6‬‭ NKJV‬‬
    </p>
      </div>
    </footer>
    `;

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;