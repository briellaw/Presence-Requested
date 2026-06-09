let gameStarted = false;
let gameEnded = false;

let solved = {};
let completedCount = 0;

// PLAYER SETUP
const player = document.getElementById("mini-him");
let x = 680;
let y = 290;

// QUESTIONS
const questions = {
  q1: {
    question: "When did we have our first date?",
    options: ["18 november 2023", "27 november 2023", "1 december 2023", "5 december 2023"],
    answer: "1 december 2023"
  },
  q2: {
    question: "Where was our first overseas trip together?",
    options: ["Sapporo", "Taiwan", "Vietnam", "Bali"],
    answer: "Taiwan"
  },
  q3: {
    question: "What is my nickname for you?",
    options: ["Baby", "low zhi yu", "mylo", "pookie"],
    answer: "mylo"
  },
  q4: {
    question: "what is our favourite movie that we've watched together?",
    options: ["Obsessions", "Apex", "Swapped", "Despicable Me"],
    answer: "Apex"
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const bubble = document.getElementById("speech-bubble");
  const miniMe = document.getElementById("mini-me");

  const messages = [
    "What did we do during the movies heh~",
    "Does he know the answer?",
    "Is he really Agent 2108?",
    "Hmm... he's taking his time",
    "I should test him harder..."
  ];

  const positions = [
    { top: 100, left: 150 },
    { top: 200, left: 700 },
    { top: 400, left: 300 },
    { top: 500, left: 900 }
  ];

  let lastIndex = -1;

  function moveMiniMe() {
    // avoid repeating same position twice
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * positions.length);
    } while (newIndex === lastIndex);

    lastIndex = newIndex;

    const pos = positions[newIndex];
    const msg = messages[Math.floor(Math.random() * messages.length)];

    miniMe.style.top = pos.top + "px";
    miniMe.style.left = pos.left + "px";

    bubble.innerText = msg;
    bubble.classList.remove("hidden");

    const rect = miniMe.getBoundingClientRect();

    bubble.style.top = (rect.top - 25) + "px";
    bubble.style.left = (rect.left + rect.width / 2) + "px";
    bubble.style.transform = "translateX(-50%)";

    setTimeout(() => {
      bubble.classList.add("hidden");
    }, 4000);
  }

  moveMiniMe();              // run immediately once
  setInterval(moveMiniMe, 5000);
});


// GAME START (first movement)
document.addEventListener("keydown", (e) => {
  gameStarted = true;

  if (e.key === "w") y -= 10;
  if (e.key === "s") y += 10;
  if (e.key === "a") x -= 10;
  if (e.key === "d") x += 10;

  player.style.left = x + "px";
  player.style.top = y + "px";

  checkCollision();
});


// COLLISION CHECK
function checkCollision() {
  if (!gameStarted || gameEnded) return;

  const playerRect = player.getBoundingClientRect();
  const dogs = document.querySelectorAll(".question-icon");

  dogs.forEach((dog) => {
    if (solved[dog.id]) return;

    const dogRect = dog.getBoundingClientRect();

    const hit =
      playerRect.right > dogRect.left &&
      playerRect.left < dogRect.right &&
      playerRect.bottom > dogRect.top &&
      playerRect.top < dogRect.bottom;

    if (hit) {
      openQuestion(dog.id);
    }
  });
}


// OPEN QUESTION UI
function openQuestion(id) {
  const box = document.getElementById("dialogue-box");
  const questionText = document.getElementById("dialogue-question");
  const optionsBox = document.getElementById("mcq-options");
  const resultBox = document.getElementById("dialogue-result");

  const q = questions[id];
  if (!q) return;

  box.classList.remove("hidden");
  questionText.innerText = q.question;

  optionsBox.innerHTML = "";
  resultBox.innerText = "";

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.classList.add("mcq-btn");
    btn.innerText = option;

    btn.onclick = () => {
      if (option === q.answer) {
        handleCorrect(id, box, resultBox);
      } else {
        resultBox.innerText = "FAKE AGENT DETECTED";
        resultBox.style.color = "red";
      }
    };

    optionsBox.appendChild(btn);
  });
}


// CORRECT ANSWER LOGIC
function handleCorrect(id, box, resultBox) {
  if (solved[id]) return;

  solved[id] = true;
  completedCount++;

  resultBox.innerText = "ACCESS GRANTED";
  resultBox.style.color = "lightgreen";

  // update progress
  const progressText = document.getElementById("progress-text");

    progressText.innerText = completedCount + " / 4 VERIFIED";
    progressText.classList.add("glow-progress");
    setTimeout(() => {
  progressText.classList.remove("glow-progress");
}, 600);


  // remove dog + close box
  setTimeout(() => {
    box.classList.add("hidden");

    const dog = document.getElementById(id);
    if (dog) dog.style.display = "none";

    checkWin();
  }, 600);
}


// WIN CONDITION
function checkWin() {
  if (gameEnded) return;

  if (completedCount === 4) {
    gameEnded = true;
    showEnding();
  }
}


// ENDING SCREEN
function showEnding() {
  const end = document.getElementById("ending-screen");
  const msg = document.getElementById("ending-message");
  const btn = document.getElementById("invite-btn");

  if (!end || !msg || !btn) return;

  end.classList.remove("hidden");
  end.classList.add("show-ending");

  btn.classList.add("hidden");

  const text =
    "Agent\u00A02108\u00A0confirmed.\nLove\u00A0confirmed.\nWelcome\u00A0Back.";

  let i = 0;
  msg.innerText = "";

  const typing = setInterval(() => {
    msg.innerText += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(typing);
      btn.classList.remove("hidden");
      btn.classList.add("show-invite-btn");
    }
  }, 40);
}

document.getElementById("invite-btn").onclick = () => {
  window.location.href = "invitation.html";
};


// RESET SAFETY ON LOAD
window.addEventListener("DOMContentLoaded", () => {
  gameStarted = false;
  gameEnded = false;
  solved = {};
  completedCount = 0;

  console.log("Game reset complete");
});
