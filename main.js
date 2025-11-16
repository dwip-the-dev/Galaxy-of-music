const tracks = [
  {
    id: 'g1',
    title: 'Radhe teri chano me',
    artist: 'Bhumika Sharma',
    src: "music/Radhe teri chano me song1.mp3",
    art: 'image/Radhe.jpeg'
  },
  {
    id: 'g2',
    title: 'Aaja Dil me a Larki Diwani',
    artist: 'Neelkamal singh',
    src: "music/song2.mp3",
    art: 'image/download.jpeg'
  },
  {
    id: 'g3',
    title: 'mai phir bhi tum ko chahuga',
    artist: 'arjit singh',
    src: "music/song3.mp3",
    art: 'image/phir bhi.jpg'
  },
  {
    id: 'g4',
    title: 'Dulri mayariya aagaili',
    artist: 'pawan singh singh',
    src: "music/dulri pawan singh song4.mp3",
    art: 'image/dulri pawan singh.avif'
  },
  {
    id: 'g5',
    title: 'Ha ham bihari hai ji',
    artist:'Manoj tiwari',
    src: "music/Haan Hum Bihari Hain ji song5.mp3",
    art: 'image/ha ham bihari hai ji.jpg'
  },
];

// DOM Elements
const tracksContainer = document.getElementById('tracks');
const audio = document.getElementById('audio');
const nowTitle = document.getElementById('now-title');
const nowArtist = document.getElementById('now-artist');
const nowArt = document.getElementById('now-art');
const queueEl = document.getElementById('queue');
const search = document.getElementById('search');
const playPauseBtn = document.getElementById("playPauseBtn");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");
const themeBtn = document.getElementById("themeBtn");

let queue = [...tracks];
let currentIndex = 0;

// RENDER FEATURED TRACKS
function renderTracks(list) {
  tracksContainer.innerHTML = '';
  list.forEach(t => {
    const div = document.createElement('div');
    div.className = 'track-card';
    div.innerHTML = `
      <img src="${t.art}" alt="${t.title}">
      <h4>${t.title}</h4>
      <p>${t.artist}</p>
      <button data-id="${t.id}" class="play-btn">▶ Play</button>
    `;
    tracksContainer.appendChild(div);
  });
}

renderTracks(tracks);

// PLAY TRACK FUNCTION
function playTrack(track) {
  audio.src = track.src;
  audio.play();
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist;
  nowArt.src = track.art;
}

// TRACK CLICK HANDLER
tracksContainer.addEventListener('click', e => {
  if (e.target.classList.contains('play-btn')) {
    const id = e.target.dataset.id;
    const track = tracks.find(t => t.id === id);
    currentIndex = tracks.indexOf(track);
    playTrack(track);
  }
});

// RENDER QUEUE
function renderQueue() {
  queueEl.innerHTML = '';
  queue.forEach((t, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}. ${t.title} — ${t.artist}`;
    queueEl.appendChild(li);
  });
}
renderQueue();

// PLAYER CONTROLS
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % queue.length;
  playTrack(queue[currentIndex]);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + queue.length) % queue.length;
  playTrack(queue[currentIndex]);
});

// AUTO PLAY NEXT
audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % queue.length;
  playTrack(queue[currentIndex]);
});

// TIME DISPLAY
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// UI updates for play/pause button
audio.addEventListener("play", () => {
  playPauseBtn.textContent = "⏸ Pause";
});

audio.addEventListener("pause", () => {
  playPauseBtn.textContent = "▶ Play";
});

// SEARCH
search.addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  const filtered = tracks.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.artist.toLowerCase().includes(q)
  );
  renderTracks(filtered);
});

// MOBILE MENU
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// THEME TOGGLE
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
