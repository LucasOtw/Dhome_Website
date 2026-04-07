// Dhome Securite - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  const body = document.body;

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('menu-open');

      if (isOpen) {
        // Close
        mobileMenu.classList.remove('menu-open');
        mobileMenu.classList.add('menu-closing');
        body.style.overflow = '';
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');

        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('menu-closing');
        }, 300);
      } else {
        // Open
        mobileMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
          mobileMenu.classList.add('menu-open');
        });
        body.style.overflow = 'hidden';
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('menu-open');
        mobileMenu.classList.add('menu-closing');
        body.style.overflow = '';
        iconOpen?.classList.remove('hidden');
        iconClose?.classList.add('hidden');
        menuBtn?.setAttribute('aria-expanded', 'false');

        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('menu-closing');
        }, 300);
      });
    });
  }

  // Dynamic year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header shadow on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('shadow-2xl', window.scrollY > 10);
    }, { passive: true });
  }
});
