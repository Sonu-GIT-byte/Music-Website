let music = document.querySelector('audio');

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.querySelector('.bar .dot');

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');

let vol = document.getElementById('vol');
let vol_bar = document.querySelector('.vol_bar');
let vol_dot = document.getElementById('vol_dot');

let playlistPlay = document.getElementsByClassName('playlistPlay');

// 🎵 FULL SONG LIST (MATCHES YOUR HTML)
let songs = [
    { id: "1", songName: "On My Way<br><div class='subtitle'>Alan Walker</div>", poster: "img/1.jpg", src: "audio/1.mp3" },
    { id: "2", songName: "Faded<br><div class='subtitle'>Alan Walker</div>", poster: "img/2.jpg", src: "audio/2.mp3" },
    { id: "3", songName: "Perfect<br><div class='subtitle'>Ed Sheeran</div>", poster: "img/3.jpg", src: "audio/3.mp3" },
    { id: "4", songName: "Chitthi<br><div class='subtitle'>Jubin Nautiyal</div>", poster: "img/222.jpg", src: "audio/4.mp3" },
    { id: "5", songName: "Humnava Mere<br><div class='subtitle'>Jubin Nautiyal</div>", poster: "img/5.jpg", src: "audio/5.mp3" },
    { id: "6", songName: "Espresso<br><div class='subtitle'>Sabrina Carpenter</div>", poster: "img/6.jpg", src: "audio/6.mp3" },
    { id: "7", songName: "Teri Meri Kahaani<br><div class='subtitle'>Arijit Singh</div>", poster: "img/7.jpg", src: "audio/7.mp3" },
    { id: "8", songName: "Gata Only<br><div class='subtitle'>Cris MJ</div>", poster: "img/8.jpg", src: "audio/8.mp3" },
    { id: "9", songName: "Happy Nation<br><div class='subtitle'>Ace of Base</div>", poster: "img/9.jpg", src: "audio/9.mp3" },
    { id: "10", songName: "Jeene Laga Hoon<br><div class='subtitle'>Atif Aslam</div>", poster: "img/10.jpg", src: "audio/10.mp3" }
];

let currentIndex = 0;

// ▶️ MASTER PLAY / PAUSE
masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.replace('bi-play-fill', 'bi-pause-fill');
        wave.classList.add('active1');
    } else {
        music.pause();
        masterPlay.classList.replace('bi-pause-fill', 'bi-play-fill');
        wave.classList.remove('active1');
    }
});

// 🔄 RESET ALL PLAY ICONS
function resetIcons() {
    Array.from(playlistPlay).forEach(el => {
        el.classList.remove('bi-pause-circle-fill');
        el.classList.add('bi-play-circle-fill');
    });
}

// ▶️ PLAY FROM PLAYLIST (FIXED)
Array.from(playlistPlay).forEach((element) => {
    element.addEventListener('click', function () {

        let index = this.id;
        let selectedSong = songs.find(song => song.id === index);

        if (!selectedSong) return;

        currentIndex = songs.indexOf(selectedSong);

        resetIcons();
        this.classList.remove('bi-play-circle-fill');
        this.classList.add('bi-pause-circle-fill');

        music.src = selectedSong.src;
        poster_master_play.src = selectedSong.poster;
        title.innerHTML = selectedSong.songName;

        music.play();
        masterPlay.classList.replace('bi-play-fill', 'bi-pause-fill');
        wave.classList.add('active1');
    });
});

// ⏱ TIME UPDATE
music.addEventListener('timeupdate', () => {
    let current = music.currentTime;
    let duration = music.duration;

    if (!isNaN(duration)) {

        let min_dur = Math.floor(duration / 60);
        let sec_dur = Math.floor(duration % 60);
        if (sec_dur < 10) sec_dur = "0" + sec_dur;
        currentEnd.innerText = `${min_dur}:${sec_dur}`;

        let min_cur = Math.floor(current / 60);
        let sec_cur = Math.floor(current % 60);
        if (sec_cur < 10) sec_cur = "0" + sec_cur;
        currentStart.innerText = `${min_cur}:${sec_cur}`;

        let progress = (current / duration) * 100;
        seek.value = progress;
        bar2.style.width = `${progress}%`;
        dot.style.left = `${progress}%`;
    }
});

// 🎚 SEEK BAR
seek.addEventListener('input', () => {
    music.currentTime = (seek.value * music.duration) / 100;
});

// 🔊 VOLUME CONTROL
vol.addEventListener('input', () => {
    let volume = vol.value;
    music.volume = volume / 100;

    vol_bar.style.width = `${volume}%`;
    vol_dot.style.left = `${volume}%`;
});

// ⏭ NEXT BUTTON
document.querySelector('.bi-skip-end-fill').addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= songs.length) currentIndex = 0;

    playSong(currentIndex);
});

// ⏮ PREVIOUS BUTTON
document.querySelector('.bi-skip-start-fill').addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = songs.length - 1;

    playSong(currentIndex);
});

// ▶️ PLAY FUNCTION
function playSong(index) {
    let song = songs[index];

    music.src = song.src;
    poster_master_play.src = song.poster;
    title.innerHTML = song.songName;

    music.play();
    masterPlay.classList.replace('bi-play-fill', 'bi-pause-fill');
    wave.classList.add('active1');
}

// 🔁 AUTO NEXT SONG
music.addEventListener('ended', () => {
    currentIndex++;
    if (currentIndex >= songs.length) currentIndex = 0;
    playSong(currentIndex);
});
