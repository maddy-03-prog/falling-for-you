import confetti from 'canvas-confetti';

// --- scroll reveal ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));


// --- music toggle ---
const musicBtn = document.getElementById('music-btn');
const audio = document.getElementById('bg-music');
let isPlaying = false;

// Attempt to play music automatically on page load if allowed, or maintain state
// For now, simple toggle
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play().catch(e => alert("Please add an MP3 file to the project folder and update index.html!"));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// --- runaway no button ---
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const proposalSection = document.getElementById('proposal');

if (noBtn && proposalSection) {
    // Desktop hover
    noBtn.addEventListener('mouseover', moveButton);
    // Mobile touch
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // prevent click
        moveButton();
    });
}

function moveButton() {
    const containerRect = proposalSection.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Switch to absolute positioning if not already
    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
    }

    // Move slightly more aggressively
    const maxX = window.innerWidth - btnRect.width - 50;
    const maxY = 300;

    noBtn.style.left = Math.max(20, Math.random() * maxX) + 'px';
    noBtn.style.top = Math.max(20, Math.random() * maxY) + 'px';
}

// --- celebration ---
const modal = document.getElementById('success-message');
const closeModal = document.getElementById('close-modal');

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        fireConfetti();
        if (modal) modal.classList.remove('hidden');
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

function fireConfetti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4b6e', '#d4af37', '#ffffff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4b6e', '#d4af37', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
