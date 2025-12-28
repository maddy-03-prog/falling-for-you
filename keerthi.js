import confetti from 'canvas-confetti';

document.addEventListener("DOMContentLoaded", () => {
    // 6. ADD CONSOLE LOGS FOR DEBUGGING
    console.log("DOM loaded, initializing Keerthi's letter...");

    // --- Configuration & Selectors ---
    const envelope = document.getElementById("envelope");
    const envelopeSection = document.getElementById("envelope-section");
    const letterSection = document.getElementById("letter-section");
    const typebox = document.getElementById("typewriter-text");
    const memoriesSection = document.getElementById("memories-section");
    const photoSection = document.getElementById("photo-section");
    const proposalSection = document.getElementById("proposal-section");
    const successSection = document.getElementById("success-section");

    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");

    const musicBtn = document.getElementById("music-btn");
    const audio = document.getElementById("bg-music");
    let audioPlaying = false;

    // --- Audio Logic ---
    const startAudio = () => {
        if (audioPlaying) return;

        // Ensure we set time only if we haven't started yet
        if (audio.currentTime < 60) {
            audio.currentTime = 60;
        }

        audio.play().then(() => {
            console.log("Audio playing successfully");
            audioPlaying = true;
            updateMusicIcon();
            document.removeEventListener('click', startAudio);
        }).catch(e => {
            console.log("Audio play failed (waiting for interaction):", e);
        });
    };

    // 1. Try to play immediately (often blocked)
    // We need to wait for metadata to know we can seek
    if (audio.readyState >= 1) {
        startAudio();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            startAudio();
        });
    }

    // 2. Fallback: Play on any first user interaction
    document.addEventListener('click', startAudio);
    // Also try on envelope click explicitly just in case propagation issues
    if (envelope) envelope.addEventListener('click', startAudio);


    // Preserve the exact letter content
    const letterContent = `Hey my Keerthi ❤️,

It’s been 5 years…
5 years of smiles, silly fights,
late-night talks, and quiet understanding.

Somewhere between all those moments,
you became my favorite person,
my comfort, my peace, my home.

Your cuteness still makes me smile like day one,
and your presence still feels like the safest place.

I don’t promise perfection,
but I promise love that listens,
hands that hold you tight,
and a heart that chooses you—always.

With you, I don’t want a chapter.
I want the whole story.
I want every tomorrow.
I want forever.`;

    // --- 1. ENVELOPE CLICK FIX ---
    if (envelope) {
        // Attach click event listener AFTER DOM loads
        envelope.addEventListener("click", openLetter);
    }

    function openLetter() {
        console.log("Envelope clicked"); // Debug log

        // Add open class for CSS animation
        envelope.classList.add("open");

        // Attempt to play music on user interaction
        toggleMusic(true);

        // Transition to letter section after envelope animation (approx 800ms-1s)
        setTimeout(() => {
            hideSection(envelopeSection);
            showSection(letterSection);
            startTyping(); // 2. Letter typing start
        }, 1000);
    }

    // --- 2. LETTER TYPING FUNCTION ---
    function startTyping() {
        console.log("Typing started"); // Debug log
        if (!typebox) return;

        typebox.innerHTML = ""; // Clear existing text
        let i = 0;

        function type() {
            if (i < letterContent.length) {
                // Handle newlines by converting them to <br> for HTML if strictly needed, 
                // wbut style white-space: pre-line is usually better. 
                // We'll just append characters.
                typebox.textContent += letterContent.charAt(i);
                // Using textContent and CSS 'white-space: pre-line' in 'handwritten-text' class handles formatting.

                i++;
                setTimeout(type, 50); // Typing speed
            } else {
                console.log("Typing finished");
                // Reveal subsequent sections automatically
                revealMemories();
            }
        }
        type();
    }

    function revealMemories() {
        // Show Memories Section
        setTimeout(() => {
            showSection(memoriesSection);
        }, 1000);

        // Show Photos Section
        setTimeout(() => {
            showSection(photoSection);
        }, 3000);

        // Show Proposal Section
        setTimeout(() => {
            showSection(proposalSection);
            // Smooth scroll to proposal
            proposalSection.scrollIntoView({ behavior: "smooth" });
        }, 5000);
    }

    // --- 3. SECTION VISIBILITY LOGIC ---
    function showSection(element) {
        if (!element) return;
        element.classList.remove("hidden");
        element.classList.add("active");
        element.style.display = "flex"; // Ensure visible
    }

    function hideSection(element) {
        if (!element) return;
        element.classList.remove("active");
        element.classList.add("hidden");
        setTimeout(() => {
            element.style.display = "none";
        }, 1000); // Wait for transition
    }

    // --- 4. YES BUTTON FIX ---
    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            console.log("YES clicked"); // Debug log

            // 5. CONFETTI IMPLEMENTATION
            fireConfetti();

            // Show Success / YES message
            // Using successSection as the container for the "Yes message"
            hideSection(proposalSection);
            showSection(successSection);
        });
    }

    // Setup No Button (Playful interaction)
    if (noBtn) {
        noBtn.addEventListener("mouseover", moveNoButton);
        noBtn.addEventListener("click", (e) => {
            e.preventDefault();
            moveNoButton();
        });
    }

    function moveNoButton() {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        noBtn.style.position = "fixed";
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    // --- 5. CONFETTI IMPLEMENTATION ---
    function fireConfetti() {
        const duration = 5 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            // Launch confetti from left and right edges
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

    // --- Music Control ---
    function toggleMusic(forcePlay = false) {
        if (forcePlay) {
            audio.play().then(() => {
                audioPlaying = true;
                updateMusicIcon();
            }).catch(e => console.log("Audio play blocked:", e));
        } else {
            if (audioPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            audioPlaying = !audioPlaying;
            updateMusicIcon();
        }
    }

    function updateMusicIcon() {
        if (musicBtn) {
            musicBtn.innerHTML = audioPlaying
                ? '<i class="fas fa-volume-up"></i>'
                : '<i class="fas fa-volume-mute"></i>';
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener("click", () => toggleMusic());
    }
});
