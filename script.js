const questions = [
    {
        text: "____ candidate has experience in Java development.",
        options: ["This", "These", "That", "Those"],
        correct: ["This", "That"]
    },
    {
        text: "____ consultants are specialized in SAP S/4HANA.",
        options: ["This", "These", "That", "Such"],
        correct: ["These", "Those"]
    },
    {
        text: "____ resumes belong to the SAP FI candidates.",
        options: ["Those", "These", "This", "None"],
        correct: ["These", "Those"]
    },
    {
        text: "____ interview was rescheduled for next week.",
        options: ["These", "This", "That", "Those"],
        correct: ["That", "This"]
    },
    {
        text: "____ requirements were canceled yesterday.",
        options: ["These", "This", "That", "Those"],
        correct: ["These", "Those"]
    },
    {
        text: "____ position is for a senior SAP consultant.",
        options: ["This", "These", "That", "Those"],
        correct: ["This", "That"]
    },
    {
        text: "____ candidates are available for the SAP SD role.",
        options: ["That", "These", "Those", "Such"],
        correct: ["These", "Those"]
    },
    {
        text: "____ resumes were submitted last week.",
        options: ["These", "This", "Those", "None"],
        correct: ["Those", "These"]
    },
    {
        text: "____ consultant has expertise in SAP Basis.",
        options: ["These", "This", "That", "Those"],
        correct: ["This", "That"]
    },
    {
        text: "We need to interview ____ consultant today.",
        options: ["That", "This", "These", "Such"],
        correct: ["This", "That"]
    }
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.getElementById('result-container');
const resultsDiv = document.getElementById('results');
const retryButton = document.getElementById('retry-button');

function loadQuiz() {
    let quizHtml = '';
    questions.forEach((q, index) => {
        quizHtml += `
        <div class="question">
            <p>${index + 1}. ${q.text}</p>
            <ul class="options">
                ${q.options.map((option, i) => `
                    <li>
                        <input type="checkbox" name="q${index}" value="${option}" id="q${index}o${i}">
                        <label for="q${index}o${i}">${option}</label>
                    </li>
                `).join('')}
            </ul>
        </div>
        `;
    });
    quizContainer.innerHTML = quizHtml;
}

function calculateResults() {
    let score = 0;
    let resultsHtml = '';
    questions.forEach((q, index) => {
        const selectedOptions = Array.from(document.querySelectorAll(`input[name="q${index}"]:checked`))
                                    .map(input => input.value);
        const correct = q.correct;
        const hasCorrectAnswer = correct.some(val => selectedOptions.includes(val));

        if (hasCorrectAnswer) {
            score++;
            resultsHtml += `<p>Pregunta ${index + 1}: Correcta (${correct.join(', ')})</p>`;
        } else {
            resultsHtml += `<p>Pregunta ${index + 1}: Incorrecta. La(s) respuesta(s) correcta(s) es/son ${correct.join(', ')}</p>`;
        }
    });
    resultsHtml += `<p><strong>Puntuación: ${score} / ${questions.length}</strong></p>`;
    resultsDiv.innerHTML = resultsHtml;
}

submitButton.addEventListener('click', () => {
    calculateResults();
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
});

retryButton.addEventListener('click', () => {
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    loadQuiz();
});

loadQuiz();
