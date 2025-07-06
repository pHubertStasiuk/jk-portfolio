// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fade in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive hover effects
document.querySelectorAll('.floating-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.2) translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
    });

    icon.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Initialize animations on page load
window.addEventListener('load', function () {
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
});

  const powerBiUrls = {
    "sales-performance": "https://app.powerbi.com/view?r=eyJrIjoiNTZlZmVmMmMtMTM1My00OWNhLWIzNDItNjQ3YjBhZTc5YzMxIiwidCI6IjI5OWJlMzdlLWEyZTItNDY3OC1iYzc5LWMxOTJmNDVjNGQxMyJ9",
    "etl-pipeline": "https://your-etl-dashboard-url",
    "customer-segmentation": "https://your-customer-segmentation-url"
  };

  document.querySelectorAll(".project-cta-primary").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const projectId = this.getAttribute("data-project-id");
      const iframe = document.getElementById("powerbiIframe");
      iframe.src = powerBiUrls[projectId];

      const modal = document.getElementById("powerbiModal");
      modal.style.display = "block";

      // Request fullscreen for the modal
      if (modal.requestFullscreen) {
        modal.requestFullscreen();
      } else if (modal.webkitRequestFullscreen) { // Safari
        modal.webkitRequestFullscreen();
      } else if (modal.msRequestFullscreen) { // IE11
        modal.msRequestFullscreen();
      }
    });
  });

  document.getElementById("closeModalBtn").addEventListener("click", function () {
    const modal = document.getElementById("powerbiModal");
    modal.style.display = "none";
    document.getElementById("powerbiIframe").src = "";

    // Exit fullscreen if open
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });

  window.addEventListener("click", function (e) {
    const modal = document.getElementById("powerbiModal");
    if (e.target === modal) {
      modal.style.display = "none";
      document.getElementById("powerbiIframe").src = "";

      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });