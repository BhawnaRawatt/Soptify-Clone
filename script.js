console.log("Welcome to JavaScript");

//initilize the variable 
let songindex = 0;
let audioElement = new Audio('./Song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let Progressbar = document.getElementById('Progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Haan Ki Haan", filePath: "./song/1.mp3" , coverPath: "cover/1.jpg"},
    {songName: "Lover", filePath: "./song/2.mp3" , coverPath: "cover/2.jpg"},
    {songName: "Janiye", filePath: "./song/3.mp3" , coverPath: "cover/3.jpg"},
    {songName: "Bekhayali", filePath: "./song/4.mp3" , coverPath: "cover/4.jpg"},
    {songName: "Dheere Dheere", filePath: "./song/5.mp3" , coverPath: "cover/5.jpg"},
    {songName: "Fakira By Sanam", filePath: "./song/6.mp3" , coverPath: "cover/6.jpg"},
    {songName: "O Mere Sona re", filePath: "./song/7.mp3" , coverPath: "cover/7.jpg"},
    {songName: "Baby Baby", filePath: "./song/8.mp3" , coverPath: "cover/8.jpg"},
    {songName: "abcd", filePath: "./song/9.mp3" , coverPath: "cover/9.jpg"},
    
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


//handle play/pause click
masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
          
});

//list of Event
audioElement.addEventListener('timeupdate',()=>{
console.log("timeupdate");

//update seekbar
Progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
console.log("progress");
Progressbar.value = Progress;
})

Progressbar.addEventListener('change', () => {
    audioElement.currentTime = Progressbar.value * audioElement.duration / 100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-circle-play')) {
          
        makeAllPlay();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = 'song/${songindex + 1}.mp3';
        masterSongName.innerHTML = songs[songindex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        }
        else{
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.currentTime = 1;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            
        }

    });
});

document.getElementById('next').addEventListener('click' , () =>{
    if(songindex >= 9){
            songindex = 0;
    }
    else {
        songindex += 1;
    }

    audioElement.src = `./song/${songindex+1}.mp3`;
    masterSongName.innerHTML = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click' , () =>{
    if(songindex <= 0){
        songindex = 0;
    }
    else{
        songindex -= 1;
    }
    audioElement.src = `./song/${songindex+1}.mp3`;
    masterSongName.innerHTML = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
    

})
