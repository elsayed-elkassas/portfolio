// Portfolio interactive scripts for Elsayed Elkassas
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateThemeIcon(targetTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  // Typewriter Effect
  const words = [
    'Data Analyst',
    'Power BI Developer',
    'DAX & Data Modeling Specialist',
    'Computer Science Student'
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typewriterElem = document.getElementById('typewriter');

  function typeEffect() {
    if (!typewriterElem) return;
    const currentWord = words[wordIdx];
    if (isDeleting) {
      charIdx--;
      typewriterElem.textContent = currentWord.substring(0, charIdx);
    } else {
      charIdx++;
      typewriterElem.textContent = currentWord.substring(0, charIdx);
    }

    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIdx === currentWord.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }
    setTimeout(typeEffect, delay);
  }
  typeEffect();

  // Mobile Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }

  // Navbar Scroll Shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

// Image Switcher for Project Gallery
function swapImage(targetId, localSrc, fallbackSrc, btnElem) {
  const mainImg = document.getElementById(targetId);
  if (!mainImg) return;
  mainImg.src = localSrc;
  mainImg.onerror = function() {
    this.src = fallbackSrc;
  };
  if (btnElem && btnElem.parentElement) {
    btnElem.parentElement.querySelectorAll('.thumb-btn').forEach(btn => btn.classList.remove('active'));
    btnElem.classList.add('active');
  }
}

// Lightbox Modal
function openLightbox(src, captionText) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  if (modal && img) {
    img.src = src;
    if (caption) caption.textContent = captionText || '';
    modal.classList.add('active');
  }
}

function closeLightbox(event) {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const mailtoLink = `mailto:elsayedelkasas79@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
  window.location.href = mailtoLink;

  showToast('Opening your email client to send message...');
}

// Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
