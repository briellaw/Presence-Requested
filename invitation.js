const missionText = document.getElementById("mission-text");
const details = document.getElementById("details");
const buttonRow = document.getElementById("button-row");
const acceptBtn = document.getElementById("accept-btn");
const declineBtn = document.getElementById("decline-btn");

const text =
  "MISSION\u00A0COORDINATES\u00A0UNLOCKED...\n\nDear\u00A0Agent\u00A02108,\nYou\u00A0are\u00A0invited\u00A0to\u00A0a\u00A0special\u00A0mission\u00A0with\u00A0me.";

let i = 0;
missionText.innerText = "";

const typing = setInterval(() => {
  missionText.innerText += text[i];
  i++;

  if (i >= text.length) {
    clearInterval(typing);

    setTimeout(() => {
      details.classList.remove("hidden");
    }, 400);

    setTimeout(() => {
    }, 900);

    setTimeout(() => {
      buttonRow.classList.remove("hidden");
    }, 1400);
  }
}, 45);

acceptBtn.addEventListener("click", () => {
  alert("Mission confirmed. See you at Marina Barrage");

  const card = document.getElementById("dossier-card");

  card.style.transition = "1.5s";
  card.style.opacity = "0";

  setTimeout(() => {
    card.style.opacity = "1";

    card.innerHTML = `
      <div id="terminated">
        <h1>FILE PURGED</h1>
        <p>Mission details have been removed.</p>
        <p>No record of this operation exists.</p>
      </div>
    `;
  }, 1500);
});

let declineCount = 0;

declineBtn.addEventListener("mouseenter", () => {
  declineCount++;

  const maxX = window.innerWidth - declineBtn.offsetWidth - 20;
  const maxY = window.innerHeight - declineBtn.offsetHeight - 20;

  declineBtn.style.position = "fixed";
  declineBtn.style.left = Math.random() * maxX + "px";
  declineBtn.style.top = Math.random() * maxY + "px";

  declineBtn.style.opacity = 1 - declineCount * 0.2;
  declineBtn.style.background = `rgb(${128 - declineCount * 20}, ${128 - declineCount * 20}, ${128 - declineCount * 20})`;

  if (declineCount >= 5) {
    declineBtn.style.display = "none";
  }
});
