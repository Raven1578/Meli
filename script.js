const introWindow = document.getElementById("introWindow");
const questionWindow = document.getElementById("questionWindow");
const finalWindow = document.getElementById("finalWindow");
const celebration = document.getElementById("celebration");

const continueButton = document.getElementById("continueButton");
const introClose = document.getElementById("introClose");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const closeButton = document.getElementById("closeButton");

const questionText = document.getElementById("questionText");
const windowTitle = document.getElementById("windowTitle");

const backgroundMusic = document.getElementById("backgroundMusic");

let attempts = 0;
let popupCount = 0;
let highestZ = 200;

const MAX_POPUPS = 30;

const messages = [
  "Why no? :c",
  "Are you sure? :c",
  "Please Meli?",
  "Geng geng to pero mapagmahal promise!",
  "Lulutuan kita promise!",
  "Ayaw mo talaga :c",
  "Bilhan kita loopy!"
];

const errorMessages = [
  "Click no = Idol mo si Shea HAHAHA",
  "Hindi na kita lulutuan ng sinigang.",
  "?!?!!!",
  "Error 404: Answer not found.",
  "Gagi wag! Please reconsider!",
  "Gagsti.",
  "Huhubels.",
  "Hack ko wifi niyo sige",
  "Aray gagi",
  "Di kaya ng yosi to."
];

function openQuestion() {
  introWindow.classList.remove("active");
  questionWindow.classList.add("active");
}

continueButton.addEventListener("click", openQuestion);
introClose.addEventListener("click", openQuestion);

function spawnErrorPopup() {
  if (popupCount >= MAX_POPUPS) return;

  popupCount++;

  const popup = document.createElement("div");
  popup.className = "error-popup";

  const randomMessage =
    errorMessages[Math.floor(Math.random() * errorMessages.length)];

  const randomX = Math.random() * Math.max(10, window.innerWidth - 350);
  const randomY = Math.random() * Math.max(10, window.innerHeight - 180);

  popup.style.left = randomX + "px";
  popup.style.top = randomY + "px";
  popup.style.zIndex = ++highestZ;

  popup.innerHTML = `
    <div class="title-bar">
      <span>Windows Error</span>
      <button class="title-close popup-x" aria-label="Close">×</button>
    </div>

    <div class="error-content">
      <div class="error-symbol">❌</div>
      <div class="error-message">${randomMessage}</div>
    </div>

    <div class="error-buttons">
      <button class="win-button popup-ok">OK</button>
    </div>
  `;

  document.body.appendChild(popup);

  function removePopup() {
    popup.remove();
    popupCount--;
  }

  popup.querySelector(".popup-x").addEventListener("click", removePopup);
  popup.querySelector(".popup-ok").addEventListener("click", removePopup);
}

function createErrorClutter() {
  const numberOfPopups = 3 + Math.floor(Math.random() * 3);

  for (let i = 0; i < numberOfPopups; i++) {
    spawnErrorPopup();
  }
}

function nextMessage() {
  attempts++;

  createErrorClutter();

  if (attempts >= 8) {
    questionText.textContent = "May I court you?";
    windowTitle.textContent = "FinalQuestion.exe";

    noButton.style.display = "none";
    closeButton.style.display = "none";

    yesButton.textContent = "YES";
    return;
  }

  questionText.textContent = messages[attempts - 1];
  windowTitle.textContent = "Please.exe";

  questionWindow.classList.remove("active");
  void questionWindow.offsetWidth;
  questionWindow.classList.add("active");
}

noButton.addEventListener("click", nextMessage);
closeButton.addEventListener("click", nextMessage);

yesButton.addEventListener("click", () => {
  document.querySelectorAll(".error-popup").forEach(popup => {
    popup.remove();
  });

  popupCount = 0;

  questionWindow.classList.remove("active");
  finalWindow.classList.add("active");
});

document.getElementById("finishButton").addEventListener("click", () => {
  finalWindow.classList.remove("active");
});

let draggedWindow = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

document.addEventListener("pointerdown", (event) => {
  const titleBar = event.target.closest(".title-bar");

  if (!titleBar || event.target.closest("button")) return;

  const parent = titleBar.parentElement;

  if (
    !parent.classList.contains("window") &&
    !parent.classList.contains("error-popup")
  ) return;

  draggedWindow = parent;

  const rect = draggedWindow.getBoundingClientRect();

  draggedWindow.style.position = "fixed";
  draggedWindow.style.left = rect.left + "px";
  draggedWindow.style.top = rect.top + "px";
  draggedWindow.style.margin = "0";
  draggedWindow.style.transform = "none";
if (draggedWindow.id === "questionWindow") {
  draggedWindow.style.zIndex = "99999";
} else {
  draggedWindow.style.zIndex = ++highestZ;
}
  dragOffsetX = event.clientX - rect.left;
  dragOffsetY = event.clientY - rect.top;

  titleBar.setPointerCapture(event.pointerId);
});

document.addEventListener("pointermove", (event) => {
  if (!draggedWindow) return;

  let x = event.clientX - dragOffsetX;
  let y = event.clientY - dragOffsetY;

  x = Math.max(0, Math.min(x, window.innerWidth - draggedWindow.offsetWidth));
  y = Math.max(0, Math.min(y, window.innerHeight - 35));

  draggedWindow.style.left = x + "px";
  draggedWindow.style.top = y + "px";
});

document.addEventListener("pointerup", () => {
  draggedWindow = null;
});

window.addEventListener("load", () => {
  backgroundMusic.volume = 0.5;
  backgroundMusic.play().catch(() => {});
});

document.addEventListener("click", function startMusicOnce() {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {});
  }
}, { once: true });

function updateClock() {
  const now = new Date();

  document.getElementById("clock").textContent =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
}

updateClock();
setInterval(updateClock, 1000);


const mouseClickSound = new Audio("audio/mouse-click.mp3");
mouseClickSound.volume = 0.45;

document.addEventListener("click", (event) => {
  if (event.target.closest("button")) {
    mouseClickSound.currentTime = 0;
    mouseClickSound.play().catch(() => {});
  }
}, true);


