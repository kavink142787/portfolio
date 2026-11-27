
// ======================================
// K. KAVIN - PERSONAL PORTFOLIO
// JavaScript functionality
// ======================================

// Check whether the user prefers reduced motion
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// ======================================
// 1. MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// ======================================
// 2. DARK AND LIGHT MODE
// ======================================

const themeToggle = document.getElementById("themeToggle");

// Load saved theme, if available
const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");

    const isLight =
        document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "🌙" : "☀️";

    localStorage.setItem(
        "portfolioTheme",
        isLight ? "light" : "dark"
    );
});


// ======================================
// 3. TYPING ANIMATION
// ======================================

const typingText = document.getElementById("typingText");

const jobTitles = [
    "College Student",
    "Frontend Developer",
    "Python Programmer",
    "AI Enthusiast",
    "Creative Learner"
];

let titleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    if (prefersReducedMotion) {
        typingText.textContent = jobTitles[0];
        return;
    }

    const currentTitle = jobTitles[titleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent =
        currentTitle.substring(0, characterIndex);

    let delay = deleting ? 55 : 100;

    // Finished typing a title
    if (!deleting && characterIndex === currentTitle.length) {
        deleting = true;
        delay = 1300;
    }

    // Finished deleting a title
    else if (deleting && characterIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % jobTitles.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


// ======================================
// 4. SCROLL REVEAL ANIMATION
// ======================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window &&
    !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

} else {
    // Show all content if reduced motion is preferred
    // or IntersectionObserver is unavailable.
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// ======================================
// 5. ANIMATED SKILL PROGRESS BARS
// ======================================

const skillSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".skill-progress");

function showSkillBars() {

    skillBars.forEach(function (bar) {

        const progress = bar.getAttribute("data-progress");

        // Limit the value between 0 and 100
        const safeProgress = Math.max(
            0,
            Math.min(100, Number(progress) || 0)
        );

        bar.style.width = safeProgress + "%";

    });

}

if ("IntersectionObserver" in window &&
    !prefersReducedMotion) {

    const skillObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    showSkillBars();
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.25
        }
    );

    skillObserver.observe(skillSection);

} else {
    showSkillBars();
}


// ======================================
// 6. CONTACT FORM VALIDATION
// ======================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

contactForm.addEventListener("submit", function (event) {

    // Stop the browser from submitting the form
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    formMessage.className = "form-message";

    // Check empty fields
    if (!name || !email || !message) {

        showFormMessage(
            "Please fill in all the fields.",
            "error"
        );

        return;
    }

    // Validate email format
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showFormMessage(
            "Please enter a valid email address.",
            "error"
        );

        emailInput.focus();
        return;
    }

    // Validate minimum message length
    if (message.length < 10) {

        showFormMessage(
            "Please enter a message with at least 10 characters.",
            "error"
        );

        messageInput.focus();
        return;
    }

    // Frontend demonstration only
    showFormMessage(
        "Thank you, " + name +
        "! Your form passed validation. This demo does not send emails.",
        "success"
    );

    contactForm.reset();

});

function showFormMessage(message, type) {

    formMessage.textContent = message;
    formMessage.classList.add(type);

}


// ======================================
// 7. CURRENT COPYRIGHT YEAR
// ======================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ======================================
// 8. ACTIVE NAVIGATION LINK
// ======================================

const pageSections = document.querySelectorAll("main section[id]");
const navigationItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const navigationObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navigationItems.forEach(function (link) {
                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {
                            link.classList.add("active");
                        }
                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    pageSections.forEach(function (section) {
        navigationObserver.observe(section);
    });

}


// ======================================
// END OF PORTFOLIO JAVASCRIPT
// ======================================
