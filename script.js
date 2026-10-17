// Fecha del evento: 28 de noviembre de 2026, 6:00 p. m., Bogotá
const eventDate = new Date('2026-11-28T18:00:00-05:00');

function updateCountdown() {
    const difference = Math.max(0, eventDate.getTime() - Date.now());

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor(difference / 3600000) % 24;
    const minutes = Math.floor(difference / 60000) % 60;

    const values = [days, hours, minutes];
    const elements = document.querySelectorAll('#countdown b');

    elements.forEach((element, index) => {
        if (values[index] !== undefined) {
            element.textContent = String(values[index]).padStart(2, '0');
        }
    });
}

// Mostrar el contador inmediatamente al cargar la página
updateCountdown();

// Actualizar el contador cada minuto
setInterval(updateCountdown, 60000);
