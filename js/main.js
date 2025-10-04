/* =====================================================
   Harbor Cellars – Singapore Wine Distribution
   Main JavaScript (main.js)
   ===================================================== */

// -------------- Navigation Toggle (for mobile) --------------
const nav = document.querySelector('nav ul');
const logo = document.querySelector('.logo');

// Create hamburger for smaller screens
const menuToggle = document.createElement('div');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '<span></span><span></span><span></span>';
document.querySelector('nav').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

// Close nav when clicking a link (mobile)
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});

// -------------- Smooth Scroll --------------
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// -------------- Newsletter Form Handling --------------
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value.trim();

    if (!email) return alert('Please enter a valid email.');

    try {
      // Using mock API to simulate submission
      const res = await fetch('https://64.mockapi.io/harborcellars/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        alert('Thank you for subscribing!');
        newsletterForm.reset();
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (err) {
      alert('Network error. Please check your connection.');
    }
  });
}

// -------------- Contact Form Handling --------------
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      subject: contactForm.subject.value.trim(),
      message: contactForm.message.value.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
      formStatus.textContent = 'Please fill out all required fields.';
      formStatus.style.color = 'red';
      return;
    }

    formStatus.textContent = 'Sending...';
    formStatus.style.color = 'black';

    try {
      // Fake API endpoint for testing
      const response = await fetch('https://64.mockapi.io/harborcellars/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.style.color = 'green';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Failed to send message. Try again later.';
        formStatus.style.color = 'red';
      }
    } catch (err) {
      formStatus.textContent = 'Network error. Please try again later.';
      formStatus.style.color = 'red';
    }
  });
}

// -------------- Dynamic Year in Footer --------------
const yearSpan = document.createElement('span');
yearSpan.textContent = new Date().getFullYear();
const footer = document.querySelector('footer p.copyright');
if (footer && !footer.textContent.includes(yearSpan.textContent)) {
  footer.innerHTML = `&copy; ${yearSpan.textContent} Harbor Cellars Singapore. All rights reserved.`;
}

// -------------- Scroll Reveal Animation --------------
const elements = document.querySelectorAll('.section, .wine-card, .service');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();