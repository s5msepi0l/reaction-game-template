let startTime, endTime;

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
    document.getElementById('message').textContent = 'Great job!';
    document.getElementById('result').textContent = `Your reaction time is ${reactionTime} seconds.`;
});
