const projectData = [
  {
    title: "Healhub",
    category: "product",
    label: "Healthtech product",
    summary:
      "A final-year full-stack platform for doctors, patients, and insurers to exchange critical records more securely and with less operational friction.",
    outcome: "Built a multi-role healthcare workflow with DRF backend and React frontend.",
    role: "Full-stack builder",
    stack: ["React", "Django REST Framework", "PostgreSQL", "Python"],
    live: "https://healhub.netlify.app/",
    code: null
  },
  {
    title: "GMAT 1.0",
    category: "automation",
    label: "Workflow automation",
    summary:
      "A desktop automation tool that tracked Google Meet attendance, generated spreadsheets, and delivered outputs with less manual classroom overhead.",
    outcome: "Automated a repetitive attendance workflow with Selenium and PyQt.",
    role: "Product and automation developer",
    stack: ["Python", "PyQt", "Selenium"],
    live: null,
    code: "https://github.com/shalomalexander/Google_Meets_Attendance_Tracker"
  },
  {
    title: "Mealbook",
    category: "frontend",
    label: "Frontend app",
    summary:
      "A recipe browsing interface built on top of the Edamam API with a lightweight, user-friendly discovery flow for meals and ingredients.",
    outcome: "Turned third-party data into a fast consumer-facing browsing experience.",
    role: "Frontend developer",
    stack: ["React", "API Integration", "Netlify"],
    live: "https://dazzling-hermann-67c236.netlify.app/",
    code: null
  },
  {
    title: "Portfolio v1",
    category: "frontend",
    label: "Personal site",
    summary:
      "The original hand-coded portfolio that established a first public presence and now serves as the baseline for this more mature redesign.",
    outcome: "Shipped a personal web presence using only HTML, CSS, and JavaScript.",
    role: "Designer and developer",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "#top",
    code: null
  }
];

const sectionSelectors = ["#hero", "#projects", "#experience", "#skills", "#contact"];

const projectsGrid = document.getElementById("projects-grid");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const header = document.querySelector(".site-header");
const menuButton = document.getElementById("menu-button");
const mobileNav = document.getElementById("mobile-nav");
const commandPalette = document.getElementById("command-palette");
const commandTrigger = document.getElementById("command-trigger");
const paletteClose = document.getElementById("palette-close");
const paletteBackdrop = document.getElementById("palette-backdrop");
const progressBar = document.getElementById("scroll-progress");
const contactForm = document.getElementById("contact-form");

function calculateExperience() {
  const element = document.getElementById("experience-duration");
  if (!element) {
    return;
  }

  const joiningDate = new Date("2021-10-18");
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - joiningDate.getFullYear()) * 12 +
    (now.getMonth() - joiningDate.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  element.textContent = months > 0 ? `${years}+ years` : `${years} years`;
}

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card reveal";
  article.dataset.category = project.category;

  const stackMarkup = project.stack.map((item) => `<span>${item}</span>`).join("");
  const liveMarkup = project.live
    ? `<a href="${project.live}" target="${project.live.startsWith("#") ? "_self" : "_blank"}" rel="noreferrer">Live Demo</a>`
    : "";
  const codeMarkup = project.code
    ? `<a href="${project.code}" target="_blank" rel="noreferrer">GitHub</a>`
    : "";

  article.innerHTML = `
    <div class="project-meta">
      <span>${project.label}</span>
      <span>${project.category}</span>
    </div>
    <h3>${project.title}</h3>
    <p>${project.summary}</p>
    <div class="project-detail-list">
      <div>
        <strong>Outcome</strong>
        <span>${project.outcome}</span>
      </div>
      <div>
        <strong>Role</strong>
        <span>${project.role}</span>
      </div>
    </div>
    <div class="project-tags">${stackMarkup}</div>
    <div class="project-links">
      ${liveMarkup}
      ${codeMarkup}
    </div>
  `;

  return article;
}

function renderProjects(filter = "all") {
  if (!projectsGrid) {
    return;
  }

  const filteredProjects =
    filter === "all" ? projectData : projectData.filter((project) => project.category === filter);

  projectsGrid.innerHTML = "";

  filteredProjects.forEach((project) => {
    projectsGrid.appendChild(createProjectCard(project));
  });

  requestAnimationFrame(() => {
    observeRevealElements();
  });
}

function hydrateProjects() {
  window.setTimeout(() => {
    renderProjects();
  }, 450);
}

function observeRevealElements() {
  const revealNodes = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  header.classList.toggle("scrolled", scrollTop > 12);
}

function setActiveNavLink() {
  const links = document.querySelectorAll(".nav-links a");
  const sections = sectionSelectors
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);
  let currentId = "hero";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      currentId = section.id;
    }
  });

  links.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
}

function toggleMobileMenu(forceState) {
  const shouldOpen =
    typeof forceState === "boolean" ? forceState : !mobileNav.classList.contains("open");
  mobileNav.classList.toggle("open", shouldOpen);
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  document.body.classList.toggle("menu-open", shouldOpen);
}

function toggleCommandPalette(forceState) {
  const shouldOpen =
    typeof forceState === "boolean" ? forceState : commandPalette.classList.contains("hidden");
  commandPalette.classList.toggle("hidden", !shouldOpen);
  commandPalette.setAttribute("aria-hidden", String(!shouldOpen));
}

function handleCommandShortcuts(event) {
  const key = event.key.toLowerCase();
  const isTypingField = ["input", "textarea"].includes(document.activeElement?.tagName.toLowerCase());

  if ((event.ctrlKey || event.metaKey) && key === "k") {
    event.preventDefault();
    toggleCommandPalette(true);
  }

  if (!isTypingField && key === "/") {
    event.preventDefault();
    toggleCommandPalette(true);
  }

  if (key === "escape") {
    toggleCommandPalette(false);
    toggleMobileMenu(false);
  }
}

function addMagneticHover() {
  const buttons = document.querySelectorAll(".magnetic");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      button.style.transform = `translate(${offsetX * 0.04}px, ${offsetY * 0.04}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

function bindEvents() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderProjects(filter);
    });
  });

  if (menuButton) {
    menuButton.addEventListener("click", () => toggleMobileMenu());
  }

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(false));
  });

  if (commandTrigger) {
    commandTrigger.addEventListener("click", () => toggleCommandPalette(true));
  }

  if (paletteClose) {
    paletteClose.addEventListener("click", () => toggleCommandPalette(false));
  }

  if (paletteBackdrop) {
    paletteBackdrop.addEventListener("click", () => toggleCommandPalette(false));
  }

  document.querySelectorAll("[data-command]").forEach((link) => {
    link.addEventListener("click", () => toggleCommandPalette(false));
  });

  window.addEventListener("scroll", () => {
    updateScrollProgress();
    setActiveNavLink();
  });

  window.addEventListener("keydown", handleCommandShortcuts);

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:shalomalexander68@gmail.com?subject=${subject}&body=${body}`;
    });
  }
}

calculateExperience();
hydrateProjects();
observeRevealElements();
updateScrollProgress();
setActiveNavLink();
addMagneticHover();
bindEvents();
