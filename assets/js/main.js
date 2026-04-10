document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const spans = document.querySelectorAll('#hamburger span');
    const body = document.body;

    const toggleMenu = (forceClose = false) => {
        // If we force close, or if the menu is currently open (doesn't have the translate class)
        const isClosing = forceClose || !mobileMenu.classList.contains('translate-x-full');

        if (isClosing) {
            // CLOSE STATE
            mobileMenu.classList.add('translate-x-full');
            body.classList.remove('overflow-hidden');
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        } else {
            // OPEN STATE
            mobileMenu.classList.remove('translate-x-full');
            body.classList.add('overflow-hidden');
            spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
        }
    };

    menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    // Auto-close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });
});