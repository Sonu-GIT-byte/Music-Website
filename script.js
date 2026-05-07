// ── elements
const audio         = document.querySelector("audio");
const masterPlay    = document.getElementById("masterPlay");
const seek          = document.getElementById("seek");
const bar2          = document.getElementById("bar2");
const dot           = document.querySelector(".bar .dot");
const currentStart  = document.getElementById("currentStart");
const currentEnd    = document.getElementById("currentEnd");
const poster        = document.getElementById("poster_master_play");
const titleEl       = document.getElementById("title");
const wave          = document.getElementById("wave");
const volInput      = document.getElementById("vol");
const volBar        = document.querySelector(".vol_bar");
const volDot        = document.getElementById("vol_dot");
const volIcon       = document.getElementById("vol_icon");
const downloadBtn   = document.getElementById("download_music");
const playlistPlays = document.querySelectorAll(".playlistPlay");
const popSong       = document.querySelector(".pop_song");
const artistBox     = document.querySelector(".Artists_bx");

// ── state
let currentSong = 1;
let isPlaying   = false;

// ── song data
const songs = [
  { id: 1,  title: "On My Way",          artist: "Alan Walker",            img: "img/1.jpg",   src: "audio/1.mp3"  },
  { id: 2,  title: "Faded",              artist: "Alan Walker",            img: "img/2.jpg",   src: "audio/2.mp3"  },
  { id: 3,  title: "Perfect",            artist: "Ed Sheeran",             img: "img/3.jpg",   src: "audio/3.mp3"  },
  { id: 4,  title: "Chitthi",            artist: "Jubin Nautiyal",         img: "img/222.jpg", src: "audio/4.mp3"  },
  { id: 5,  title: "Humnava Mere",       artist: "Jubin Nautiyal",         img: "img/5.jpg",   src: "audio/5.mp3"  },
  { id: 6,  title: "Espresso",           artist: "Sabrina Carpenter",      img: "img/6.jpg",   src: "audio/6.mp3"  },
  { id: 7,  title: "Teri Meri Kahaani", artist: "Arijit Singh",           img: "img/7.jpg",   src: "audio/7.mp3"  },
  { id: 8,  title: "Gata Only",          artist: "Cris MJ & FloyyMenor",  img: "img/8.jpg",   src: "audio/8.mp3"  },
  { id: 9,  title: "Happy Nation",       artist: "Ace of Base",            img: "img/9.jpg",   src: "audio/9.mp3"  },
  { id: 10, title: "Jeene Laga Hoon",    artist: "Atif Aslam & Shreya",   img: "img/10.jpg",  src: "audio/10.mp3" },
  { id: 11, title: "Mortals",            artist: "Laura Brehm & Warriyo", img: "img/11.jpg",  src: "audio/11.mp3" },
  { id: 12, title: "SummerTime",         artist: "Lana Del Rey",           img: "img/12.jpg",  src: "audio/12.mp3" },
  { id: 13, title: "Mann Mera",          artist: "Gajendra Verma",         img: "img/13.jpg",  src: "audio/13.mp3" },
  { id: 14, title: "SugarCrash",         artist: "ElyOtto",                img: "img/14.jpg",  src: "audio/14.mp3" },
  { id: 15, title: "Play Date",          artist: "Melanie Martinez",       img: "img/15.jpg",  src: "audio/15.mp3" },
  { id: 16, title: "Na kar Deewana",     artist: "Mustafa Zahid",          img: "img/16.jpg",  src: "audio/16.mp3" },
  { id: 17, title: "Aaoge Tum Kabhi",   artist: "The Local Train",        img: "img/17.jpg",  src: "audio/17.mp3" },
  { id: 18, title: "Tu Aake Dekhle",    artist: "King",                   img: "img/18.jpg",  src: "audio/18.mp3" },
  { id: 19, title: "Bom Diggy Diggy",   artist: "Zack Knight & Jasmin",  img: "img/19.jpg",  src: "audio/19.mp3" },
  { id: 20, title: "Choo Lo",            artist: "The Local Train",        img: "img/20.jpg",  src: "audio/20.mp3" },
];

// ── helpers
function formatTime(sec) {
  if (isNaN(sec)) return "0.00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}.${s < 10 ? "0" + s : s}`;
}

// FIX: use "susbtitle" to match your CSS typo consistently
function loadSong(id) {
  const song = songs.find(s => s.id === id);
  if (!song) return;
  currentSong = id;
  audio.src   = song.src;
  poster.src  = song.img;
  titleEl.innerHTML = `${song.title}<div class="susbtitle">${song.artist}</div>`;
}

function playSong() {
  audio.play().catch(e => console.log("Play error:", e));
  isPlaying = true;
  masterPlay.classList.replace("bi-play-fill", "bi-pause-fill");
  wave.classList.add("active1");   // FIX: add to wave div itself
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  masterPlay.classList.replace("bi-pause-fill", "bi-play-fill");
  wave.classList.remove("active1");
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

// ── FIX: load song 1 on startup so audio src matches currentSong
loadSong(1);

// ── master play/pause
masterPlay.addEventListener("click", togglePlay);

// ── playlist & popular song buttons
playlistPlays.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.id);
    if (id === currentSong && isPlaying) {
      pauseSong();
    } else {
      loadSong(id);
      playSong();
    }
  });
});

// ── seek bar
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  seek.value = pct;
  bar2.style.width = pct + "%";
  dot.style.left   = pct + "%";
  currentStart.textContent = formatTime(audio.currentTime);
  currentEnd.textContent   = formatTime(audio.duration);
});

seek.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (seek.value / 100) * audio.duration;
});

// ── auto next
audio.addEventListener("ended", () => {
  const next = currentSong < songs.length ? currentSong + 1 : 1;
  loadSong(next);
  playSong();
});

// ── skip forward
document.querySelector(".bi-skip-end-fill").addEventListener("click", () => {
  const next = currentSong < songs.length ? currentSong + 1 : 1;
  loadSong(next);
  playSong();
});

// ── skip back
document.querySelector(".bi-skip-start-fill").addEventListener("click", () => {
  const prev = currentSong > 1 ? currentSong - 1 : songs.length;
  loadSong(prev);
  playSong();
});

// ── volume slider
volInput.addEventListener("input", () => {
  const v = volInput.value;
  audio.volume      = v / 100;
  volBar.style.width = v + "%";
  volDot.style.left  = v + "%";
  volIcon.className  = v == 0
    ? "bi bi-volume-mute-fill"
    : v < 50
    ? "bi bi-volume-down-fill"
    : "bi bi-volume-up-fill";
});

// ── mute toggle
volIcon.addEventListener("click", () => {
  if (audio.volume > 0) {
    volIcon._savedVol  = volInput.value;
    audio.volume       = 0;
    volInput.value     = 0;
    volBar.style.width = "0%";
    volDot.style.left  = "0%";
    volIcon.className  = "bi bi-volume-mute-fill";
  } else {
    const v            = volIcon._savedVol || 70;
    audio.volume       = v / 100;
    volInput.value     = v;
    volBar.style.width = v + "%";
    volDot.style.left  = v + "%";
    volIcon.className  = "bi bi-volume-up-fill";
  }
});

// ── download
downloadBtn.addEventListener("click", () => {
  const song = songs.find(s => s.id === currentSong);
  if (!song) return;
  const a    = document.createElement("a");
  a.href     = song.src;
  a.download = `${song.title} - ${song.artist}.mp3`;
  a.click();
});

// ── scroll arrows
document.getElementById("pop_song_left").addEventListener("click",  () => { popSong.scrollLeft -= 220; });
document.getElementById("pop_song_right").addEventListener("click", () => { popSong.scrollLeft += 220; });
document.getElementById("pop_art_left").addEventListener("click",   () => { artistBox.scrollLeft -= 200; });
document.getElementById("pop_art_right").addEventListener("click",  () => { artistBox.scrollLeft += 200; });

// ── shuffle
document.querySelector(".shuffle").addEventListener("click", () => {
  let id;
  do { id = Math.floor(Math.random() * songs.length) + 1; }
  while (id === currentSong);   // never shuffle to same song
  loadSong(id);
  playSong();
});

// ── also fix your HTML: change <audio src="audio/5.mp3"> to just <audio>
// ── init volume
audio.volume       = 0.7;
volInput.value     = 70;
volBar.style.width = "70%";
volDot.style.left  = "70%";
