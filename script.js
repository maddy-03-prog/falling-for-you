// Hero page specific logic

// --- typing animation ---
const text = "I built this just for you... because you mean everything to me.";
const typingElement = document.getElementById('typing-text');
let i = 0;

function typeWriter() {
    if (typingElement && i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}
setTimeout(typeWriter, 1000);

// --- music toggle ---
const musicBtn = document.getElementById('music-btn');
const audio = document.getElementById('bg-music');
let isPlaying = false;

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
