const quizData = [
    {
      question: "Cili është elementi bazë i HTML?",
      options: ["<head>", "<body>", "<html>", "<div>"],
      answer: "<html>"
    },
    {
      question: "Cili është versioni më i fundit i CSS?",
      options: ["CSS1", "CSS2", "CSS3", "CSS4"],
      answer: "CSS3"
    },
    {
      question: "Cili atribut përdoret për të lidhur një skedar CSS?",
      options: ["href", "src", "link", "rel"],
      answer: "href"
    },
    {
      question: "Cila komandë në JS krijon një popup alert?",
      options: ["popup()", "alert()", "message()", "show()"],
      answer: "alert()"
    }
];
  
let currentQuestion = 0;
let score = 0;
let timerInterval;
const totalTime = 15; // Sekonda për secilën pyetje
let timeLeft = totalTime;

// Elementet e DOM
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const quizContainer = document.getElementById("quiz-container");
const progressBar = document.getElementById("progress-bar");
const timerEl = document.getElementById("timer");
  
// Ngarkon pyetjen aktuale
function loadQuestion() {
  resetTimer();
  const currentQuiz = quizData[currentQuestion];
  questionEl.innerText = currentQuiz.question;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  currentQuiz.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn", "btn-outline-secondary", "d-block", "mb-2", "w-100");
    button.onclick = () => selectAnswer(button, option);
    optionsEl.appendChild(button);
  });

  updateProgressBar();
  startTimer();
}
  
  // Përdoruesi zgjedh një përgjigje
  function selectAnswer(button, selectedOption) {
    clearInterval(timerInterval);
    const correct = quizData[currentQuestion].answer;
    const allButtons = optionsEl.querySelectorAll("button");
  
    allButtons.forEach(btn => {
      btn.disabled = true;
      if (btn.innerText === correct) {
        btn.classList.replace("btn-outline-secondary", "btn-success");
      } else if (btn.innerText === selectedOption) {
        btn.classList.replace("btn-outline-secondary", "btn-danger");
      }
    });
  
    if (selectedOption === correct) {
      score++;
    }
    nextBtn.disabled = false;
  }
  
  // Përparimi në pyetjen tjetër
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
  
  // Shfaq rezultatin
  function showResult() {
    quizContainer.style.display = "none";
    resultEl.style.display = "block";
    scoreEl.innerText = `${score} nga ${quizData.length} pyetje`;
    progressBar.style.width = "100%";
    progressBar.setAttribute("aria-valuenow", 100);
  }
  
  // Rifillon quiz-in
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = "block";
    resultEl.style.display = "none";
    loadQuestion();
  }
  
  // Përditëson progress bar-in sipas pyetjes aktuale
  function updateProgressBar() {
    const progress = (currentQuestion / quizData.length) * 100;
    progressBar.style.width = progress + "%";
    progressBar.setAttribute("aria-valuenow", progress);
  }
  
  // Starton timer për secilën pyetje
  function startTimer() {
    timeLeft = totalTime;
    timerEl.innerText = timeLeft;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        autoSelect();
      }
    }, 1000);
  }
  
  // Riseton timer-in
  function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = totalTime;
    timerEl.innerText = timeLeft;
  }
  
  // Në rast se koha skadon, selektohet automatikisht përgjigjja korrekte
  function autoSelect() {
    const allButtons = optionsEl.querySelectorAll("button");
    const correct = quizData[currentQuestion].answer;
    allButtons.forEach(btn => {
      btn.disabled = true;
      if (btn.innerText === correct) {
        btn.classList.replace("btn-outline-secondary", "btn-success");
      }
    });
    nextBtn.disabled = false;
  }
  
  // Nis quiz-in
  loadQuestion();
  