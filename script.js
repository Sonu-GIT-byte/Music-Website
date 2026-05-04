let music = document.querySelector('audio');

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.querySelector('.dot');

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');

let vol = document.getElementById('vol');
let vol_bar = document.querySelector('.vol_bar');
let vol_dot = document.getElementById('vol_dot');

let songItems = document.getElementsByClassName('songItem');
let playlistPlay = document.getElementsByClassName('playlistPlay');

// 🎵 SONG LIST
let songs = [
    {
        id: "1",
        songName: "On My Way <br><div class='subtitle'>Alan Walker</div>",
        poster: "img/1.jpg",
        src: "audio/1.mp3"
    },
    {
        id: "2",
        songName: "Faded <br><div class='subtitle'>Alan Walker</div>",
        poster: "img/2.jpg",
        src: "audio/2.mp3"
    },
    {
        id: "3",
        songName: "Perfect <br><div class='subtitle'>Ed Sheeran</div>",
        poster: "img/3.jpg",
        src: "audio/3.mp3"
    },
    {
        id: "4",
        songName: "Chitthi <br><div class='subtitle'>Jubin Nautiyal</div>",
        poster: "img/222.jpg",
        src: "audio/4.mp3"
    },
    {
        id: "5",
        songName: "Humnava Mere <br><div class='subtitle'>Jubin Nautiyal</div>",
        poster: "img/5.jpg",
        src: "audio/5.mp3"
    }
];

// ▶️ MASTER PLAY BUTTON
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

// ▶️ PLAY FROM PLAYLIST
Array.from(playlistPlay).forEach((element) => {
    element.addEventListener('click', (e) => {
        let index = e.target.id;

        music.src = songs[index - 1].src;
        poster_master_play.src = songs[index - 1].poster;
        title.innerHTML = songs[index - 1].songName;

        music.play();
        masterPlay.classList.replace('bi-play-fill', 'bi-pause-fill');
        wave.classList.add('active1');
    });
});

// ⏱ TIME UPDATE
music.addEventListener('timeupdate', () => {
    let current = music.currentTime;
    let duration = music.duration;

    // END TIME
    let min_dur = Math.floor(duration / 60);
    let sec_dur = Math.floor(duration % 60);
    if (sec_dur < 10) sec_dur = "0" + sec_dur;
    currentEnd.innerText = `${min_dur}:${sec_dur}`;

    // CURRENT TIME
    let min_cur = Math.floor(current / 60);
    let sec_cur = Math.floor(current % 60);
    if (sec_cur < 10) sec_cur = "0" + sec_cur;
    currentStart.innerText = `${min_cur}:${sec_cur}`;

    // PROGRESS BAR
    let progress = parseInt((current / duration) * 100);
    seek.value = progress;
    bar2.style.width = `${progress}%`;
    dot.style.left = `${progress}%`;
});

// 🎚 SEEK CONTROL
seek.addEventListener('change', () => {
    music.currentTime = (seek.value * music.duration) / 100;
});

// 🔊 VOLUME CONTROL
vol.addEventListener('change', () => {
    let volume = vol.value;
    music.volume = volume / 100;

    vol_bar.style.width = `${volume}%`;
    vol_dot.style.left = `${volume}%`;
});
