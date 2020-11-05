const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const previousButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");

/* Check if Playing */
let isPlaying = false;
let songIndex = 0;
/* Music Object*/
const songs = [
    {
        name: "Coming Back To Life",
        displayName: "Coming Back To Life",
        artist: "Pink Floyd",
    },
    {
        name: "Amake Amar Moto Thakte Dao",
        displayName: "Amake Amar Moto Thakte Dao",
        artist: "Anupam Roy",
    },
    {
        name: "Bohemian Rhapsody",
        displayName: "Bohemian Rhapsody",
        artist: "Queen",
    },
    {
        name: "Despacito",
        displayName: "Despacito",
        artist: "Luis Fonsi ft. Daddy Yankee",
    },
    {
        name: "Girls Like You",
        displayName: "Girls Like You",
        artist: "Maroon 5 ft. Cardi B",
    },
    {
        name: "Pehla Nasha",
        displayName: "Pehla Nasha",
        artist: "Sadhana Sargam, Udit Narayan",
    },
    {
        name: "Preme Pora Baron",
        displayName: "Preme Pora Baron",
        artist: "Lagnajita",
    },
    {
        name: "See You Again",
        displayName: "See You Again",
        artist: "Wiz Khalifa ft. Charlie Puth",
    },
    {
        name: "Shape of You",
        displayName: "Shape of You",
        artist: "Ed Sheeran",
    },
    {
        name: "Tor Sathe",
        displayName: "Tor Sathe",
        artist: "Sudipto Chowdhury",
    }
];
/* Play */

function playSong(){
    isPlaying = true;
    playButton.classList.replace("fa-play","fa-pause");
    playButton.setAttribute("title","Pause");
    music.play();
}

/* Pause */

function pauseSong(){
    isPlaying = false;
    playButton.classList.replace("fa-pause","fa-play");
    playButton.setAttribute("title","Play");
    music.pause();
}

/* Update DOM Element */
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
/* Update Progress Bar and Time */
function updateProgressBar(e){
    if(isPlaying){
        const {currentTime,duration} = e.srcElement;
        /* Update Progress Bar Width */
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`;
        /* Calculate Display For Duration */
        const durationMinutes = Math.floor(duration / 60);
        let durationseconds = Math.floor(duration % 60);
        if(durationseconds < 10){
            durationseconds = `0${durationseconds}`;
        }
        if(durationseconds){
            durationElement.textContent = `${durationMinutes}:${durationseconds}`;
        }
        /* Calculate Display For Current Time */
        const currentMinutes = Math.floor(currentTime / 60);
        let currentseconds = Math.floor(currentTime % 60);
        if(currentseconds < 10){
            currentseconds = `0${currentseconds}`;
        }
        currentTimeElement.textContent = `${currentMinutes}:${currentseconds}`;
    }
}
/* Previous Song */
function previousSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

/* Next Song */
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

/* Set Progress Bar Function */
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width)* duration;
}
/* On Load Select First Song */
loadSong(songs[songIndex]);

/* Play or Pause Event Listner */
playButton.addEventListener("click",() => {isPlaying ? pauseSong() : playSong()})
previousButton.addEventListener("click",previousSong);
nextButton.addEventListener("click",nextSong);
music.addEventListener("ended",nextSong);
music.addEventListener("timeupdate",updateProgressBar);
progressContainer.addEventListener("click",setProgressBar);