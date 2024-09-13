let startTime, endTime;
const gme = document.getElementById("game");
const hall_o_fame = document.getElementById("best-lst");

const Username = document.getElementById("name");

function main() {
    gme.style.display = "none";

    fetch_stats();
}

function save_stats(data) {
    console.log("reaction_time" + data);
    fetch("/post_stats", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                username: Username.value,
                reacion_time: data
            })
    });
}

function fetch_stats() {
    fetch("/fetch_stats", {
        method: "get"
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.stats.length; i++) {
            console.log(i);
            console.log(data.stats[i]);
            console.log("index: " + +(i - (data.stats.length)));
            let li = document.createElement("li");
            li.textContent = `#${i+1} ${data.stats[i].username}: ${data.stats[i].reaction_time}seconds`;
            hall_o_fame.appendChild(li);
        }
    });
}

function getRandomTime() {
    return Math.random() * 4000 + 1000;
}

function showBox() {
    const box = document.getElementById('box');
    box.style.left = Math.random() * (window.innerWidth - 150) + 'px'
    box.style.top = Math.random() * (window.innerHeight - 150) + 'px'
    box.style.display = 'block';
    startTime = new Date().getTime();
}

function startGame() {
    gme.style.display = "block";

    const box = document.getElementById('box');
    const message = document.getElementById('message');
    document.getElementById('playAgain').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('message').textContent = '';
    document.getElementById('result').textContent = ``;
    box.style.display = 'none';
    message.textContent = 'Wait for the ghost to appear...';

    const randomTime = getRandomTime();
    setTimeout(() => {
        message.textContent = 'Click the ghost!';
        showBox();
    }, randomTime);
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('playAgain').addEventListener('click', startGame);

document.getElementById('box').addEventListener('click', () => {
    endTime = new Date().getTime();
    const reactionTime = (endTime - startTime) / 1000;
    document.getElementById('playAgain').style.display = 'flex';
    document.getElementById('box').style.display = 'none';

    if (window.innerWidth < 500 && window.innerHeight < 500) { // 
        document.getElementById('result').innerHTML = `<img class="res-img" src="assets/cheater.png">
        <audio autoplay>
            <source src="assets/cheater.mp3" type="audio/mpeg">
        </audio>
        `;    

        setTimeout(() => {
            window.location.replace("/cheater.html");
        }, 10 * 1000);
    } else {
        document.getElementById('message').textContent = 'Great job!';
        document.getElementById('result').textContent = `Your reaction time is ${reactionTime} seconds.`;
        save_stats(reactionTime);
    }

});

main();