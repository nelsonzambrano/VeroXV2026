function enterSite(){
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');

    if (intro) {
        intro.style.display = 'none';
    }

    if (main) {
        main.style.display = 'block';
        main.classList.remove('hidden');
    }

    window.scrollTo(0,0);
}
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
// Cambia esta fecha por la fecha real del evento: AAAA-MM-DDTHH:MM:SS-05:00
const eventDate=new Date('2026-11-28T19:06:00-05:00');setInterval(()=>{let d=Math.max(0,eventDate-Date.now()),a=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60];document.querySelectorAll('#countdown b').forEach((x,i)=>x.textContent=String(a[i]).padStart(2,'0'))},1000);
