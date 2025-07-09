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



  document.addEventListener('DOMContentLoaded', function() {
            const caseStudyModal = document.getElementById('caseStudyModal');
            const caseStudyClose = document.querySelector('.case-study-close');
            const caseStudyLinks = document.querySelectorAll('.project-cta-secondary');

            // Case study data
            const caseStudyData = {
                'sales-performance': {
                    title: 'Sales Performance Dashboard',
                    subtitle: 'Comprehensive Power BI analytics solution',
                    content: `
                        <div class="case-study-section">
                            <h3><i class="fas fa-bullseye"></i> Project Overview</h3>
                            <p>Developed a comprehensive sales performance dashboard that transforms raw sales data into actionable insights. This project demonstrates advanced Power BI capabilities, DAX calculations, and strategic business intelligence implementation.</p>
                            <p>The dashboard serves as a centralized hub for sales teams and management to track performance, identify trends, and make data-driven decisions in real-time.</p>
                        </div>

                        <div class="case-study-section">
                            <h3><i class="fas fa-cogs"></i> Technical Implementation</h3>
                            <div class="tech-stack-grid">
                                <div class="tech-item">
                                    <i class="fas fa-chart-bar"></i>
                                    <div>Power BI</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-database"></i>
                                    <div>SQL Server</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-code"></i>
                                    <div>DAX</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-filter"></i>
                                    <div>Power Query</div>
                                </div>
                            </div>
                        </div>

                        <div class="case-study-section">
                            <h3><i class="fas fa-route"></i> Development Process</h3>
                            <div class="process-timeline">
                                <div class="process-step">
                                    <h4>Data Assessment & Requirements</h4>
                                    <p>Analyzed existing sales data sources, identified key stakeholders, and defined success metrics and KPIs.</p>
                                </div>
                                <div class="process-step">
                                    <h4>Data Modeling & ETL</h4>
                                    <p>Created robust data models, implemented ETL processes, and established data quality checks.</p>
                                </div>
                                <div class="process-step">
                                    <h4>Dashboard Design & Development</h4>
                                    <p>Built interactive visualizations, implemented advanced DAX calculations, and created user-friendly interfaces.</p>
                                </div>
                                <div class="process-step">
                                    <h4>Testing & Deployment</h4>
                                    <p>Conducted thorough testing, gathered user feedback, and deployed to production environment.</p>
                                </div>
                            </div>
                        </div>

                        <div class="case-study-section">
                            <h3><i class="fas fa-exclamation-triangle"></i> Challenges & Solutions</h3>
                            <div class="challenge-solution">
                                <div class="challenge-card">
                                    <h4><i class="fas fa-times-circle"></i> Challenge</h4>
                                    <p>Multiple data sources with inconsistent formatting and missing historical data affecting accuracy.</p>
                                </div>
                                <div class="solution-card">
                                    <h4><i class="fas fa-check-circle"></i> Solution</h4>
                                    <p>Implemented robust ETL processes with data validation rules and created standardized data models.</p>
                                </div>
                            </div>
                        </div>

                        <div class="case-study-section">
                            <h3><i class="fas fa-chart-line"></i> Key Results</h3>
                            <div class="results-grid">
                                <div class="result-card">
                                    <span class="result-number">40%</span>
                                    <span class="result-label">Faster Reporting</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">15%</span>
                                    <span class="result-label">Sales Increase</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">25</span>
                                    <span class="result-label">KPIs Tracked</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">5</span>
                                    <span class="result-label">Data Sources</span>
                                </div>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <a href="#" class="action-btn action-btn-primary">
                                <i class="fas fa-external-link-alt"></i> View Live Dashboard
                            </a>
                            <a href="#" class="action-btn action-btn-secondary">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        </div>
                    `
                },
                'etl-pipeline': {
                    title: 'ETL Pipeline Azure',
                    subtitle: 'Automated data processing with Azure Data Factory',
                    content: `
                        <div class="case-study-section">
                            <h3><i class="fas fa-bullseye"></i> Project Overview</h3>
                            <p>Designed and implemented a scalable ETL pipeline using Azure Data Factory to automate data extraction, transformation, and loading processes. This solution handles multiple data sources and ensures consistent, reliable data flow to the data warehouse.</p>
                        </div>

                        <div class="case-study-section">
                            <h3><i class="fas fa-cogs"></i> Technical Stack</h3>
                            <div class="tech-stack-grid">
                                <div class="tech-item">
                                    <i class="fas fa-cloud"></i>
                                    <div>Azure Data Factory</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-database"></i>
                                    <div>Azure SQL Database</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-file-alt"></i>
                                    <div>Azure Blob Storage</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-code"></i>
                                    <div>SQL & Python</div>
                                </div>
                            </div>
                        </div>

                        <div class="case-study-section">
                            <h3><i class="fas fa-chart-line"></i> Key Results</h3>
                            <div class="results-grid">
                                <div class="result-card">
                                    <span class="result-number">80%</span>
                                    <span class="result-label">Time Reduction</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">99.9%</span>
                                    <span class="result-label">Uptime</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">12</span>
                                    <span class="result-label">Data Sources</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">2TB</span>
                                    <span class="result-label">Data Processed</span>
                                </div>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <a href="#" class="action-btn action-btn-primary">
                                <i class="fas fa-external-link-alt"></i> View Architecture
                            </a>
                            <a href="#" class="action-btn action-btn-secondary">
                                <i class="fab fa-github"></i> View Documentation
                            </a>
                        </div>
                    `
                },
                'customer-segmentation': {
                    title: 'Customer Segmentation Analysis',
                    subtitle: 'Advanced analytics for targeted marketing',
                    content: `
                        <div class="case-study-section">
                            <h3><i class="fas fa-bullseye"></i> Project Overview</h3>
                            <p>Developed an advanced customer segmentation system using SQL analytics and Power BI visualization to identify distinct customer groups and optimize marketing strategies. This project combines statistical analysis with business intelligence to deliver actionable insights.</p>
                        </div>

                        <div class="case-study-section">
                            <h3><i class="fas fa-cogs"></i> Technical Implementation</h3>
                            <div class="tech-stack-grid">
                                <div class="tech-item">
                                    <i class="fas fa-database"></i>
                                    <div>SQL Server</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-chart-bar"></i>
                                    <div>Power BI</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-code"></i>
                                    <div>Python</div>
                                </div>
                                <div class="tech-item">
                                    <i class="fas fa-brain"></i>
                                    <div>Machine Learning</div>
                                </div>
                            </div>
                        </div>

                        <div class="case-study-section">
                            <h3><i class="fas fa-chart-line"></i> Key Results</h3>
                            <div class="results-grid">
                                <div class="result-card">
                                    <span class="result-number">7</span>
                                    <span class="result-label">Customer Segments</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">35%</span>
                                    <span class="result-label">Marketing ROI Increase</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">50K</span>
                                    <span class="result-label">Customers Analyzed</span>
                                </div>
                                <div class="result-card">
                                    <span class="result-number">92%</span>
                                    <span class="result-label">Accuracy Rate</span>
                                </div>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <a href="#" class="action-btn action-btn-primary">
                                <i class="fas fa-external-link-alt"></i> View Analysis
                            </a>
                            <a href="#" class="action-btn action-btn-secondary">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        </div>
                    `
                }
            };

            // Open case study modal
            caseStudyLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const projectCard = this.closest('.project-card');
                    const projectTitle = projectCard.querySelector('.project-title').textContent;
                    
                    // Determine project ID based on title
                    let projectId = 'sales-performance';
                    if (projectTitle.includes('ETL Pipeline')) {
                        projectId = 'etl-pipeline';
                    } else if (projectTitle.includes('Customer Segmentation')) {
                        projectId = 'customer-segmentation';
                    }
                    
                    const data = caseStudyData[projectId];
                    if (data) {
                        document.getElementById('caseStudyTitle').textContent = data.title;
                        document.getElementById('caseStudySubtitle').textContent = data.subtitle;
                        document.getElementById('caseStudyBody').innerHTML = data.content;
                        caseStudyModal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            // Close case study modal
            caseStudyClose.addEventListener('click', function() {
                caseStudyModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === caseStudyModal) {
                    caseStudyModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
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
  }
});