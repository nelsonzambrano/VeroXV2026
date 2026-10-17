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

function updateMusicButton(isPlaying) {
    if (!musicButton) {
        return;
    }

    if (isPlaying) {
        musicButton.textContent = '❚❚';
        musicButton.classList.add('playing');
        musicButton.setAttribute('aria-label', 'Pausar música');
        musicButton.setAttribute('title', 'Pausar música');
    } else {
        musicButton.textContent = '▶';
        musicButton.classList.remove('playing');
        musicButton.setAttribute('aria-label', 'Reproducir música');
        musicButton.setAttribute('title', 'Reproducir música');
    }
}

async function startMusic() {
    if (!music || !music.paused) {
        return;
    }

    try {
        music.volume = 0.35;
        await music.play();

        updateMusicButton(true);
        removeActivationListeners();

        console.log('Música iniciada correctamente');
    } catch (error) {
        updateMusicButton(false);

        console.log(
            'Autoplay bloqueado por el navegador:',
            error.name,
            error.message
        );
    }
}

function activateMusic() {
    startMusic();
}

function removeActivationListeners() {
    document.removeEventListener('pointerdown', activateMusic);
    document.removeEventListener('touchstart', activateMusic);
    document.removeEventListener('keydown', activateMusic);
    document.removeEventListener('wheel', activateMusic);
}

if (music) {
    music.volume = 0.35;

    // Primer intento automático
    if (document.readyState === 'complete') {
        startMusic();
    } else {
        window.addEventListener('load', startMusic, { once: true });
    }

    // Alternativa tras la primera interacción en cualquier lugar
    document.addEventListener('pointerdown', activateMusic, { once: true });
    document.addEventListener('touchstart', activateMusic, {
        once: true,
        passive: true
    });
    document.addEventListener('keydown', activateMusic, { once: true });
    document.addEventListener('wheel', activateMusic, {
        once: true,
        passive: true
    });

    music.addEventListener('play', () => updateMusicButton(true));
    music.addEventListener('pause', () => updateMusicButton(false));
}

if (musicButton && music) {
    musicButton.addEventListener('click', async event => {
        event.preventDefault();
        event.stopPropagation();

        if (music.paused) {
            await startMusic();
        } else {
            music.pause();
        }
    });
}
