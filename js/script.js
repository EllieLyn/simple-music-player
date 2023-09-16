const content = document.querySelector(".content");
const playImg = content.querySelector(".music-image img");
const musicName = content.querySelector(".music-titles .name");
const musicArtist = content.querySelector(".music-titles .artist");

const music = document.querySelector(".main-song");
const playBtn = content.querySelector(".play-pause");
const playBtnIcon = content.querySelector(".play-pause span");
const prevBtn = content.querySelector("#prev"); 
const nextBtn = content.querySelector("#next"); 
const progressBar = content.querySelector(".progress-bar");
const progressDetails = content.querySelector(".progress-details");
const repeatBtn = content.querySelector("#repeat");
const shuffle = content.querySelector("#shuffle");

let index = 2;
window.addEventListener("load", ()=>{
    loadData(index);
})

function playSong(){
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    music.play();
}

function pauseSong(){
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    music.pause();
}

function loadData(indexValue){
    musicName.innerHTML = songs[indexValue-1].name;
    musicArtist.innerHTML = songs[indexValue-1].artist;
    playImg.src = songs[indexValue-1].img;
    music.src = songs[indexValue-1].audio;
    music.load();
}

playBtn.addEventListener("click", ()=>{
    const isMusicPaused = content.classList.contains("paused");
    if(isMusicPaused){
        pauseSong();
    } else {
        playSong();
    }
})

nextBtn.addEventListener("click", ()=>{
    nextSong();
})

prevBtn.addEventListener("click", ()=>{
    prevSong();
})

function nextSong(){
    index++;
    if(index>songs.length){
        index = 1;
    } else {
        index = index;
    }
    loadData(index);
    playSong();
}

function prevSong(){
    index--;
    if(index<=0){
        index = songs.length;
    } else {
        index = index;
    }
    loadData(index);
    playSong();
}

music.addEventListener("timeupdate", (e)=>{
    const initialTime = e.target.currentTime; //get current music time
    const finalTime = e.target.duration; //get music duration
    let BarWidth = (initialTime/finalTime)*100;
    progressBar.style.width = BarWidth + "%";

    progressDetails.addEventListener("click", (e)=>{
        let progressValue = progressDetails.clientWidth; //get width of progress bar
        let clickedOffsetX = e.offsetX; //get offset x value
        let musicDuration = music.duration; //get total music duration
        
        music.currentTime = (clickedOffsetX/progressValue)*musicDuration;
    });

    //timer logic
    music.addEventListener("loadeddata", ()=>{
        let finalTimeData = content.querySelector(".final");

        //update finalDuration
        let audioDuration = music.duration;
        let finalMinutes = Math.floor(audioDuration / 60);
        let finalSeconds = Math.floor(audioDuration % 60);
        if(finalSeconds<10){
            finalSeconds = "0" + finalSeconds;
        }
        finalTimeData.innerText = finalMinutes + ": " + finalSeconds;
    });

    //update current duration
    let currentTimeDate = content.querySelector(".current");
    let currentTime = music.currentTime;
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds<10){
        currentSeconds = "0" + currentSeconds;
    };
    currentTimeDate.innerText = currentMinutes + ": " + currentSeconds;

    //repeat button logic
    repeatBtn.addEventListener("click", ()=>{
        music.currentTime = 0;
    });
})

//shuffle logic
shuffle.addEventListener("click", ()=>{
    let randIdx = Math.floor(Math.random()*songs.length) + 1; //select random between 1 and songs.length
    loadData(randIdx);
    playSong();
})

music.addEventListener("ended", ()=>{
    index++;
    if(index>songs.length){
        index=1;
    }
    loadData(index);
    playSong();
})