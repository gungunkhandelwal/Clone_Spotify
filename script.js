console.log("Welcome to Spotify");
let songIndex = 0;
const audioPlay = new Audio('songs/1.mp3');
const songList = Array.from(document.getElementsByClassName('song-list'));
const bottomPlay = document.getElementById('playAudio');
const nextSong = document.getElementById('nextSong');
const previousSong = document.getElementById('postSong');
const repeatSong = document.getElementById('loopSong');
const songNameElement = document.getElementById('songTitle');
const bottomImageElement = document.getElementById('coverImage');
const bottomSingerName = document.getElementById('writerName');
const progressBar = document.getElementById('ProgressBar');
const shuffleSong = document.getElementById('Shuffle');

// // Adding song detail in main html
let songs = [
    { songName: 'Ram Siya Ram', filePath: 'songs/1.mp3', coverImg: 'images/1.jpeg', singerName: 'Song By: Ajay-Atul, Parampara Thakur, and Sachet Tandon' },
    { songName: 'Samjho Na', filePath: 'songs/2.mp3', coverImg: 'images/2.jpeg', singerName: 'Song By: Aditya Rikhari' },
    { songName: 'One Dance', filePath: 'songs/3.mp3', coverImg: 'images/3.jpeg', singerName: 'Song By: Drake' },
    { songName: 'Kya Baat Hai', filePath: 'songs/4.mp3', coverImg: 'images/4.jpeg', singerName: 'Song By: Harrdy Sandhu ' },
    { songName: 'Hookha Bar', filePath: 'songs/5.mp3', coverImg: 'images/5.jpeg', singerName: 'Song By: Aaman Trikha, Himesh Reshammiya' },
    { songName: 'Roz', filePath: 'songs/6.mp3', coverImg: 'images/6.jpeg', singerName: 'Song By: Ritviz & Nucleya' },
    { songName: 'Touch Me', filePath: 'songs/7.mp3', coverImg: 'images/7.jpeg', singerName: 'Song By: Alisha Chinai and KK' },
    { songName: 'Jugnu', filePath: 'songs/8.mp3', coverImg: 'images/8.jpeg', singerName: 'Song By: Badshah and Nikhita Gandhi ' },
]
songList.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverImg;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('singerName')[0].innerText = songs[i].singerName;
    // Play song when clickig on song List
    element.addEventListener('click', function () {
        audioPlay.src = `songs/${i + 1}.mp3`;
        togglePlay();
        songNameElement.textContent = songs[i].songName;
        bottomImageElement.src = `images/${i + 1}.jpeg`;
        bottomSingerName.textContent = songs[i].singerName;
    })

})

// This function shows and plays a song while clicking on the play button
bottomPlay.addEventListener('click', togglePlay);

function togglePlay() {
    if (audioPlay.paused) {
        audioPlay.play();
        togglePlayIcon('fa-pause-circle', 'fa-play-circle');
    } else {
        audioPlay.pause();
        togglePlayIcon('fa-play-circle', 'fa-pause-circle');
    }
}

// Function to toggle play icon
function togglePlayIcon(addClass, removeClass) {
    bottomPlay.classList.remove(removeClass);
    bottomPlay.classList.add(addClass);
}
const maxSongIndex = songs.length - 1;

// Function to handle next and previous song logic
function changeSong(direction) {
    songIndex = (direction === 'next') ? (songIndex >= maxSongIndex ? 0 : songIndex + 1) : (songIndex <= 0 ? 0 : songIndex - 1);
    updateSongDetails();
}

// Update song details
function updateSongDetails() {
    audioPlay.src = `songs/${songIndex + 1}.mp3`;
    songNameElement.textContent = songs[songIndex].songName;
    bottomImageElement.src = `images/${songIndex + 1}.jpeg`;
    bottomSingerName.textContent = songs[songIndex].singerName;
    audioPlay.play();
    togglePlayIcon('fa-pause-circle', 'fa-play-circle');
}

// Next Song Button
nextSong.addEventListener('click', () => changeSong('next'));

// Previous Song Button
previousSong.addEventListener('click', () => changeSong('previous'));

// Shuffling song Button
let isShuffle = false;
shuffleSong.addEventListener('click', () => {
    isShuffle = !isShuffle;
    updateShuffleColor();
});

// Function to update loop button color
function updateShuffleColor() {
    shuffleSong.style.color = isShuffle ? 'green' : '';
}
// Repeat song Button
let isRepeat = false;
repeatSong.addEventListener('click', () => {
    isRepeat = !isRepeat;
    updateLoopColor();
});

// Function to update loop button color
function updateLoopColor() {
    repeatSong.style.color = isRepeat ? 'green' : '';
}

// Like Button
let isLiked = false;
document.getElementById('like').addEventListener('click', () => {
    isLiked = !isLiked;
    updateButtonColor();
});

// Function to update like button color
function updateButtonColor() {
    document.getElementById('like').style.color = isLiked ? 'green' : 'white';
}

// Progress bar
progressBar.addEventListener('input', () => {
    audioPlay.currentTime = progressBar.value * audioPlay.duration / 100;
});
// Updattion of Progres Bar 

audioPlay.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
    const progress = parseInt((audioPlay.currentTime / audioPlay.duration) * 100);
    progressBar.value = progress;
    // Looping of song
    if (progress === 100 && isRepeat) {
        audioPlay.currentTime = 0;
        audioPlay.play();
    }
    else if (audioPlay.ended) {
            changeSong('next');
    }

}












