fetch("./quizData.json")
  .then(response => response.json())
  .then(data => console.log("データ取得成功！", data))
  .catch(error => console.error("データ取得失敗:", error));

let quizData = [];
let currentQuestion = 0;

async function loadQuizData() {
    try {
        const response = await fetch("quizData.json");
        quizData = await response.json();
        displayQuestion();
    } catch (error) {
        console.error("データの読み込みに失敗しました", error);
    }
}

function displayQuestion() {
    if (quizData.length === 0) return;
    const q = quizData[currentQuestion];

    document.getElementById("question").textContent = q.question;

    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = "";

    q.answer.forEach((_, index) => {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `（${index + 1}）の答え`;
        input.classList.add("answer-input");
        inputContainer.appendChild(input);
    });

    document.getElementById("result").textContent = "";
    document.getElementById("next-button").style.display = "none";
}

function checkAnswer() {
    const userInputs = document.querySelectorAll(".answer-input");
    const correctAnswers = quizData[currentQuestion].answer;
    let allCorrect = true;

    userInputs.forEach((input, index) => {
        const userAnswer = input.value.trim();
        if (userAnswer !== correctAnswers[index]) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        document.getElementById("result").textContent = "正解！";
        document.getElementById("result").style.color = "green";
    } else {
        document.getElementById("result").textContent = `不正解。正解は「${correctAnswers.join("、")}」です。`;
        document.getElementById("result").style.color = "red";
    }

    document.getElementById("next-button").style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        alert("クイズ終了！");
    }
}

document.addEventListener("DOMContentLoaded", loadQuizData);
