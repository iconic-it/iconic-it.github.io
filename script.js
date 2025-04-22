// Existing JavaScript from your original script.js
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".nav.left");
const next = document.querySelector(".nav.right");

let current = 0;
let timer;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 4000);
}

next.addEventListener("click", () => {
  nextSlide();
  resetTimer();
});

prev.addEventListener("click", () => {
  prevSlide();
  resetTimer();
});

timer = setInterval(nextSlide, 4000);

function showSidebar() {
    const sidebar = document.querySelector('.navlinks-sidebar')
    sidebar.style.display = 'flex'    
}

function hideSidebar() {
    const sidebar = document.querySelector('.navlinks-sidebar')
    sidebar.style.display = 'none'    
}