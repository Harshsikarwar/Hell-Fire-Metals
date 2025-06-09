import musicData from "./musicData.js";

const musicList = document.getElementById("musicContainer");
const currMusicCover = document.getElementById("coverImg");
const currMusicName = document.getElementById("coverName");
const currMusicArtist = document.getElementById("artist");
const music = document.getElementById("music")

let activeMusicId = "M1"


//play button works
const playButton = document.querySelectorAll(".playButton");
const playBtn = document.getElementById("playButton");
const slider = document.getElementById("slider")
const currTime = document.getElementById("currTime")
const maxTime = document.getElementById("maxTime")
let playing = false;
let musicTime = 0;


function playMusic(){
    music.play();
    playBtn.setAttribute("src","https://cdn-icons-png.flaticon.com/128/16/16427.png")
    playing = true;
}

function stopMusic(){
    music.pause();
    playBtn.setAttribute("src","https://cdn-icons-png.flaticon.com/128/1055/1055007.png")
    playing = false;
}

playButton.forEach((music)=>{
    music.addEventListener("click", ()=>{
        if(playing === false){
            playMusic();
        }
        else{
            stopMusic();
        }
    })
})

//status and display

function currentStatus(){
    currMusicCover.setAttribute("src", musicData[activeMusicId]["cover Image"]);
    currMusicName.innerText = musicData[activeMusicId]["cover name"];
    currMusicArtist.innerText = musicData[activeMusicId]["artist"];
    music.setAttribute("src",musicData[activeMusicId]["source"]);

    const musicStatus = document.getElementById(activeMusicId);
    musicStatus.style.backgroundColor = "rgb(255, 255, 255)";

    maxTime.innerText=musicData[activeMusicId]["duration_in_min"]
    slider.max=musicData[activeMusicId]["duration_in_s"]
    slider.value=0;
    stopMusic();
}

function displayMusic() {
    for(const data in musicData){
        let musicDetails = document.createElement("div");
        musicDetails.setAttribute("class", "music-details");
        musicDetails.setAttribute("id", data);
        musicList.appendChild(musicDetails);

        let textData = document.createElement("div");
        textData.setAttribute("class", "music-text");

        let coverImage = document.createElement("img");
        coverImage.setAttribute("src", musicData[data]["cover Image"]);
        coverImage.setAttribute("class", "cover-image");

        let coverName = document.createElement("h2");
        coverName.innerText = musicData[data]["cover name"];
        coverName.setAttribute("class", "cover-name");

        let artistName = document.createElement("h3");
        artistName.innerText = musicData[data]["artist"];
        artistName.setAttribute("class", "artist-name");

        let playButton = document.createElement("img");
        playButton.setAttribute("src", "https://cdn-icons-png.flaticon.com/128/5529/5529096.png");
        playButton.setAttribute("class", "play-button");

        musicDetails.appendChild(coverImage);
        musicDetails.appendChild(textData);
        textData.appendChild(coverName);
        textData.appendChild(artistName);
        musicDetails.appendChild(playButton);
    }
}

displayMusic();
currentStatus();

function changeStatus(id) {
    musicData[activeMusicId]["status"] = "unactive";
    const musicStatus = document.getElementById(activeMusicId);
    musicStatus.style.backgroundColor = "rgb(224, 223, 223)";
    musicData[id]["status"] = "active";
    activeMusicId = id;
    currentStatus();
}

const musicDetails = document.querySelectorAll(".music-details");
musicDetails.forEach((music) => {
    music.addEventListener("click", () => {
        changeStatus(music.id);
    })
})

//next - prev button section

function next(){
    let Num = activeMusicId.slice(-1);
    Num = Number(Num) + 1;
    if(Num <= 5){
        Num = String(Num);
        let MusicId = activeMusicId.slice(0, -1) + Num;
        changeStatus(MusicId)
    }
}

function prev(){
    let Num = activeMusicId.slice(-1);
    Num = Number(Num) - 1;
    if(Num >= 1){
        Num = String(Num);
        let MusicId = activeMusicId.slice(0, -1) + Num;
        changeStatus(MusicId)
    }
}

const nextBtn = document.getElementById("nextButton");
const prevBtn = document.getElementById("prevButton");

nextBtn.addEventListener("click", ()=>{
    next();
})

prevBtn.addEventListener("click", ()=>{
    prev();
})

if(music.play){
    setInterval(()=>{
        slider.value = music.currentTime
        let currentMinutes = Math.floor(music.currentTime / 60);
        let currentSeconds = Math.floor(music.currentTime - currentMinutes * 60);

        if(currentMinutes < 10 ){currentMinutes = "0" + currentMinutes}
        if(currentSeconds < 10){currentSeconds = "0" + currentSeconds}
        currTime.innerText = currentMinutes +":"+currentSeconds
    },500)
}

slider.onchange = function(){
    music.play();
    music.currentTime = slider.value
    playMusic();
}