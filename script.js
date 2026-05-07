// ── ART DATA ──────────────────────────────────────────────────────────────────
const GENRES = ['abstract','geometric','landscape','portrait','cosmic','fluid'];

const ARTISTS = [
  'Elena Voss','Marco Delgado','Yuki Tanaka','Priya Nair','Axel Brandt',
  'Selin Çelik','Omar Hassan','Lena Möller','Rin Sato','Aiko Fujita',
  'Dario Ferretti','Mia Kovacs','Zen Li','Asha Osei','Felix Wagner',
];

const TITLES = [
  'Cascade of Light','Void Within','Amber Horizon','Silent Frequency',
  'Neon Dream','Fractal Mind','Echo Chamber','Twilight Prism',
  'Burning Archive','Deep Structure','Soft Collapse','Quantum Bloom',
  'Edge of Memory','Glitch Pastoral','Indigo Pulse','Dark Matter',
  'Chromatic Drift','Signal & Noise','Rust Elegy','Aurora Protocol',
  'Molten Core','Fragile Lattice','Spectral Body','Zero Gravity',
  'Morning Decay','Tidal Algorithm','Iron Sunrise','Parallel Garden',
  'Static Garden','Digital Palimpsest','Hollow Star','Phase Shift',
  'Luminous Void','Copper Sky','Geometric Soul','Neon Relic',
  'Thermal Bloom','Wave Function','Distant Shore','Phantom Signal',
  'Crystal Lens','Urban Mirage','Soft Entropy','Black Ice',
  'Resonant Field','Color Theory','Spectral Gate','Folded Light',
  'Cosmic Shore','Emulsive Dream','Blur Study','Interference Pattern',
  'Liminal Space','Neural Garden','Dusk Erosion','Arc of Silence',
];

const YEARS  = ['2021','2022','2023','2024','2025','2026'];
const MEDIA  = ['Generative Code','Canvas API','Shader Art','Data Painting','Pixel Synthesis','Algorithmic Form'];

// ── PALETTE THEMES ────────────────────────────────────────────────────────────
const PALETTES = [
  ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff'],
  ['#c77dff','#7b2fff','#e0aaff','#240046'],
  ['#f72585','#b5179e','#7209b7','#3a0ca3'],
  ['#80ffdb','#72efdd','#64dfdf','#56cfe1'],
  ['#f77f00','#d62828','#023e8a','#e9c46a'],
  ['#2dc653','#50fa7b','#0af27a','#00b74a'],
  ['#ff9a3c','#ff6347','#ffd700','#dc143c'],
  ['#00d4ff','#007bff','#0a2342','#00fff0'],
  ['#ff4500','#ff6b00','#ffaa00','#ffe800'],
  ['#8338ec','#3a86ff','#06d6a0','#ffbe0b'],
  ['#e63946','#457b9d','#1d3557','#a8dadc'],
  ['#6a0572','#ab83a1','#f7c5d0','#ff8fab'],
  ['#264653','#2a9d8f','#e9c46a','#f4a261'],
  ['#606c38','#283618','#fefae0','#dda15e'],
  ['#03045e','#0077b6','#00b4d8','#90e0ef'],
];

// ── SEEDED RANDOM ─────────────────────────────────────────────────────────────
function rng(seed) {
  let s = seed % 2147483647;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ── GENERATIVE DRAW FUNCTIONS ─────────────────────────────────────────────────
const drawFns = [];

// Abstract — radial gradient blobs
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 60; i++) {
    const x = r() * w, y = r() * h, radius = r() * w * 0.35 + 10;
    const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grd.addColorStop(0, pal[i % pal.length] + '99');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
});

// Geometric — stroked polygons
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  ctx.fillStyle = '#08080e';
  ctx.fillRect(0, 0, w, h);
  const N = 30;
  for (let i = 0; i < N; i++) {
    ctx.save();
    ctx.translate(r() * w, r() * h);
    ctx.rotate(r() * Math.PI * 2);
    const sz = r() * 80 + 20;
    ctx.strokeStyle = pal[i % pal.length];
    ctx.lineWidth = r() * 3 + 0.5;
    ctx.globalAlpha = 0.6 + r() * 0.4;
    const sides = Math.floor(r() * 5) + 3;
    ctx.beginPath();
    for (let j = 0; j < sides; j++) {
      const a = (j / sides) * Math.PI * 2;
      j === 0
        ? ctx.moveTo(Math.cos(a) * sz, Math.sin(a) * sz)
        : ctx.lineTo(Math.cos(a) * sz, Math.sin(a) * sz);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
});

// Landscape — layered mountains + stars
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
  sky.addColorStop(0, pal[0]);
  sky.addColorStop(1, pal[1] + '88');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
  for (let m = 0; m < 3; m++) {
    ctx.beginPath();
    ctx.moveTo(0, h * (0.5 + m * 0.15));
    for (let x = 0; x <= w; x += 15) {
      const y = h * (0.4 + m * 0.12) + Math.sin(x * 0.02 + m) * 40 * r() - r() * 30;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h); ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = pal[(m + 2) % pal.length] + 'cc';
    ctx.fill();
  }
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = r() * 0.8;
    ctx.beginPath();
    ctx.arc(r() * w, r() * h * 0.45, r() * 2 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
});

// Portrait — stylized face
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  ctx.fillStyle = '#0c0c14';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.6);
  g.addColorStop(0, pal[0] + '44');
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = pal[1] + 'cc';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 10, w * 0.22, h * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();
  for (let i of [-1, 1]) {
    ctx.fillStyle = pal[2];
    ctx.beginPath();
    ctx.ellipse(cx + i * w * 0.08, cy - h * 0.05, w * 0.04, h * 0.025, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0a0a0f';
    ctx.beginPath();
    ctx.arc(cx + i * w * 0.08, cy - h * 0.05, w * 0.02, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = pal[3];
  for (let i = 0; i < 20; i++) {
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    const sx = cx + (r() - 0.5) * w * 0.3;
    ctx.moveTo(sx, cy - h * 0.28);
    ctx.bezierCurveTo(
      sx + (r() - 0.5) * 20, cy - h * 0.35,
      sx + (r() - 0.5) * 30, cy - h * 0.42,
      sx + (r() - 0.5) * 40, cy - h * 0.5
    );
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
});

// Cosmic — stars + nebula + central body
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  ctx.fillStyle = '#030308';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = r() * 0.8 + 0.1;
    ctx.beginPath();
    ctx.arc(r() * w, r() * h, r() * 1.5 + 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 4; i++) {
    const grd = ctx.createRadialGradient(r() * w, r() * h, 0, r() * w, r() * h, w * 0.4);
    grd.addColorStop(0, pal[i % pal.length] + '66');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, w, h);
  }
  const grd2 = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.18);
  grd2.addColorStop(0, '#fff');
  grd2.addColorStop(0.3, pal[0]);
  grd2.addColorStop(1, 'transparent');
  ctx.fillStyle = grd2;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
});

// Fluid — bezier stripe rivers
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  ctx.fillStyle = '#08090f';
  ctx.fillRect(0, 0, w, h);
  const N = 60;
  for (let i = 0; i < N; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (i / N) * h);
    let x = 0, y = (i / N) * h;
    while (x < w) {
      const cpx = x + 20, cpy = y + (r() - 0.5) * 60;
      const ex = x + 40, ey = y + (r() - 0.5) * 40;
      ctx.bezierCurveTo(cpx, cpy, cpx, cpy, ex, ey);
      x = ex; y = ey;
    }
    ctx.strokeStyle = pal[i % pal.length];
    ctx.lineWidth = h / N * 0.9;
    ctx.globalAlpha = 0.35 + r() * 0.65;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
});

// Pixel grid
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  const cell = 20;
  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      ctx.fillStyle = pal[Math.floor(r() * pal.length)];
      ctx.globalAlpha = r() * 0.8 + 0.2;
      ctx.fillRect(x, y, cell - 1, cell - 1);
    }
  }
  ctx.globalAlpha = 1;
});

// Spiral
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  ctx.fillStyle = '#050508';
  ctx.fillRect(0, 0, w, h);
  ctx.translate(w / 2, h / 2);
  const turns = 6 + r() * 4;
  for (let t = 0; t < turns * Math.PI * 2; t += 0.05) {
    const radius = t * 4;
    const x = Math.cos(t) * radius, y = Math.sin(t) * radius;
    ctx.fillStyle = pal[Math.floor(t) % pal.length];
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(x, y, 2 + r() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
});

// Voronoi-like cells
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  const pts = Array.from({ length: 12 }, () => ({
    x: r() * w, y: r() * h, c: pal[Math.floor(r() * pal.length)]
  }));
  const imgd = ctx.createImageData(w, h);
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      let minD = Infinity, col = '#000';
      for (const p of pts) {
        const d = (px - p.x) ** 2 + (py - p.y) ** 2;
        if (d < minD) { minD = d; col = p.c; }
      }
      const i = (py * w + px) * 4;
      const rgb = parseInt(col.slice(1), 16);
      imgd.data[i]     = (rgb >> 16) & 255;
      imgd.data[i + 1] = (rgb >> 8)  & 255;
      imgd.data[i + 2] =  rgb        & 255;
      imgd.data[i + 3] = 220;
    }
  }
  ctx.putImageData(imgd, 0, 0);
});

// Wave interference
drawFns.push(function(ctx, w, h, s, pal) {
  const r = rng(s);
  ctx.fillStyle = '#060610';
  ctx.fillRect(0, 0, w, h);
  const freq = 0.04 + r() * 0.06, freq2 = 0.03 + r() * 0.05;
  const imgd = ctx.createImageData(w, h);
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const v = Math.sin(px * freq + py * 0.02) * Math.cos(py * freq2 + px * 0.015);
      const norm = (v + 1) * 0.5;
      const ci = Math.floor(norm * (pal.length - 1));
      const col = pal[ci];
      const i = (py * w + px) * 4;
      const rgb = parseInt(col.slice(1), 16);
      imgd.data[i]     = (rgb >> 16) & 255;
      imgd.data[i + 1] = (rgb >> 8)  & 255;
      imgd.data[i + 2] =  rgb        & 255;
      imgd.data[i + 3] = 255;
    }
  }
  ctx.putImageData(imgd, 0, 0);
});

// ── GENERATE ARTWORK METADATA ──────────────────────────────────────────────────
function makeArtwork(idx) {
  const genre  = GENRES[idx % GENRES.length];
  const title  = TITLES[idx % TITLES.length] + (idx >= TITLES.length ? ' ' + (Math.floor(idx / TITLES.length) + 1) : '');
  const artist = ARTISTS[idx % ARTISTS.length];
  const year   = YEARS[idx % YEARS.length];
  const medium = MEDIA[idx % MEDIA.length];
  const palIdx = idx % PALETTES.length;
  const fnIdx  = idx % drawFns.length;
  return { idx, genre, title, artist, year, medium, palIdx, fnIdx };
}

const ARTWORKS = Array.from({ length: 150 }, (_, i) => makeArtwork(i));

// ── CANVAS RENDER ─────────────────────────────────────────────────────────────
function renderCanvas(canvas, art, w, h) {
  canvas.width  = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  drawFns[art.fnIdx](ctx, w, h, art.idx * 1337 + 42, PALETTES[art.palIdx]);
}

// ── BUILD CARD ────────────────────────────────────────────────────────────────
function makeCard(art) {
  const card   = document.createElement('div');
  card.className   = 'artwork-card';
  card.dataset.genre = art.genre;

  const fig    = document.createElement('figure');
  const canvas = document.createElement('canvas');
  renderCanvas(canvas, art, 260, 320);
  fig.appendChild(canvas);

  const cap = document.createElement('figcaption');
  cap.innerHTML = `
    <div class="artist">${art.artist}</div>
    <h3>${art.title}</h3>
    <div class="meta">${art.year} · ${art.medium}</div>
  `;
  fig.appendChild(cap);
  card.appendChild(fig);

  const num = document.createElement('span');
  num.className   = 'card-num';
  num.textContent = String(art.idx + 1).padStart(3, '0');
  card.appendChild(num);

  card.addEventListener('click', () => openLightbox(art));
  return card;
}

// ── WALK-THROUGH VIEW ─────────────────────────────────────────────────────────
const walkRow = document.getElementById('walk-row');
[...ARTWORKS, ...ARTWORKS].forEach(art => walkRow.appendChild(makeCard(art)));

// ── GRID VIEW ─────────────────────────────────────────────────────────────────
const gridView = document.getElementById('view-grid');
ARTWORKS.forEach(art => gridView.appendChild(makeCard(art)));

// ── VIEW TOGGLE ───────────────────────────────────────────────────────────────
document.getElementById('btn-walk').addEventListener('click', function () {
  document.getElementById('view-walk').style.display = '';
  gridView.style.display = 'none';
  this.classList.add('active');
  document.getElementById('btn-grid').classList.remove('active');
});

document.getElementById('btn-grid').addEventListener('click', function () {
  document.getElementById('view-walk').style.display = 'none';
  gridView.style.display = 'grid';
  this.classList.add('active');
  document.getElementById('btn-walk').classList.remove('active');
});

// ── FILTER ────────────────────────────────────────────────────────────────────
document.getElementById('filters').addEventListener('click', function (e) {
  if (!e.target.matches('.filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  const genre = e.target.dataset.genre;
  document.querySelectorAll('.artwork-card').forEach(card => {
    card.style.display = (genre === 'all' || card.dataset.genre === genre) ? '' : 'none';
  });
});

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
const lb       = document.getElementById('lightbox');
const lbCanvas = document.getElementById('lb-canvas');
const lbTitle  = document.getElementById('lb-title');
const lbArtist = document.getElementById('lb-artist');

function openLightbox(art) {
  renderCanvas(lbCanvas, art, 600, 600);
  lbTitle.textContent  = art.title;
  lbArtist.textContent = art.artist + ' · ' + art.year;
  lb.classList.add('open');
}

document.getElementById('lightbox-close').addEventListener('click', () => lb.classList.remove('open'));
lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
