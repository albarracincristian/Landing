document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- Brands Tabs Logic (With Auto-Play) ---
    const brandTabs = document.querySelectorAll('.brand-tab:not(.ji-tab)');
    const brandPanels = document.querySelectorAll('.brand-panel:not(.ji-panel)');
    let brandInterval;

    const activateBrandTab = (index) => {
        brandTabs.forEach(t => t.classList.remove('active'));
        brandPanels.forEach(p => p.classList.remove('active'));

        const tab = brandTabs[index];
        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        const targetPanel = document.getElementById(`panel-${target}`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    };

    if (brandTabs.length > 0) {
        let currentBrandIndex = 0;

        // Auto-cycle every 2.5 seconds
        brandInterval = setInterval(() => {
            currentBrandIndex = (currentBrandIndex + 1) % brandTabs.length;
            activateBrandTab(currentBrandIndex);
        }, 2500);

        brandTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Pause auto-play on manual override
                clearInterval(brandInterval);
                activateBrandTab(index);
            });
        });
    }

    // --- J&I Brands Tabs Logic (With Auto-Play) ---
    const jiTabs = document.querySelectorAll('.ji-tab');
    const jiPanels = document.querySelectorAll('.ji-panel');
    let jiInterval;

    const activateJiTab = (index) => {
        jiTabs.forEach(t => t.classList.remove('active'));
        jiPanels.forEach(p => p.classList.remove('active'));

        const tab = jiTabs[index];
        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        const targetPanel = document.getElementById(`panel-${target}`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    };

    if (jiTabs.length > 0) {
        let currentJiIndex = 0;

        // Auto-cycle every 2.5 seconds
        jiInterval = setInterval(() => {
            currentJiIndex = (currentJiIndex + 1) % jiTabs.length;
            activateJiTab(currentJiIndex);
        }, 2500);

        jiTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Pause auto-play on manual override
                clearInterval(jiInterval);
                activateJiTab(index);
            });
        });
    }
    // --- Reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('.fade-up, .reveal-up, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point offset

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Initial check on load
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // --- Load the Hero immediately ---
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => {
            el.classList.add('active');
        });
    }, 100);
});
