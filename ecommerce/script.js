document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Animations
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-in-out-cubic'
    });

    // 2. Navbar & Sticky Cart Logic
    const navbar = document.getElementById('navbar');
    const stickyBar = document.getElementById('shop-bar');
    
    window.addEventListener('scroll', () => {
        // Navbar blur effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show sticky Add to Cart bar when scrolling past the hero button
        // 500 is roughly past the main hero content
        if (window.scrollY > 600) {
            stickyBar.classList.add('visible');
        } else {
            stickyBar.classList.remove('visible');
        }
    });

    // 3. Color Selection Logic
    const colorBtns = document.querySelectorAll('.color-btn');
    const colorNameDisplay = document.getElementById('color-name');
    const toastColorDisplay = document.getElementById('toast-color');
    let selectedColor = "Matte Black";

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            colorBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            // Update Text
            selectedColor = btn.getAttribute('data-color');
            colorNameDisplay.textContent = selectedColor;
            toastColorDisplay.textContent = selectedColor;
            
            // Optional: You could swap out the main product image here based on color
        });
    });

    // 4. Cart Simulation Logic
    const addBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartBadges = document.querySelectorAll('.cart-badge');
    const toast = document.getElementById('cart-toast');
    const toastClose = document.getElementById('toast-close');
    let cartCount = 0;
    let toastTimeout;

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animate button briefly
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Adding...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                
                // Update Cart Count
                cartCount++;
                cartBadges.forEach(badge => {
                    badge.textContent = cartCount;
                    // Pop animation
                    badge.style.transform = 'scale(1.5)';
                    setTimeout(() => badge.style.transform = 'scale(1)', 200);
                });

                // Show Toast
                toast.classList.add('show');
                
                // Auto hide toast
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            }, 600); // Simulate network/processing delay
        });
    });

    toastClose.addEventListener('click', () => {
        toast.classList.remove('show');
    });

    // Mobile menu toggle
    document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
        alert('Mobile navigation opened!');
    });
});
