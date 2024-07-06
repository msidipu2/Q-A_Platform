//Logic
let timer;
let timeLeft = 60;
let startTime;

function generateQuestions() {
    const numQuestions = document.getElementById('numQuestions').value;
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = '';

    for (let i = 1; i <= numQuestions; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>Question ${i}:</p>
            <label>
                <input type="radio" name="question${i}" value="A">
                Option A
            </label>
            <label>
                <input type="radio" name="question${i}" value="B">
                Option B
            </label>
            <label>
                <input type="radio" name="question${i}" value="C">
                Option C
            </label>
            <label>
                <input type="radio" name="question${i}" value="D">
                Option D
            </label>
        `;
        questionsDiv.appendChild(questionDiv);
    }

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 300;
    startTime = Date.now();
    document.getElementById('time').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitExam();
        }
    }, 1000);
}

function submitExam(event) {
    if (event) {
        event.preventDefault();
    }
    clearInterval(timer);

    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    
    const resultsDiv = document.getElementById('results');
    const form = document.getElementById('examForm');
    const formData = new FormData(form);
    let score = 0;
    const correctAnswers = { Question1: 'A', Question2: 'B', Question3: 'C', Question4: 'D', Question5: 'A' }; // Example correct answers

    resultsDiv.innerHTML = '<h2>Results:</h2>';
    formData.forEach((value, key) => {
        if (value === correctAnswers[key]) {
            score++;
        } else {
            resultsDiv.innerHTML += `<p>For ${key}, the correct answer is ${correctAnswers[key]}</p>`;
        }
    });

    resultsDiv.innerHTML += `<p>Your score: ${score}</p>`;
    resultsDiv.innerHTML += `<p>Time taken: ${timeTaken} seconds</p>`;
}
