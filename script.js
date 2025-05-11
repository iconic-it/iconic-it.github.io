// Initialize sliders for each slider container
document.querySelectorAll('.slider-container').forEach(sliderContainer => {
    const slides = sliderContainer.querySelectorAll(".slide");
    const prev = sliderContainer.querySelector(".nav.left");
    const next = sliderContainer.querySelector(".nav.right");
    
    let current = 0;
    let timer;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
                slide.style.transform = "translateX(0)";
                slide.style.zIndex = "1";
            } else if (i < index) {
                slide.style.transform = "translateX(-100%)";
                slide.style.zIndex = "0";
            } else {
                slide.style.transform = "translateX(100%)";
                slide.style.zIndex = "0";
            }
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
    
    if (next) next.addEventListener("click", () => {
        nextSlide();
        resetTimer();
    });
    
    if (prev) prev.addEventListener("click", () => {
        prevSlide();
        resetTimer();
    });
    
    // Initialize first slide
    showSlide(0);
    
    // Start timer only if there are multiple slides
    if (slides.length > 1) {
        timer = setInterval(nextSlide, 4000);
    }
});

function showSidebar() {
    const sidebar = document.querySelector('.navlinks-sidebar')
    sidebar.style.display = 'flex'    
}

function hideSidebar() {
    const sidebar = document.querySelector('.navlinks-sidebar')
    sidebar.style.display = 'none'    
}

// New navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the page to show from data attribute
            const pageToShow = this.getAttribute('data-page');
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the selected page
            document.getElementById(`${pageToShow}-page`).classList.add('active');
            
            // Update active state of nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Hide sidebar if mobile
            hideSidebar();
        });
    });
    
    // Initialize the home page as active
    document.getElementById('home-page').classList.add('active');
    document.querySelector('.nav-link[data-page="home"]').classList.add('active');
});