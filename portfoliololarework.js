"use strict"
document.querySelectorAll('.carousel').forEach((carousel) => {
    const container = carousel.querySelector('.carousel-container');
    const items = carousel.querySelectorAll('.carousel-item');
    const leftArrow = carousel.querySelector('.carousel-arrow.left');
    const rightArrow = carousel.querySelector('.carousel-arrow.right');

    let currentIndex = 0;
    const totalItems = items.length;

    // Function to calculate how many items should be visible at once
    function getItemsPerSlide() {
        // Get the width of the carousel and calculate how many items can fit
        const carouselWidth = container.offsetWidth;
        if (carouselWidth <= 600) {
            return 1; // For small screens, only 1 item visible
        } else {
            return 2; // For larger screens, show 3 items
        }
    }

    // Update the carousel's position based on the currentIndex and itemsPerSlide
    function updateCarousel() {
        const itemsPerSlide = getItemsPerSlide();
        const offset = -currentIndex * (100 / itemsPerSlide); // Shift by percentage for the number of visible items
        container.style.transform = `translateX(${offset}%)`;
    }

    // Auto slide functionality
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % (totalItems - getItemsPerSlide() + 1); // Loop based on visible items
        updateCarousel();
    }, 3000); // Auto slide every 5 seconds

    // Event listener for left arrow
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems - getItemsPerSlide() + 1) % (totalItems - getItemsPerSlide() + 1);
        updateCarousel();
        resetAutoSlide();
    });

    // Event listener for right arrow
    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % (totalItems - getItemsPerSlide() + 1);
        updateCarousel();
        resetAutoSlide();
    });

    // Reset the auto slide timer whenever the user manually clicks an arrow
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % (totalItems - getItemsPerSlide() + 1);
            updateCarousel();
        }, 5000);
    }
});

