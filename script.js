const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer =document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

//Music Titles
const audios=['سورة يس','سورة يوسف','سورةفصلت']

//keep track of audios
let songIndex =2

//Initially load audio info dom
loadSong(audios[songIndex])

//update song details
function loadSong(song){
    title.innerText = song
    audio.src =`music/${song}.mp3`
    cover.src = `img/${song}.jpg`
}
function preSong(){
songIndex --
if(songIndex < 0){
    songIndex = audios.length -1

}
loadSong(audios[songIndex])
playSong()
} 
function nextSong(){
    songIndex ++
    if(songIndex > audios.length -1){
        songIndex = 0
    
    }
    loadSong(audios[songIndex])
    playSong()
}
function playSong(){
musicContainer.classList.add('play')
playBtn.querySelector('i.fas').classList.remove('fa-play')
playBtn.querySelector('i.fas').classList.add('fa-pause')
audio.play()
}
function pauseSong(){
musicContainer.classList.remove('play')
playBtn.querySelector('i.fas').classList.add('fa-play')
playBtn.querySelector('i.fas').classList.remove('fa-pause')
audio.pause()
}
function UpdateProgress(e){
    const {duration ,currentTime } =e.srcElement
    const progressPercentage =(currentTime/duration) * 100
    progress.style.width =`${progressPercentage}%`
// console.log(e.srcElement.currentTime)
}
function setProgress(e){
const width = this.clientWidth
const clickX = e.offsetX
const duration = audio.duration
audio.currentTime=(clickX/width) * duration
}
//Event listeners
playBtn.addEventListener('click',() =>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

//change songs events
prevBtn.addEventListener('click',preSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',UpdateProgress)
progressContainer.addEventListener('click',setProgress)
audio.addEventListener('ended',nextSong)