/**
 * main.js - Core functionality for Wing & Harbor
 * Handles Theme (Light/Dark), RTL, Navbar, Mobile Menu, and CTA Popups
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initNavbar();
  initMobileMenu();
  initPopups();
  initScrollToTop();
  initCartBtn();
});

function initCartBtn() {
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  });
}

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark'; // Default dark for premium feel
  
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-toggle-icon').forEach(icon => {
    if (theme === 'dark') {
      icon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
      icon.innerHTML = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    }
  });
}

/* ==========================================================================
   RTL Management
   ========================================================================== */
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const root = document.documentElement;
  const savedDir = localStorage.getItem('dir') || 'ltr';
  
  root.setAttribute('dir', savedDir);
  
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = root.getAttribute('dir');
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      
      root.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      
      // Update text in toggle button if needed
      document.querySelectorAll('.rtl-toggle-text').forEach(text => {
        text.textContent = newDir === 'ltr' ? 'AR' : 'EN';
      });
    });
  });

  document.querySelectorAll('.rtl-toggle-text').forEach(text => {
    text.textContent = savedDir === 'ltr' ? 'AR' : 'EN';
  });
}

/* ==========================================================================
   Navbar Scroll Effect
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');
  
  if (!hamburger || !mobileMenu || !overlay) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  
  // Close menu on link click
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
}

/* ==========================================================================
   Popup System
   ========================================================================== */
function initPopups() {
  const triggers = document.querySelectorAll('[data-popup]');
  const closeBtns = document.querySelectorAll('.popup-close');
  const overlays = document.querySelectorAll('.popup-overlay');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const popupId = trigger.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
      }
    });
  });

  function closeAllPopups() {
    document.querySelectorAll('.popup-wrapper').forEach(popup => {
      popup.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeAllPopups);
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', closeAllPopups);
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllPopups();
  });
}

/* ==========================================================================
   Scroll to Top
   ========================================================================== */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  
  btn.innerHTML = `
    <svg viewBox="0 0 100 200" class="bottle-icon" xmlns="http://www.w3.org/2000/svg">
      <!-- Cap -->
      <g class="bottle-cap-group">
        <rect x="40" y="10" width="20" height="20" rx="3" fill="var(--accent-primary)" />
        <rect x="38" y="25" width="24" height="6" rx="2" fill="#d4af37" />
        <!-- Splash particles (hidden by default) -->
        <circle cx="50" cy="15" r="3" class="splash-particle p1" fill="var(--accent-primary)" />
        <circle cx="50" cy="15" r="2" class="splash-particle p2" fill="#d4af37" />
        <circle cx="50" cy="15" r="4" class="splash-particle p3" fill="#ffffff" />
      </g>
      <!-- Bottle Body -->
      <path d="M42 35 L42 70 C42 85 30 95 30 115 L30 185 C30 195 35 198 50 198 C65 198 70 195 70 185 L70 115 C70 95 58 85 58 70 L58 35 Z" fill="rgba(255, 255, 255, 0.1)" stroke="currentColor" stroke-width="3" style="backdrop-filter: blur(4px);" />
      <!-- Label -->
      <rect x="35" y="125" width="30" height="40" rx="2" fill="var(--bg-secondary)" stroke="#d4af37" stroke-width="1" />
      <text x="50" y="148" font-family="Bebas Neue, sans-serif" font-size="14" font-weight="bold" fill="#d4af37" text-anchor="middle">W&H</text>
      <!-- Liquid -->
      <path d="M32 185 L68 185 L68 140 Q50 135 32 140 Z" fill="var(--accent-primary)" opacity="0.8" />
    </svg>
  `;
  
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    btn.classList.add('is-popping');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Remove class after animation finishes
    setTimeout(() => {
      btn.classList.remove('is-popping');
    }, 1000);
  });
}
