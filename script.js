// Testimonials Carousel
window.addEventListener('DOMContentLoaded', function() {

let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.nav-dot');
const testimonialContainer = document.querySelector('.testimonial-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Check if testimonials exist
if (testimonials.length > 0) {

    // Initialize testimonials: hide all initially
     testimonials.forEach((testimonial, index) => {
        testimonial.style.position = 'absolute';
        testimonial.style.width = '100%'; // Width is handled by CSS
        testimonial.style.top = '0';
        testimonial.style.left = '0';
        testimonial.setAttribute('data-index', index);

        // Hide all testimonials initially
        testimonial.style.display = 'none';
    });

    // Show the first testimonial on load and activate the first dot
    if (testimonials[0]) {
        testimonials[0].style.display = 'block'; // Show the first one
    }

    if (dots.length > 0) {
        dots[0].classList.add('active');
    }

    function showTestimonial(index) {
        // Ensure index is within bounds (looping carousel)
        if (index < 0) {
            index = testimonials.length - 1; // Loop to last slide on previous from first
        } else if (index >= testimonials.length) {
            index = 0; // Loop to first slide on next from last
        }

        // If the requested index is the same as the current, do nothing
        if (index === currentTestimonial) {
            return;
        }

        const outgoingTestimonial = testimonials[currentTestimonial];
        const incomingTestimonial = testimonials[index];

        // Hide the current testimonial
        if (outgoingTestimonial) {
             outgoingTestimonial.style.display = 'none';
        }

        // Remove active class from current dot
        if (dots[currentTestimonial]) {
            dots[currentTestimonial].classList.remove('active');
        }

        // Show the next testimonial
        if (incomingTestimonial) {
             incomingTestimonial.style.display = 'block'; // Show the incoming one
        }

        // Add active class to the selected dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        // Update current testimonial index
        currentTestimonial = index;
    }

    // Manual navigation with buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });
    }

    // Navigation with dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Auto-rotate testimonials
    let autoRotateInterval;

    const startAutoRotate = () => {
        autoRotateInterval = setInterval(() => {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 5000);
    };

    const stopAutoRotate = () => {
        clearInterval(autoRotateInterval);
    };

    // Start auto-rotate on load
    startAutoRotate();

    // Pause auto-rotate on hover
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopAutoRotate);
        testimonialContainer.addEventListener('mouseleave', startAutoRotate);
    }

    // Mobile swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // Minimum pixels for a swipe

    if (testimonialContainer) {
        testimonialContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        testimonialContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const distance = touchEndX - touchStartX;

            if (Math.abs(distance) > minSwipeDistance) {
                if (distance > 0) { // Swiped right
                    showTestimonial(currentTestimonial - 1);
                } else { // Swiped left
                    showTestimonial(currentTestimonial + 1);
                }
            }
        }
    }

}

});

// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
    });

    let isValid = true;
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate name
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    }

    // Validate email
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format';
        isValid = false;
    }

    // Validate message
    if (!message) {
        document.getElementById('messageError').textContent = 'Message is required';
        isValid = false;
    } else if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert('Message sent successfully! We\'ll get back to you within 24 hours.');
            
            // Reset form
            document.getElementById('contactForm').reset();
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }, 1500);
    }
});

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

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Clear form errors when user starts typing
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('input', function() {
        const errorElement = this.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}); 