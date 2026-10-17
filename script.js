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

// Música de fondo
const music = document.getElementById('backgroundMusic');
const musicButton = document.getElementById('musicButton');

if (music) {
    music.volume = 0.35;

    async function startMusic() {
        try {
            await music.play();

            if (musicButton) {
                musicButton.textContent = '♫';
                musicButton.classList.add('playing');
                musicButton.setAttribute('aria-label', 'Silenciar música');
                musicButton.setAttribute('title', 'Silenciar música');
            }

            removeUnlockListeners();
        } catch (error) {
            console.info(
                'El navegador bloqueó el autoplay. La música comenzará con la primera interacción.'
            );
        }
    }

    function removeUnlockListeners() {
        document.removeEventListener('click', startMusic);
        document.removeEventListener('touchstart', startMusic);
        document.removeEventListener('keydown', startMusic);
    }

    // Primer intento automático al cargar la página
    window.addEventListener('load', startMusic);

    // Alternativa si el navegador bloquea el autoplay
    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);
    document.addEventListener('keydown', startMusic);

    if (musicButton) {
        musicButton.addEventListener('click', async (event) => {
            event.stopPropagation();

            if (music.paused) {
                await startMusic();
            } else {
                music.pause();
                musicButton.textContent = '♪';
                musicButton.classList.remove('playing');
                musicButton.setAttribute('aria-label', 'Reproducir música');
                musicButton.setAttribute('title', 'Reproducir música');
            }
        });
    }
}
