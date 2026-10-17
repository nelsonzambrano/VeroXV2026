// Fecha del evento: 28 de noviembre de 2026, 6:00 p. m., Bogotá
const eventDate = new Date('2026-11-28T18:00:00-05:00');

function updateCountdown() {
    const difference = Math.max(0, eventDate.getTime() - Date.now());

    const values = [
        Math.floor(difference / 86400000),
        Math.floor(difference / 3600000) % 24,
        Math.floor(difference / 60000) % 60
    ];

    document.querySelectorAll('#countdown b').forEach((element, index) => {
        if (values[index] !== undefined) {
            element.textContent = String(values[index]).padStart(2, '0');
        }
    });
}

updateCountdown();
setInterval(updateCountdown, 60000);

// Control de música
const music = document.getElementById('backgroundMusic');
const musicButton = document.getElementById('musicButton');

if (music && musicButton) {
    music.volume = 0.35;

    musicButton.addEventListener('click', async () => {
        if (music.paused) {
            try {
                await music.play();
                musicButton.textContent = '❚❚';
                musicButton.classList.add('playing');
                musicButton.setAttribute('aria-label', 'Pausar música');
                musicButton.setAttribute('title', 'Pausar música');
            } catch (error) {
                console.error('No fue posible reproducir la música:', error);
            }
        } else {
            music.pause();
            musicButton.textContent = '▶';
            musicButton.classList.remove('playing');
            musicButton.setAttribute('aria-label', 'Reproducir música');
            musicButton.setAttribute('title', 'Reproducir música');
        }
    });
}
