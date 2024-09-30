// scripts.js

// 1. Initialize Particles.js for the Particle Background
particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#a1c4fd" // Light blue for particles
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
      },
      "size": {
        "value": 3,
        "random": true,
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#a1c4fd", // Match with particles color
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "repulse": {
          "distance": 100,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });
  
  // 2. Initialize Canvas Confetti for Celebrations
  document.addEventListener('DOMContentLoaded', function() {
    // No longer handling button clicks here as Bootstrap handles modal toggling
  });
  
  // 3. Form Validation and Submission Handling
  (function() {
    'use strict';
  
    // Fetch the contact form
    const contactForm = document.getElementById('contactForm');
  
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
  
        if (contactForm.checkValidity()) {
          // Optionally, send form data to the server via AJAX
          // Example using fetch:
          /*
          const formData = new FormData(contactForm);
          fetch('/api/contact', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            // Handle success
            showToast('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
            contactForm.classList.remove('was-validated');
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
            showToast('There was an error submitting your message. Please try again later.');
          });
          */
  
          // For demonstration, we'll just show a toast
          showToast('Thank you for your message! We will get back to you shortly.');
          contactForm.reset();
          contactForm.classList.remove('was-validated');
        } else {
          contactForm.classList.add('was-validated');
        }
      }, false);
    }
  })();
  
  // 4. Smooth Scrolling for Navigation Links
  (function() {
    const navLinks = document.querySelectorAll('a.nav-link');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.hash !== '') {
          e.preventDefault();
  
          const target = document.querySelector(this.hash);
  
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 70, // Adjust for fixed navbar height
              behavior: 'smooth'
            });
          }
        }
      });
    });
  })();
  
  // 5. Animate Elements on Scroll using Intersection Observer
  (function() {
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');
  
    const appearOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
  
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions);
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  
    sliders.forEach(slider => {
      appearOnScroll.observe(slider);
    });
  })();
  
  // 6. Easter Egg - Konami Code Implementation
  (function() {
    const secretCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    let inputSequence = [];
  
    window.addEventListener('keydown', function(e) {
      inputSequence.push(e.keyCode);
      if (inputSequence.length > secretCode.length) {
        inputSequence.shift();
      }
  
      if (inputSequence.toString() === secretCode.toString()) {
        // Trigger an awesome surprise, like fireworks
        confetti({
          particleCount: 200,
          spread: 160,
          origin: { y: 0.6 }
        });
        showToast('🎮 Konami Code Activated! Enjoy the surprise! 🎉');
      }
    });
  })();
  
  // 7. Tooltip Initialization for Enhanced User Experience
  (function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  })();
  
  // 8. Dynamic Background Color Change on Scroll
  (function() {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollPosition / maxScroll;
  
      // Clamp scrollFraction between 0 and 1
      const clampedFraction = Math.min(Math.max(scrollFraction, 0), 1);
  
      // Transition from white to black
      const colorValue = Math.floor(255 - 255 * clampedFraction);
      document.body.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    });
  })();
  
  // 9. Google Sign-In Credential Response Handler
  function handleCredentialResponse(response) {
      // Decode the credential response (JWT)
      const data = jwt_decode(response.credential);
      
      // Example: Log user information
      console.log("User ID: " + data.sub);
      console.log("User Name: " + data.name);
      console.log("User Email: " + data.email);
      
      // TODO: Send the credential to your server for verification and session creation
  }
  
  // 10. Utility Function to Show Toast Notifications
  function showToast(message) {
      const toastBody = document.querySelector('#toastBody');
      const toastEl = document.getElementById('liveToast');
      const toast = new bootstrap.Toast(toastEl);
      toastBody.textContent = message;
      toast.show();
  }
  
  // 11. Handle "Done" Button Click in QR Modal
  (function() {
      const doneButton = document.getElementById('doneButton');
      const qrModal = new bootstrap.Modal(document.getElementById('qrModal'), {
          keyboard: false
      });
  
      doneButton.addEventListener('click', function() {
          // Hide the QR Modal
          qrModal.hide();
  
          // Show "Congrats" notification
          showToast('🎉 Congratulations! Your booking is confirmed. 🎉');
  
          // Trigger confetti
          confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
          });
      });
  })();
  