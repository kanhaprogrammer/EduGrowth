/**
 * EduGrowth Coaching - Professional Demo Website
 * JavaScript File
 * Mobile Navigation, Form Validation, and Interactive Features
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. MOBILE NAVIGATION MENU
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            // Toggle hamburger/close icon
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset hamburger icon
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // ============================================
    // 2. SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal page anchors (not external links)
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                        
                        if (mobileMenuBtn) {
                            const icon = mobileMenuBtn.querySelector('i');
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // 3. FORM VALIDATION FOR CONTACT/ADMISSION FORMS
    // ============================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            let errorMessages = [];
            
            // Get form inputs
            const nameInput = this.querySelector('input[name="name"]');
            const phoneInput = this.querySelector('input[name="phone"]');
            const emailInput = this.querySelector('input[name="email"]');
            const courseSelect = this.querySelector('select[name="course"]');
            
            // Validation functions
            function validateName(name) {
                if (!name || name.trim().length < 2) {
                    return 'Name must be at least 2 characters long';
                }
                return '';
            }
            
            function validatePhone(phone) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
                    return 'Please enter a valid 10-digit phone number';
                }
                return '';
            }
            
            function validateEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    return 'Please enter a valid email address';
                }
                return '';
            }
            
            function validateCourse(course) {
                if (courseSelect && (!course || course === '')) {
                    return 'Please select a course';
                }
                return '';
            }
            
            // Validate each field
            if (nameInput) {
                const nameError = validateName(nameInput.value);
                if (nameError) {
                    isValid = false;
                    errorMessages.push(nameError);
                    highlightError(nameInput);
                } else {
                    removeError(nameInput);
                }
            }
            
            if (phoneInput) {
                const phoneError = validatePhone(phoneInput.value);
                if (phoneError) {
                    isValid = false;
                    errorMessages.push(phoneError);
                    highlightError(phoneInput);
                } else {
                    removeError(phoneInput);
                }
            }
            
            if (emailInput) {
                const emailError = validateEmail(emailInput.value);
                if (emailError) {
                    isValid = false;
                    errorMessages.push(emailError);
                    highlightError(emailInput);
                } else {
                    removeError(emailInput);
                }
            }
            
            if (courseSelect) {
                const courseError = validateCourse(courseSelect.value);
                if (courseError) {
                    isValid = false;
                    errorMessages.push(courseError);
                    highlightError(courseSelect);
                } else {
                    removeError(courseSelect);
                }
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                showFormSuccess(this);
                
                // In a real implementation, you would send data to server here
                console.log('Form submitted successfully:', {
                    name: nameInput ? nameInput.value : '',
                    phone: phoneInput ? phoneInput.value : '',
                    email: emailInput ? emailInput.value : '',
                    course: courseSelect ? courseSelect.value : ''
                });
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    const successMessage = this.querySelector('.success-message');
                    if (successMessage) {
                        successMessage.remove();
                    }
                }, 2000);
            } else {
                showFormErrors(this, errorMessages);
            }
        });
    });
    
    // Helper functions for form validation
    function highlightError(input) {
        input.classList.add('error');
        input.parentElement.classList.add('error');
    }
    
    function removeError(input) {
        input.classList.remove('error');
        input.parentElement.classList.remove('error');
    }
    
    function showFormSuccess(form) {
        // Remove any existing messages
        const existingError = form.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const existingSuccess = form.querySelector('.success-message');
        if (existingSuccess) existingSuccess.remove();
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="background: #10b981; color: white; padding: 12px; border-radius: 4px; margin: 10px 0; display: flex; align-items: center;">
                <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                <span>Thank you! We have received your inquiry. Our team will contact you within 24 hours.</span>
            </div>
        `;
        
        form.prepend(successDiv);
    }
    
    function showFormErrors(form, errorMessages) {
        // Remove any existing messages
        const existingError = form.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const existingSuccess = form.querySelector('.success-message');
        if (existingSuccess) existingSuccess.remove();
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        
        let errorHTML = `
            <div style="background: #ef4444; color: white; padding: 12px; border-radius: 4px; margin: 10px 0;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>
                    <strong>Please fix the following errors:</strong>
                </div>
                <ul style="margin: 0; padding-left: 20px;">
        `;
        
        errorMessages.forEach(error => {
            errorHTML += `<li>${error}</li>`;
        });
        
        errorHTML += '</ul></div>';
        errorDiv.innerHTML = errorHTML;
        
        form.prepend(errorDiv);
    }
    
    // Real-time form validation
    const formInputs = document.querySelectorAll('form input, form select, form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            removeError(this);
            
            // Remove error message when user starts typing
            const form = this.closest('form');
            const errorMessage = form ? form.querySelector('.error-message') : null;
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
    
    function validateSingleField(field) {
        const value = field.value.trim();
        let error = '';
        
        if (field.type === 'text' && field.name === 'name') {
            if (!value || value.length < 2) {
                error = 'Name must be at least 2 characters';
            }
        } else if (field.type === 'tel' || field.name === 'phone') {
            const phoneRegex = /^[0-9]{10}$/;
            if (!value || !phoneRegex.test(value.replace(/\s/g, ''))) {
                error = 'Enter valid 10-digit phone number';
            }
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                error = 'Enter valid email address';
            }
        } else if (field.tagName === 'SELECT' && field.name === 'course') {
            if (!value || value === '') {
                error = 'Please select a course';
            }
        }
        
        if (error) {
            highlightError(field);
            
            // Show tooltip error
            field.setAttribute('title', error);
        } else {
            removeError(field);
            field.removeAttribute('title');
        }
    }
    
    // ============================================
    // 4. CLICK-TO-CALL AND WHATSAPP INTEGRATION
    // ============================================
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    phoneNumbers.forEach(link => {
        link.addEventListener('click', function(e) {
            // In a real implementation, you might want to track this event
            console.log('Call initiated:', this.getAttribute('href'));
            
            // For demo purposes, show a confirmation message
            if (!this.hasAttribute('data-clicked')) {
                e.preventDefault();
                this.setAttribute('data-clicked', 'true');
                
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                const confirmCall = confirm(`Call EduGrowth Coaching at ${phoneNumber}?`);
                
                if (confirmCall) {
                    window.location.href = this.getAttribute('href');
                } else {
                    this.removeAttribute('data-clicked');
                }
            }
        });
    });
    
    // WhatsApp integration
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp.com"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('WhatsApp chat initiated');
            // In a real implementation, you might want to track this event
            // For demo, we'll just let it open normally
        });
    });
    
    // ============================================
    // 5. BUTTON HOVER EFFECTS ENHANCEMENT
    // ============================================
    const buttons = document.querySelectorAll('.btn, .course-link, .nav-link');
    
    buttons.forEach(button => {
        // Add ripple effect to buttons
        if (button.classList.contains('btn')) {
            button.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
        }
        
        // Add subtle animation on hover
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('nav-link')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('nav-link')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Remove existing ripples
        const existingRipples = element.querySelectorAll('.ripple');
        existingRipples.forEach(ripple => ripple.remove());
        
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // ============================================
    // 6. SCROLL ANIMATIONS
    // ============================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .course-card, .stat-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in-up');
            }
        });
    };
    
    // Initial check on page load
    setTimeout(animateOnScroll, 100);
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // ============================================
    // 7. ACTIVE NAV LINK BASED ON SCROLL POSITION
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
                navLink.classList.add('active');
            } else if (navLink) {
                navLink.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ============================================
    // 8. STICKY NAVIGATION ON SCROLL
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '15px 0';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ============================================
    // 9. ADD CSS FOR FORM ERRORS AND RIPPLE EFFECT
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        /* Form error styles */
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #ef4444 !important;
            background-color: #fef2f2;
        }
        
        input.error,
        select.error,
        textarea.error {
            border-color: #ef4444 !important;
            background-color: #fef2f2;
        }
        
        /* Ripple effect */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Loading state for buttons */
        .btn.loading {
            position: relative;
            color: transparent !important;
        }
        
        .btn.loading::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin-top: -10px;
            margin-left: -10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: button-loading 0.8s linear infinite;
        }
        
        @keyframes button-loading {
            to {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // 10. PAGE LOAD ANIMATION
    // ============================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ============================================
    // 11. CURRENT YEAR IN FOOTER
    // ============================================
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // ============================================
    // 12. BACK TO TOP BUTTON
    // ============================================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Style the back to top button
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 998;
    `;
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
            backToTopButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // 13. CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%cEduGrowth Coaching Demo Website', 'color: #1a365d; font-size: 16px; font-weight: bold;');
    console.log('%cThis is a professional demo website for coaching centers.', 'color: #6b7280;');
    console.log('%cAll features are functional for demonstration purposes.', 'color: #10b981;');
});

/**
 * Page-specific initialization
 * This would be called on specific pages if needed
 */
function initializePageFeatures() {
    // Add page-specific initialization here
    console.log('Page features initialized');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageFeatures);
} else {
    initializePageFeatures();
}