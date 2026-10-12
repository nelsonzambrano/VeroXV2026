const obs = new IntersectionObserver(
    es => es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    }),
    { threshold: .12 }
);

document.querySelectorAll('.reveal').forEach(x => obs.observe(x));

// Fecha del evento: 28 de noviembre de 2026, 6:00 p. m. Bogotá
const eventDate = new Date('2026-11-28T18:00:00-05:00');

setInterval(() => {
    const d = Math.max(0, eventDate - Date.now());
    const values = [
        Math.floor(d / 864e5),
        Math.floor(d / 36e5) % 24,
        Math.floor(d / 6e4) % 60
    ];

    document.querySelectorAll('#countdown b').forEach((element, index) => {
        element.textContent = String(values[index]).padStart(2, '0');
    });
}, 1000);
// Cambia esta fecha por la fecha real del evento: AAAA-MM-DDTHH:MM:SS-05:00
const eventDate=new Date('2026-11-28T19:18:00-05:00');setInterval(()=>{let d=Math.max(0,eventDate-Date.now()),a=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60];document.querySelectorAll('#countdown b').forEach((x,i)=>x.textContent=String(a[i]).padStart(2,'0'))},1000);
