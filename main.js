(function () {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  window.closeMobile = function () {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  window.toggleFaq = function (btn) {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  };

  window.openLightbox = function (el) {
    const img = el.querySelector('img');
    const box = document.getElementById('lightbox');
    const target = document.getElementById('lightboxImg');
    if (!img || !box || !target) return;
    target.src = img.src;
    target.alt = img.alt || 'Residence photo';
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeLightbox = function () {
    const box = document.getElementById('lightbox');
    if (!box) return;
    box.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeLightbox();
  });

  function captchaOk(form) {
    const box = form.querySelector('.captcha-box input[type="checkbox"]');
    const err = form.querySelector('.captcha-error');
    if (!box) return true;
    if (!box.checked) {
      if (err) err.style.display = 'block';
      box.focus();
      return false;
    }
    if (err) err.style.display = 'none';
    return true;
  }

  function honeypotFilled(form) {
    const hp = form.querySelector('.honeypot');
    return hp && hp.value.trim() !== '';
  }

  window.handleForm = function (e, successLabel) {
    const form = e.target;
    if (honeypotFilled(form)) {
      e.preventDefault();
      return false;
    }
    if (!captchaOk(form)) {
      e.preventDefault();
      return false;
    }
    const btn = form.querySelector('.form-submit');
    if (btn) {
      btn.textContent = 'Sending…';
      btn.disabled = true;
    }
    return true;
  };
})();
