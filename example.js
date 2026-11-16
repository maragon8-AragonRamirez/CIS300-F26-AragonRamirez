const openCapsuleButton = document.querySelector(".open-capsule");
const capsuleDialog = document.querySelector(".capsule-dialog");
const closeCapsuleButton = document.querySelector(".close-capsule");
const slideTrack = document.querySelector(".slide-track");
const slides = [...document.querySelectorAll(".capsule-slide")];
const slideStatus = document.querySelector("#slide-status");
const slideshowButton = document.querySelector(".toggle-slideshow");
const capsuleMusic = document.querySelector(".capsule-music");
const musicStatus = document.querySelector("#music-status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeSlide = 0;
let slideshowTimer;
let scrollTimer;
const capsules = {
  "road-trip": {
    meta: "A summer capsule · 2031",
    title: "The long way",
    subtitle: "home again.",
    date: "SAVED 2026 · OPENED 2031",
    caption: "The playlist, the wrong turn, and the long way home."
  },
  "family-dinner": {
    meta: "A family capsule · 2030",
    title: "Around",
    subtitle: "the table.",
    date: "SAVED 2025 · OPENED 2030",
    caption: "Recipes in the margins, voices filling the room."
  },
  sketchbook: {
    meta: "A creative capsule · 2029",
    title: "A small start.",
    subtitle: "Something of my own.",
    date: "SAVED 2024 · OPENED 2029",
    caption: "The first rough line of something new."
  }
};

const requestedCapsule = new URLSearchParams(window.location.search).get("capsule");
const capsule = Object.prototype.hasOwnProperty.call(capsules, requestedCapsule)
  ? capsules[requestedCapsule]
  : null;

if (capsule) {
  document.title = `${capsule.title} ${capsule.subtitle} | Revist`;
  document.querySelector("#capsule-meta").textContent = capsule.meta;
  document.querySelector("#capsule-title").textContent = capsule.title;
  document.querySelector("#capsule-subtitle").textContent = capsule.subtitle;
  document.querySelector("#capsule-date").textContent = capsule.date;
  document.querySelector("#capsule-caption").textContent = capsule.caption;
}

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slideTrack.scrollTo({
    top: activeSlide * slideTrack.clientHeight,
    behavior: reduceMotion ? "auto" : "smooth"
  });
  slideStatus.textContent = `Image ${activeSlide + 1} of ${slides.length}`;
}

function pauseSlideshow() {
  window.clearInterval(slideshowTimer);
  slideshowTimer = undefined;
  slideshowButton.textContent = "Play slideshow";
}

function startSlideshow() {
  if (reduceMotion) {
    pauseSlideshow();
    return;
  }

  window.clearInterval(slideshowTimer);
  slideshowButton.textContent = "Pause slideshow";
  slideshowTimer = window.setInterval(() => showSlide(activeSlide + 1), 4000);
}

openCapsuleButton.addEventListener("click", () => {
  capsuleDialog.showModal();
  showSlide(0);
  startSlideshow();
  capsuleMusic.volume = 0.22;
  capsuleMusic.play().then(() => {
    musicStatus.textContent = "Original ambient music is playing.";
  }).catch(() => {
    musicStatus.textContent = "Music did not start automatically. Use the audio controls to play it.";
  });
});

closeCapsuleButton.addEventListener("click", () => capsuleDialog.close());

capsuleDialog.addEventListener("close", () => {
  pauseSlideshow();
  capsuleMusic.pause();
  capsuleMusic.currentTime = 0;
  musicStatus.textContent = "Original ambient music is ready to play.";
});

slideshowButton.addEventListener("click", () => {
  if (slideshowTimer) {
    pauseSlideshow();
  } else {
    startSlideshow();
  }
});

document.querySelector(".previous-slide").addEventListener("click", () => {
  showSlide(activeSlide - 1);
});

document.querySelector(".next-slide").addEventListener("click", () => {
  showSlide(activeSlide + 1);
});

slideTrack.addEventListener("scroll", () => {
  window.clearTimeout(scrollTimer);
  scrollTimer = window.setTimeout(() => {
    activeSlide = Math.round(slideTrack.scrollTop / slideTrack.clientHeight);
    slideStatus.textContent = `Image ${activeSlide + 1} of ${slides.length}`;
  }, 150);
});

capsuleMusic.addEventListener("error", () => {
  musicStatus.textContent = "The sample music could not be loaded in this browser.";
});
