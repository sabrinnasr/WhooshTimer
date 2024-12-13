var clickSound = new Audio("sounds/click.wav")

var hours=0
var minutes=0
var seconds=0

var interval

var isRunning = false

function twoDigits(digit) {
    if (digit<10) {
        return('0'+digit)
    } else {
        return(digit)
    }
}

function start() {
    clickSound.play();

    if (!isRunning) {
        watch()
        interval= setInterval(watch,1000)
        isRunning = true 
    }
}

function pause() {
    clickSound.play();
    clearInterval(interval);
    isRunning = false
}

function restart() {
    clickSound.play();
    clearInterval(interval);
    hours=0
    minutes=0
    seconds=0
    document.getElementById('watch').innerText='00:00:00'
    isRunning = false
}

function watch() {
    seconds++
    if(seconds==60){
        minutes++
        sec=0
        if(minutes==60) {
            minutes=0
            hours++
        }
    }

    document.getElementById('watch').innerText=twoDigits(hours)+':'+twoDigits(minutes)+':'+twoDigits(seconds);
}

let lapTimes = [];

function saveTime() {
    clickSound.play();

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Cannot save 00:00:00 time!");
        return;
    }
}

function pause() {
    clickSound.play();
    clearInterval(interval);
    isRunning = false;

    if (hours !== 0 || minutes !== 0 || seconds !== 0) {
        let currentTime = `${twoDigits(hours)}h ${twoDigits(minutes)}m ${twoDigits(seconds)}s`;
        
        lapTimes.unshift(currentTime);

        if (lapTimes.length > 3) {
            lapTimes.pop();
        }

        updateLapTimes();
    }
}

function resetTimer() {
    hours = 0;
    minutes = 0;
    seconds = 0;

    document.getElementById('watch').innerText = '00:00:00';
    isRunning = false;
}

function updateLapTimes() {
    let lapsList = document.getElementById('lapsList');
    let lapCount = document.getElementById('lapCount');

    lapsList.innerHTML = '';  

    lapCount.textContent = lapTimes.length;

    lapTimes.forEach((time, index) => {
        let lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `<span>${index + 1}</span><span>${time}</span>`;
        lapsList.appendChild(lapItem);
    });
}
