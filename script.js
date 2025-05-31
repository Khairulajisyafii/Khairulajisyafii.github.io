// Configuration
const TEXTS = [
  "I code ideas into realities.",
  "a GameDev Enthusiast.",
  "I build digital experiences.",
];
const DISPLAY_TRANSITION_DELAY = 300;
const TYPE_SPEED = {
  write: 80,
  delete: 40,
  pause: 3000,
};

// DOM Elements
const dom = {
  typing: document.getElementById("typing"),
  rainbow: document.getElementById("rainbow"),
  contactSection: document.querySelector(".contact-endpoint"),
  projectSection: document.querySelector(".project-endpoint"),
  displays: document.querySelectorAll(".display"),
  children: document.querySelectorAll(".child"),
  projectsSlider: document.getElementById("projectsSlider"),
  pages: {
    page1: document.querySelectorAll(".home"),
    page2: document.querySelectorAll(".about"),
    page3: document.querySelectorAll(".page3"),
    contact: document.querySelectorAll(".contact"),
    project: document.querySelectorAll(".project"),
  },
};

// State
let state = {
  type: {
    count: 0,
    index: 0,
    isDeleting: false,
  },
  hue: 0,
};

// Typing Effect
function type() {
  if (!dom.typing) return;

  const current = TEXTS[state.type.count];
  const text = state.type.isDeleting
    ? current.substring(0, state.type.index--)
    : current.substring(0, state.type.index++);

  dom.typing.textContent = text;

  if (!state.type.isDeleting && state.type.index > current.length) {
    state.type.isDeleting = true;
    setTimeout(type, TYPE_SPEED.pause);
  } else if (state.type.isDeleting && state.type.index === 0) {
    state.type.isDeleting = false;
    state.type.count = (state.type.count + 1) % TEXTS.length;
    setTimeout(type, TYPE_SPEED.write);
  } else {
    setTimeout(
      type,
      state.type.isDeleting ? TYPE_SPEED.delete : TYPE_SPEED.write
    );
  }
}

// Rainbow Color Effect
function updateColor() {
  if (!dom.rainbow) return;

  dom.rainbow.style.color = `hsl(${state.hue}, 100%, 50%)`;
  dom.rainbow.style.textShadow = `
    0 0 5px hsl(${state.hue}, 100%, 50%),
    0 0 10px hsl(${state.hue}, 100%, 50%),
    0 0 20px hsl(${state.hue}, 100%, 50%)
  `;

  state.hue = (state.hue + 1) % 360;
  requestAnimationFrame(updateColor);
}

// Page Switching
function switchPage(
  pageIndex,
  scrollToContact = false,
  scrollToProject = false
) {
  dom.displays.forEach((display, index) => {
    display.style.display = index === pageIndex ? "block" : "none";
  });

  if (scrollToContact && dom.contactSection) {
    smoothScrollToElement(dom.contactSection);
  }
  if (scrollToProject && dom.projectSection) {
    smoothScrollToElement(dom.projectSection);
  }
}

// Initialize Pag)e Switcher
function initPageSwitcher() {
  Object.entries(dom.pages).forEach(([pageName, pageElements], pageIndex) => {
    pageElements.forEach((element) => {
      element.addEventListener("click", () => {
        switchPage(pageIndex, pageName === "contact", pageName === "project");
      });
    });
  });
}

// Initialize Image Hover Effects
function initImageHoverEffects() {
  dom.children.forEach((child, index) => {
    child.style.backgroundImage = `url(a${index + 1}.jpeg)`;

    child.addEventListener("mouseenter", () => {
      child.style.transform = "scale(1.02)";
      dom.children.forEach((sibling) => {
        if (sibling !== child) {
          sibling.style.filter = "blur(2px) brightness(0.6)";
          sibling.style.transform = "scale(0.95)";
        }
      });
    });

    child.addEventListener("mouseleave", () => {
      dom.children.forEach((sibling) => {
        sibling.style.filter = "none";
        sibling.style.transform = "scale(1)";
      });
    });
  });
}

// scroll target
function smoothScrollToElement(element, duration = 1000) {
  const targetPosition =
    element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    // easeInOutQuad
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

//project scrolling
function scrollProjects(direction) {
  const scrollAmount = 300;
  dom.projectsSlider?.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  type();
  updateColor();
  initPageSwitcher();
  initImageHoverEffects();

  // Add contact scroll triggers
  dom.pages.contact.forEach((el) => {
    el.addEventListener("click", () => switchPage(1, true, false));
  });
  dom.pages.project.forEach((el) => {
    el.addEventListener("click", () => switchPage(1, false, true));
  });
});
