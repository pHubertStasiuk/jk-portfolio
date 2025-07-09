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
function initializeStatsObserver() {
    const statsSection = document.querySelector('.stats-container');
    if (!statsSection) return;

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

document.addEventListener("DOMContentLoaded", () => {
    const powerBiUrls = {
        "sales-performance": "https://app.powerbi.com/view?r=eyJrIjoiNTZlZmVmMmMtMTM1My00OWNhLWIzNDItNjQ3YjBhZTc5YzMxIiwidCI6IjI5OWJlMzdlLWEyZTItNDY3OC1iYzc5LWMxOTJmNDVjNGQxMyJ9",
        "etl-pipeline": "https://your-etl-dashboard-url",
        "customer-segmentation": "https://your-customer-segmentation-url"
    };

    const powerBiModal = document.getElementById("powerbiModal");
    const iframe = document.getElementById("powerbiIframe");
    const closeBtn = document.getElementById("closeModalBtn");

    // Open Power BI modal
    document.querySelectorAll(".project-cta-primary").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const projectId = this.getAttribute("data-project-id");
            const url = powerBiUrls[projectId];
            if (!url) {
                console.warn(`No Power BI URL defined for project: ${projectId}`);
                return;
            }

            iframe.src = url;
            powerBiModal.style.display = "block";

            // Try to go fullscreen
            if (powerBiModal.requestFullscreen) {
                powerBiModal.requestFullscreen();
            } else if (powerBiModal.webkitRequestFullscreen) {
                powerBiModal.webkitRequestFullscreen();
            } else if (powerBiModal.msRequestFullscreen) {
                powerBiModal.msRequestFullscreen();
            }
        });
    });

    // Close modal (button)
    closeBtn.addEventListener("click", () => {
        closePowerBiModal();
    });

    // Close modal (click outside)
    window.addEventListener("click", (e) => {
        if (e.target === powerBiModal) {
            closePowerBiModal();
        }
    });

    // Handle ESC key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && powerBiModal.style.display === "block") {
            closePowerBiModal();
        }
    });

    // Handle fullscreen changes (including ESC key exits)
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    function handleFullscreenChange() {
        // If we exit fullscreen but modal is still open, close it
        if (!document.fullscreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement &&
            powerBiModal.style.display === "block") {
            closePowerBiModal();
        }
    }

    function closePowerBiModal() {
        powerBiModal.style.display = "none";
        iframe.src = "";

        // Exit fullscreen if still in fullscreen mode
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        } else if (document.msFullscreenElement) {
            document.msExitFullscreen();
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const includes = document.querySelectorAll('[data-include]');

    let includeCount = includes.length;
    let loadedCount = 0;

    includes.forEach(el => {
        const file = el.getAttribute('data-include');
        fetch(file)
            .then(res => {
                if (!res.ok) throw new Error(`Could not load ${file}`);
                return res.text();
            })
            .then(html => {
                el.innerHTML = html;
                loadedCount++;

                // When all includes are loaded, initialize observers or animations
                if (loadedCount === includeCount) {
                    initializeStatsObserver();
                }
            })
            .catch(err => {
                el.innerHTML = `<p style="color:red;">Failed to load ${file}</p>`;
                console.error(err);
            });
    });
});


document.addEventListener('keydown', function (event) {
    const modal = document.getElementById('caseStudyModal');
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.getElementById('caseStudyBody').innerHTML = '';
        document.body.style.overflow = 'auto';
    }
});



document.addEventListener('DOMContentLoaded', function () {

    const caseStudyModal = document.getElementById('caseStudyModal');
    const caseStudyClose = document.querySelector('.case-study-close');
    const caseStudyLinks = document.querySelectorAll('.project-cta-secondary');

    const caseStudyPaths = {
        'sales-performance': './components/case-studies/sales-performance.html',
        'etl-pipeline': './components/case-studies/etl-pipeline.html',
        'customer-segmentation': './components/case-studies/customer-segmentation.html'
    };

    caseStudyLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;

            let projectId = 'sales-performance';
            if (projectTitle.includes('ETL Pipeline')) {
                projectId = 'etl-pipeline';
            } else if (projectTitle.includes('Customer Segmentation')) {
                projectId = 'customer-segmentation';
            }

            // Titles & Subtitles can still be hardcoded or fetched elsewhere
            const titles = {
                'sales-performance': {
                    title: 'Sales Performance Dashboard',
                    subtitle: 'Comprehensive Power BI analytics solution'
                },
                'etl-pipeline': {
                    title: 'ETL Pipeline Azure',
                    subtitle: 'Automated data processing with Azure Data Factory'
                },
                'customer-segmentation': {
                    title: 'Customer Segmentation Analysis',
                    subtitle: 'Advanced analytics for targeted marketing'
                }
            };

            const path = caseStudyPaths[projectId];
            fetch(path)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('caseStudyTitle').textContent = titles[projectId].title;
                    document.getElementById('caseStudySubtitle').textContent = titles[projectId].subtitle;
                    document.getElementById('caseStudyBody').innerHTML = html;
                    caseStudyModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                })
                .catch(error => console.error('Error loading case study:', error));
        });
    });

});

