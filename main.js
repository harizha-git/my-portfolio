const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 6 + 'px'; cursor.style.top = my - 6 + 'px';
});
setInterval(() => {
    tx += (mx - tx) * 0.12; ty += (my - ty) * 0.12;
    trail.style.left = tx - 18 + 'px'; trail.style.top = ty - 18 + 'px';
}, 16);
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), (i % 4) * 100); observer.unobserve(e.target); }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
    navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--rose)' : ''; });
});

document.addEventListener('mousemove', e => {
    const b = document.querySelector('.hero-blob');
    if (b) b.style.transform = `translate(${(e.clientX / window.innerWidth - .5) * 20}px,${(e.clientY / window.innerHeight - .5) * 20}px)`;
});

const statsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target, raw = el.textContent.trim(), num = parseFloat(raw), sfx = raw.replace(String(num), '');
        let v = 0; const step = num / 40;
        const iv = setInterval(() => {
            v += step;
            if (v >= num) { el.textContent = raw; clearInterval(iv); return; }
            el.textContent = (Number.isInteger(num) ? Math.floor(v) : v.toFixed(1)) + sfx;
        }, 30);
        statsObs.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(n => statsObs.observe(n));
