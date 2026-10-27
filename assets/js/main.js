/**
 * Portfolio Interactive Scripts
 * Handles Dark Mode, Mobile Menu, Filtering, Modals, and Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initProjectFilter();
  initGalleryFilter();
  initModals();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */

function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  const isDark = saved
    ? saved === 'dark'
    : prefersDark;

  applyTheme(isDark);

  if (!btn) return;

  btn.addEventListener('click', () => {
    const nowDark =
      !document.documentElement.classList.contains('dark');

    applyTheme(nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');

    if (typeof showToast === 'function') {
      showToast(
        nowDark ? 'Mode Gelap Aktif' : 'Mode Terang Aktif'
      );
    }
  });
}

function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById('theme-icon');

  if (!icon) return;

  icon.classList.toggle('fa-sun', isDark);
  icon.classList.toggle('fa-moon', !isDark);
}

/* ==========================================================================
   2. Mobile Menu Management
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-xl"></i>';
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
    }
  });
  
  // Close menu on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
    });
  });
}

/* ==========================================================================
   3. ScrollSpy & Header Shadow
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Header shadow on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    }
    
    // Highlight current active nav item
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-semibold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-semibold');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. Project Filter
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state button
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Gallery Filter
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      
      const filter = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Modal System (Universal: Project, Certificate, Lightbox)
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('universal-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  if (!modalBackdrop) return;
  
  // Close modal function
  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Open modal with dynamic content
  window.openModal = function(title, contentHtml) {
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
}

/* Helper to show certificate modal */
function viewCertificate(title, issuer, date, credId, imgUrl, description, skills) {
  const skillsBadges = skills.split(',').map(s => 
    `<span class="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 mr-1.5 mb-1.5 inline-block">${s.trim()}</span>`
  ).join('');

  const content = `
    <div class="space-y-4">
      <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner bg-slate-100 dark:bg-slate-900 flex items-center justify-center min-h-[220px]">
        <img src="${imgUrl}" alt="${title}" class="max-h-[380px] w-full object-contain">
      </div>
      <div>
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Penerbit Resmi</p>
            <p class="font-semibold text-slate-800 dark:text-slate-100">${issuer}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Tanggal Terbit</p>
            <p class="font-medium text-slate-700 dark:text-slate-300 text-sm">${date}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">ID Kredensial</p>
            <p class="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">${credId}</p>
          </div>
        </div>
        <div class="mt-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Deskripsi & Kompetensi</h4>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${description}</p>
        </div>
        <div class="mt-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Keahlian Tervalidasi</h4>
          <div class="flex flex-wrap">${skillsBadges}</div>
        </div>
      </div>
    </div>
  `;
  window.openModal(title, content);
}

/* Helper to show project detail modal */
function viewProjectDetail(title, category, imgUrl, description, role, features, techStack, demoUrl, githubUrl) {
  const techBadges = techStack.split(',').map(t => 
    `<span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mr-1.5 mb-1.5 inline-block">${t.trim()}</span>`
  ).join('');

  const featuresList = features.split('|').map(f => 
    `<li class="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300"><i class="fa-solid fa-check-circle text-blue-500 mt-1 mr-2 flex-shrink-0"></i><span>${f.trim()}</span></li>`
  ).join('');

  const content = `
    <div class="space-y-4">
      <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 max-h-[300px]">
        <img src="${imgUrl}" alt="${title}" class="w-full h-full object-cover">
      </div>
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">${category}</span>
          <span class="text-xs text-slate-500 dark:text-slate-400">• Peran: <strong class="text-slate-700 dark:text-slate-200">${role}</strong></span>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">${description}</p>
        
        <div class="border-t border-slate-100 dark:border-slate-800 pt-3 mb-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Fitur Utama & Kontribusi</h4>
          <ul class="space-y-1.5">${featuresList}</ul>
        </div>
        
        <div class="border-t border-slate-100 dark:border-slate-800 pt-3 mb-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Teknologi / Tools Digunakan</h4>
          <div class="flex flex-wrap">${techBadges}</div>
        </div>
        
        <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          ${demoUrl ? `<a href="${demoUrl}" target="_blank" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition inline-flex items-center gap-2"><i class="fa-solid fa-arrow-up-right-from-square"></i> Kunjungi Live Demo</a>` : ''}
          ${githubUrl ? `<a href="${githubUrl}" target="_blank" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg text-xs sm:text-sm font-semibold transition inline-flex items-center gap-2"><i class="fa-brands fa-github"></i> Lihat Repository</a>` : ''}
        </div>
      </div>
    </div>
  `;
  window.openModal(title, content);
}

/* Helper to show gallery lightbox */
function viewGalleryImage(title, category, date, imgUrl, description) {
  const content = `
    <div class="space-y-3">
      <div class="overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center max-h-[440px]">
        <img src="${imgUrl}" alt="${title}" class="max-h-[420px] w-auto max-w-full object-contain">
      </div>
      <div>
        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span class="font-medium text-blue-600 dark:text-blue-400">${category}</span>
          <span><i class="fa-regular fa-calendar mr-1"></i>${date}</span>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${description}</p>
      </div>
    </div>
  `;
  window.openModal(title, content);
}

/* ==========================================================================
   7. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if (!name || !message) {
      showToast('Mohon isi nama dan pesan Anda!', 'warning');
      return;
    }
    
    // Ganti nomor WhatsApp tujuan disini (Format internasional tanpa +, misal: 6281234567890)
    const whatsappPhone = '6281234567890';
    const text = `Halo Galih,\nNama: ${name}\nEmail: ${email || '-'}\nKeperluan: ${subject}\n\nPesan:\n${message}`;
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${whatsappPhone}?text=${encodedText}`;
    
    showToast('Membuka WhatsApp...', 'success');
    window.open(waUrl, '_blank');
    contactForm.reset();
  });
}

/* Copy text to clipboard helper */
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} berhasil disalin ke clipboard!`, 'success');
  }).catch(() => {
    showToast(`Gagal menyalin ${label}`, 'error');
  });
}

/* Toast alert feedback */
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 2800);
}

// Ensure global functions are available on window
// Ensure global functions are available on window
window.viewCertificate = viewCertificate;
window.viewProjectDetail = viewProjectDetail;
window.viewGalleryImage = viewGalleryImage;
window.copyToClipboard = copyToClipboard;
window.showToast = showToast;

