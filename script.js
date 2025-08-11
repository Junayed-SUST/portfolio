$(function() {
    // sticky header
    const header = $(".header-area");
    const sections = $("section");
    const navLinks = $(".header ul li a");
    const menuIcon = $(".menu_icon");
    const navbar = $(".navbar");

    function updateHeaderAndNav() {
        const scrollPosition = $(window).scrollTop();
        
        // Sticky header logic
        if (scrollPosition > 1) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
        
        // Active section logic
        let currentSectionId = "home";
        sections.each(function() {
            const sectionTop = $(this).offset().top - header.outerHeight();
            const sectionBottom = sectionTop + $(this).outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = $(this).attr("id");
            }
        });

        navLinks.removeClass("active");
        $(`a[href='#${currentSectionId}']`).addClass("active");
    }

    $(window).on('scroll', updateHeaderAndNav);

    // Initial update
    updateHeaderAndNav();

    // Smooth scrolling on nav link click
    navLinks.on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr("href");
        const offset = $(target).offset().top - header.outerHeight();

        $('html, body').animate({
            scrollTop: offset
        }, 800);
        
        // Remove active from all and add to clicked link
        navLinks.removeClass("active");
        $(this).addClass("active");
    });
    
    // Mobile menu toggle
    menuIcon.on('click', function() {
        navbar.toggleClass('open');
    });

    // ScrollReveal animations
    ScrollReveal({
        distance: "100px",
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
        origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
        origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
        origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
        origin: "bottom"
    });

    // Contact form to Google Sheet
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
    const form = document.forms['submitToGoogleSheet'];
    const msg = $("#msg");

    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.text("Message sent successfully");
                setTimeout(function () {
                    msg.text("");
                }, 5000);
                form.reset();
            })
            .catch(error => console.error('Error!', error.message));
    });
});