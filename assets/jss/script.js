var startScreen = document.querySelector('#start-screen');
var timerEl = document.querySelector('#time');
var startBtn = document.querySelector('#start');
var questionsEl = document.querySelector('#questions');
var quesTitleEl = document.querySelector('#question-title');
var answerEl = document.querySelector('#choices');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var feedbackEl = document.querySelector('#feedback');
let index = 0;
let time = 60;
let timeInterval;

var questions = [
    {
        title: 'Commonly used data types DO NOT includes:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts',
    },
    {
        title: 'The condition in an if/else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square bracket'],
        answer: 'parentheses',
    },
    {
        title: 'Arrays in Javascript can be used to store ____.',
        choices: [
            'numbers and strings',
            'other arrays',
            'booleans',
            'all of the above',

        ],
        answer: 'all of the above',
    },
    {
        title: 'string values must be enclosed within _____ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        answer: 'quotes',
    },
    {
        title: 'A very useful tool used during development and debugging for printing content to the debugger is',
        choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
        answer: 'console.log',
    },
]
function startGame() {
    startScreen.classList.add('hide');
    timeInterval = setInterval(countdown, 1000);
    timerEl.textContent = time;
    renderQuestion();

}

function countdown() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endGame();
    }
}

function renderQuestion() {
    let currentQuestion = questions[index];
    quesTitleEl.textContent = currentQuestion.title;
    answerEl.innerHTML = '';
    currentQuestion.choices.foreach((choice) => {
        let choiceBtn = documment.createElement('button');
        choiceBtn.textContent = choice;
        answerEl.append(choiceBtn);
        choiceBtn.onclick = checkAnswer;

    });
}

function checkAnswer() {
    if (this.textContent !== questions[index].answer) {
        feedbackEl.classList.remove('hide');
        feedbackEl.textContent = 'Incorrect';
        setTimeout(function () {
            feedbackEl.classList.add('hide');
        }, 1000);
        time -= 10;
        timerEl.textContent = time;

        if (time <= 0) {
            time = 0;
            timerEl.textContent = time;
            endGame();
        }
    } else {
        feedbackEl.classList.remove('hide');
        feedbackEl.textContent = 'Correct!';
        setTimeout(function () {
            feedbackEl.classList.add('hide');
        }, 1000);
    }
    index++;
    if (index === questions.length) {
        endGame();
    } else {
        renderQuestion();
    }
}

function endGame() {
    clearInterval(timeInterval);
    quesTitleEl.classList.add('hide');
    feedbackEl.classList.add('hide');
    endScreen.classList.add('hide');
    finalScore.textContent = time;
    document.querySelector('#submit').onclick = ;

}
function saveScore() {
    let initials = document.querySelector('input').value;
    let highscores = JSON.parse(localStorage.getItem('score')) || [];

    if (initials) {
        let newScore = {
            initials: initials,
            score: time,
        };

        highscores.push(newScore)

        for (let i = highscores.length - 1; i > 0; i--) {
            if (highscores[i - 1].score <= newScore.score) {
                highscores.splice(i - 1, 1)
            }
            else {
                highscores.splice(highscores.length - 1, 1)
            }
        }
    }

    localStorage.setItem('scores', JSON.stringify(highscores));
}

startBtn.onclick = startGame;