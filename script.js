// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when link is clicked
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("active");
  });
});

// Form submission with Formspree (AJAX - no page redirect)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Get form data
    const formData = new FormData(contactForm);

    // Submit using fetch to Formspree
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Success - show toast notification
          showSuccessToast("Message sent successfully! ✓");
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          contactForm.reset();
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch((error) => {
        // Error handling
        showErrorToast("Error sending message. Please try again.");
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
  });
}

// Toast notification function
function showSuccessToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast toast-success";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function showErrorToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast toast-error";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply animation to cards and sections
const animateElements = document.querySelectorAll(
  ".skill-card, .project-card, .stat, .about-text, .experience-item",
);
animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Typing animation for hero heading
const typingText = document.querySelector(".typing-text");
const highlightText = document.querySelector(".highlight");

if (typingText) {
  const typingContent = "Hi, I'm";
  typingText.textContent = "";
  let charIndex = 0;

  function typeCharacter() {
    if (charIndex < typingContent.length) {
      typingText.textContent += typingContent[charIndex];
      charIndex++;
      setTimeout(typeCharacter, 80);
    }
  }

  window.addEventListener("load", () => {
    typeCharacter();
  });
}
// Gallery images for each project
const galleryImages = {
  fumart: ["image/fumart1.png", "image/fumart2.png"],
  inget: ["image/inget1.png"],
  poster: ["image/poster1.png"],
};

let currentImageIndex = {
  fumart: 0,
  inget: 0,
  poster: 0,
};

let currentModalProject = null;

// Function to update gallery image
function updateGallery(project) {
  const gallery = document.querySelector(`[data-project="${project}"]`);
  if (!gallery) return;

  const currentIndex = currentImageIndex[project];
  const images = galleryImages[project];
  const img = gallery.querySelector(".gallery-image");
  const counter = gallery.querySelector(".current");

  img.src = images[currentIndex];
  img.alt = `${project} Image ${currentIndex + 1}`;
  counter.textContent = currentIndex + 1;
}

// Function to go to next image
function nextImage(project) {
  const images = galleryImages[project];
  if (!images) return;

  currentImageIndex[project] = (currentImageIndex[project] + 1) % images.length;
  updateGallery(project);
  updateModal();
}

// Function to go to previous image
function prevImage(project) {
  const images = galleryImages[project];
  if (!images) return;

  currentImageIndex[project] =
    (currentImageIndex[project] - 1 + images.length) % images.length;
  updateGallery(project);
  updateModal();
}

// Modal functions
function openModal(project) {
  const modal = document.getElementById("imageModal");
  currentModalProject = project;
  const images = galleryImages[project];
  const currentIndex = currentImageIndex[project];

  // Update modal image
  const modalImage = document.getElementById("modalImage");
  modalImage.src = images[currentIndex];

  // Update counter
  const counter = modal.querySelector(".modal-counter");
  counter.querySelector(".current").textContent = currentIndex + 1;
  counter.querySelector(".total").textContent = images.length;

  // Setup navigation buttons
  const navContainer = document.getElementById("navContainer");
  navContainer.innerHTML = "";

  if (images.length > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.className = "modal-nav-btn";
    prevBtn.innerHTML = "❮";
    prevBtn.onclick = () => {
      currentImageIndex[project] =
        (currentImageIndex[project] - 1 + images.length) % images.length;
      updateModal();
    };

    const nextBtn = document.createElement("button");
    nextBtn.className = "modal-nav-btn";
    nextBtn.innerHTML = "❯";
    nextBtn.onclick = () => {
      currentImageIndex[project] =
        (currentImageIndex[project] + 1) % images.length;
      updateModal();
    };

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
  }

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function updateModal() {
  if (!currentModalProject) return;

  const images = galleryImages[currentModalProject];
  const currentIndex = currentImageIndex[currentModalProject];

  const modalImage = document.getElementById("modalImage");
  modalImage.src = images[currentIndex];

  const modal = document.getElementById("imageModal");
  const counter = modal.querySelector(".modal-counter");
  counter.querySelector(".current").textContent = currentIndex + 1;
  counter.querySelector(".total").textContent = images.length;
}

function closeModal(event) {
  const modal = document.getElementById("imageModal");
  if (event && event.target !== modal) return;

  modal.classList.remove("show");
  document.body.style.overflow = "auto";
  currentModalProject = null;
}

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
