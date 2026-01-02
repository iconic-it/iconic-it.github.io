// Initialize sliders for each slider container
function initSliders() {
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
}

// Update active state for both desktop and mobile nav links
function updateActiveNavLinks(activePage) {
    // Update desktop nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === activePage) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === activePage) {
            link.classList.add('active');
        }
    });
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pageToShow = this.getAttribute('data-page');
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the selected page
            const targetPage = document.getElementById(`${pageToShow}-page`);
            if (targetPage) {
                targetPage.classList.add('active');
                
                // If events page, initialize events
                if (pageToShow === 'events') {
                    initEventsPage();
                }
            }
            
            // Update active state for both desktop and mobile nav links
            updateActiveNavLinks(pageToShow);
        });
    });
    
    // Initialize the home page as active
    document.getElementById('home-page').classList.add('active');
    updateActiveNavLinks('home');
}

// Initialize events page functionality
function initEventsPage() {
    // Add event listeners to event tiles if they exist
    const eventTiles = document.querySelectorAll('.event-tile');
    if (eventTiles.length > 0) {
        eventTiles.forEach(tile => {
            tile.addEventListener('click', function() {
                const eventId = this.getAttribute('data-event');
                showEventDetails(eventId);
            });
        });
        
        // Make sure events grid is visible
        const eventsGrid = document.querySelector('.events-grid');
        if (eventsGrid) {
            eventsGrid.style.display = 'grid';
        }
        
        // Make sure events header is visible
        const eventsHeader = document.querySelector('.glass-container');
        if (eventsHeader) {
            eventsHeader.style.display = 'block';
        }
        
        // Hide all event details
        hideEventDetails();
    }
}

// Show event details
function showEventDetails(eventId) {
    // Hide events grid and header
    const eventsGrid = document.querySelector('.events-grid');
    const eventsHeader = document.querySelector('.glass-container');
    const eventDetail = document.getElementById(`event-detail-${eventId}`);
    
    if (eventsGrid) eventsGrid.style.display = 'none';
    if (eventsHeader) eventsHeader.style.display = 'none';
    
    // Hide all event details first
    document.querySelectorAll('.event-detail').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show the selected event detail
    if (eventDetail) {
        eventDetail.classList.add('active');
    }
    
    // Re-initialize sliders for the event detail page
    initSliders();
}

// Hide event details and show events grid
function hideEventDetails() {
    // Hide all event details
    document.querySelectorAll('.event-detail').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show events grid and header if they exist
    const eventsGrid = document.querySelector('.events-grid');
    const eventsHeader = document.querySelector('.glass-container');
    
    if (eventsGrid) eventsGrid.style.display = 'grid';
    if (eventsHeader) eventsHeader.style.display = 'block';
}

// Lazy load images
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
        
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Open mobile menu
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle mobile navigation clicks
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pageToShow = this.getAttribute('data-page');
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the selected page
            const targetPage = document.getElementById(`${pageToShow}-page`);
            if (targetPage) {
                targetPage.classList.add('active');
                
                // If events page, initialize events
                if (pageToShow === 'events') {
                    initEventsPage();
                }
            }
            
            // Update active state of both desktop and mobile nav links
            updateActiveNavLinks(pageToShow);
            
            // Close mobile menu
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Enhanced contact page interactions
function initContactPageAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    // Add click effects to contact items
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Enhanced form interactions
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission animation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-button');
            const originalText = submitBtn.innerHTML;
            
            // Loading animation
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, #4361ee, #7209b7)';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Helper function for navigation
function navigateToPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // If events page, initialize events
        if (pageName === 'events') {
            initEventsPage();
        }
    }
    
    // Update navigation
    updateActiveNavLinks(pageName);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Membership and navigation functionality
function initMembership() {
    console.log('Setting up membership buttons...');
    
    // Function to navigate to membership page
    function goToMembershipPage(event) {
        event.preventDefault();
        navigateToPage('membership');
    }
    
    // Function to navigate to about page
    function goToAboutPage(event) {
        event.preventDefault();
        navigateToPage('about');
    }
    
    // Set up Join Us button
    const joinBtn = document.querySelector('.register-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', goToMembershipPage);
        console.log('Join Us button configured');
    }
    
    // Set up Learn More About Us button
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', goToAboutPage);
        console.log('Learn More button configured');
    }
    
    // Set up Membership button in black box
    const boxButtons = document.querySelectorAll('.box-button');
    if (boxButtons.length >= 2) {
        // The second button should be Membership
        const membershipBtn = boxButtons[1];
        membershipBtn.addEventListener('click', goToMembershipPage);
        console.log('Membership box button configured');
        
        // Set up Events button (first button)
        boxButtons[0].addEventListener('click', function(event) {
            event.preventDefault();
            navigateToPage('events');
        });
        
        // Set up Contact button (third button if exists)
        if (boxButtons[2]) {
            boxButtons[2].addEventListener('click', function(event) {
                event.preventDefault();
                navigateToPage('contact');
            });
        }
    }
}

// Back button functionality for event details
function initEventBackButtons() {
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            hideEventDetails();
        });
    });
}

// Profile modal functionality for ALL team cards
function initProfileModals() {
    console.log('Initializing profile modals...');
    
    const modal = document.getElementById('profile-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Select ALL team cards (including moderators and current panel members)
    const teamCards = document.querySelectorAll('.team-card');

    if (!modal) {
        console.error('Profile modal not found!');
        return;
    }

    console.log(`Found ${teamCards.length} total team cards`);

    // Data for ALL members (including moderators)
    const memberData = {
        'rashid': {
            name: 'MD Abdur Rashid',
            role: 'Moderator',
            bio: 'Experienced educator and mentor with a passion for technology education.',
            email: 'rashidict71@gmail.com',
            phone: '+880 1911 520871',
            class: 'Faculty Member',
            education: 'M.Sc. in Computer Science, University of Dhaka',
            skills: ['Teaching', 'Curriculum Development', 'Student Mentorship', 'ICT Education'],
        },
        'shohag': {
            name: 'NAS Shohag',
            role: 'Co-Moderator',
            bio: 'Technology enthusiast and educator committed to fostering innovation among students.',
            email: 'nas.shoohag@gmail.com',
            phone: '+880 1748 648000',
            class: 'Faculty Member',
            education: 'Dhaka International University - DIU',
            skills: ['Programming', 'Digital Literacy', 'Technical Training'],
        },
		'reham': {
			name: 'Reham Mursalin',
			role: 'President',
			bio: 'Never Compromise Self Respect',
			email: 'rehammursalin2008@gmail.com',
			phone: '+880 1567 904190',
			class: 'Class X',
			education: 'BAF Shaheen College Kurmitola, Science Group',
			skills: ['Leadership', 'Python', 'Public Speaking', 'Event Management'],
        },
        'tanha': {
            name: 'Syeda Tanha',
            role: 'Vice President',
            bio: 'Aspiring Developer and Crochet Hashira',
            email: 'Via Club Contact',
            phone: 'Via Club Contact',
            class: 'Class X',
            education: 'Bangladesh Air Force Shaheen College Kurmitola, Science Group',
            skills: ['Web Development', 'Python', 'Team Management', 'Event Organizing'],
        },
        'fuad': {
            name: 'Muhtasim Fuad',
            role: 'General Secretary',
            bio: 'Technical enthusiast with strong organizational skills.',
            email: 'muhtasimfuad862@gmail.com ',
            phone: '+880 1627 276575',
            class: 'Class X',
            education: 'Bangladesh Air Force Shaheen College Kurmitola, Science Group',
            skills: ['Team collaboration', 'Event Management', 'Python', 'HTML', 'CSS'],
        },
        'zakah': {
			name: 'Zakah Nur',
			role: 'Administrative Secretary',
			bio: 'Efficient administrator with attention to detail and skilled graphics designer .',
			email: 'Via Club Contact',
			phone: 'Via Club Contact',
			class: 'X',
			education: 'BAF Shaheen College Kurmitola, Science Group',
			skills: ['Administration', 'Documentation', 'Management', 'Graphics Designing', 'Caption Writing'],
        },
        'sadman': {
            name: 'Sadman Rahman',
            role: 'Organizing Secretary',
            bio: 'I am a Hacker!',
            email: 'sadman0050g@gmail.com',
            phone: '+880 1332 415635',
            class: 'Class X',
            education: 'Bangladesh Air Force Shaheen College Kurmitola, Science Group',
            skills: ['Python', 'Javascript', 'HTML', 'CSS', 'Kali Linux', 'Cyber Security'],
        },
        'iffat': {
            name: 'Iffat A. Labonno',
            role: 'Treasurer',
            bio: 'Nothingggg!!!!',
            email: 'Via Club Contact',
            phone: 'Via Club Contact',
            class: 'Class X',
            education: 'Bangladesh Air Force Shaheen College Kurmitola, Science Group',
            skills: ['Finance Management', 'Mathmetics', 'Critical Problem Solving'],
        },
        'polash': {
            name: 'SH Polash',
            role: 'Senior Programmer',
            bio: 'Full-stack developer & AI enthusiast!!',
            email: 'dtproject874@gmail.com',
            phone: 'Via Club Contact',
            class: 'Class X',
            education: 'Bangladesh Air Force Shaheen College Kurmitola, Science Group | Self-taught Developer',
            skills: ['Python', 'JavaScript', 'AI/ML'],
        },
        'nashid': {
            name: 'SA Nashid',
            role: 'Senior Designer',
            bio: "Don't underestimate me",
            email: 'somethinglike7415@gmail.com',
            phone: '+880 1678 601751',
            class: 'Class X',
            education: 'BAF Shaheen College Kurmitola, Science Group',
            skills: ['UI/UX Design', 'Graphic Design', 'Adobe Creative Suite'],
        },
        'nirob': {
            name: 'Nirob Hasan',
            role: 'Senior Analytic',
            bio: 'Data analyst with strong problem-solving skills.',
            email: 'Via Club Contact',
            phone: 'Via Club Contact',
            class: 'Class X',
            education: 'BAF Shaheen College Kurmitola, Science Group',
            skills: ['Data Analysis', 'Statistics'],
        },
        'rakib': {
			name: 'Rakib Shahriar',
            role: 'Asst Designer',
            bio: '​Always learning. Always leveling up.',
            email: 'rakibshahriar2008@gmail.com',
            phone: 'Via Club Contact',
            class: 'X',
            education: 'Bangladesh Air Force Shaheen College Kurmitola, Science Group',
            skills: ['Editing', 'Designing', 'Programing']
        },
        'khalid': {
			name: 'Khalid Bin Solaiman',
            role:'Asst Analytic',
            bio: "Hey! it's Khalid. I am expert in cyber security.",
            email: 'khalidbafsk@gmail.com',
            phone: '+880 1778 734329',
            class: 'Class VIII',
            education: 'Bangladesh Air Force Shaheen College Kurmitola',
            skills: ['Cyber Security  expert']
        },
        'mohaiminul': {
            name: 'Mohaiminul Islam',
            role: 'Ordinator',
            bio: 'Organized coordinator with excellent planning skills.',
            email: 'muhin2020bafsk@gmail.com',
            phone: '+880 1618 116689',
            class: 'Class X',
            education: 'Bangladesh Air Force Shaheen College Kurmitola, Arts Group',
            skills: ['Designing', 'Analytic', 'leadership'],
        },
        'tahsin': {
			name: 'Tahasin Khan',
            role : 'Asst Designer',
            bio: '(Plant lover)(gamer)(love to make anything new )',
            email: 'tahasinkhan201029@gmail.com',
            phone: '+880 1794 200074',
            class: 'Class IX',
            education: 'Bangladesh Air Force Shaheen College Kurmitola, Science Group',
            skills: ['graphics design', 'leadership', 'flunt in 2 language (Eng and Ban)'],
        }
    };

    // Handle ALL team cards (both with and without data-member)
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            let data;
            
            if (memberId && memberData[memberId]) {
                // Found member with data-member attribute
                data = memberData[memberId];
                console.log('Found data for:', data.name);
            } else {
                // Handle cards without data-member (like moderators)
                const name = this.querySelector('h4').textContent;
                const role = this.querySelector('.team-role').textContent;
                
                // Create basic data object for moderators
                data = {
                    name: name,
                    role: role,
                    bio: `${role} at ICONIC IT Club`,
                    email: 'Via Club Contact',
                    phone: 'Via Club Contact',
                    class: 'Faculty Member',
                    education: 'Faculty at BAF Shaheen College Kurmitola',
                    skills: ['Teaching', 'Mentoring', 'ICT Education', 'Student Guidance']
                };
                console.log('Created data for moderator:', name);
            }
            
            if (data) {
                // Basic info
                document.getElementById('modal-name').textContent = data.name;
                document.getElementById('modal-role').textContent = data.role;
                document.getElementById('modal-email').textContent = data.email;
                document.getElementById('modal-phone').textContent = data.phone;
                document.getElementById('modal-class').textContent = data.class;
                document.getElementById('modal-bio').textContent = data.bio;
                
                // Resume sections
                document.getElementById('modal-education').textContent = data.education || 'No education information available';
                document.getElementById('modal-skills').innerHTML = createSkillsHTML(data.skills);
                
                // Set avatar image
                const avatarImg = this.querySelector('.team-avatar img');
                if (avatarImg && avatarImg.src) {
                    document.getElementById('modal-avatar').src = avatarImg.src;
                } else {
                    document.getElementById('modal-avatar').src = '';
                }
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                console.log('No data found for this member');
            }
        });
    });

    // Helper functions for resume content
    function createSkillsHTML(skills) {
        if (!skills || skills.length === 0) return '<p>No skills listed</p>';
        return `<div class="skills-tags">${skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('')}</div>`;
    }

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Panel Navigation Functionality
function initPanelNavigation() {
    const panelTabs = document.querySelectorAll('.panel-tab');
    const panelContents = document.querySelectorAll('.panel-content');
    
    panelTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            
            // Remove active class from all tabs and contents
            panelTabs.forEach(t => t.classList.remove('active'));
            panelContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetPanel = document.getElementById(`panel-${panelId}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}


// Initialize everything when DOM is loaded
// At the bottom of script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing...');
    
    initSliders();
    initNavigation();
    initMobileMenu();
    initContactPageAnimations();
    initMembership();
    initEventBackButtons();
    lazyLoadImages();
    initProfileModals();
    initPanelNavigation();
    
    // REMOVED: initCustomSlider();
    initNewSlider(); // ADDED: Initialize the new slider
    
    const eventsPage = document.getElementById('events-page');
    if (eventsPage && eventsPage.classList.contains('active')) {
        initEventsPage();
    }
    
    console.log('All components initialized successfully');
});


// Paste this entire function into your script.js file

function initNewSlider() {
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const carousel = document.querySelector('.carousel');
    const list = document.querySelector('.list');
    const runningTime = document.querySelector('.carousel .timeRunning');

    // Make sure elements exist before adding listeners
    if (!nextBtn || !prevBtn || !carousel || !list || !runningTime) {
        console.log('New slider elements not found. Slider not initialized.');
        return;
    }

    const timeRunning = 3000; // Time for slide transition animation
    const timeAutoNext = 7000; // Time until the next slide automatically shows

    nextBtn.onclick = function() {
        showSlider('next');
    }

    prevBtn.onclick = function() {
        showSlider('prev');
    }

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    function resetTimeAnimation() {
        if (runningTime) {
            runningTime.style.animation = 'none';
            //offsetHeight is a trick to trigger a DOM reflow, ensuring the animation restarts
            void runningTime.offsetHeight; 
            runningTime.style.animation = `runningTime ${timeAutoNext / 1000}s linear 1 forwards`;
        }
    }

    function showSlider(type) {
        const sliderItemsDom = list.querySelectorAll('.carousel .list .item');
        if (type === 'next') {
            list.appendChild(sliderItemsDom[0]);
            carousel.classList.add('next');
        } else {
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            carousel.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);

        resetTimeAnimation();
    }
    
    // Add keyframe animation dynamically for progress bar
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `@keyframes runningTime { from{width: 0%;} to{width: 100%;} }`;
    document.head.appendChild(styleSheet);

}
