const startButton = document.getElementById("start-button");
const introCard = document.querySelector(".intro-card");

let battery = 1;
let stress = 20;
let time = "8:03 AM";
let pigeonFriend = false;
let safeChoices = 0;

startButton.addEventListener("click", startGame);

/* --------------------------------
   START AND HELPER FUNCTIONS
-------------------------------- */

function startGame() {
  showDirectionsScenario();
}

function updateStats() {
  const batteryValue = document.getElementById("battery-value");
  const stressValue = document.getElementById("stress-value");
  const timeValue = document.getElementById("time-value");

  if (batteryValue) {
    batteryValue.textContent = battery + "%";
  }

  if (stressValue) {
    stressValue.textContent = stress + "%";
  }

  if (timeValue) {
    timeValue.textContent = time;
  }
}

function showResult(message, nextScene, delay = 1800) {
  const resultMessage = document.getElementById("result-message");

  if (resultMessage) {
    resultMessage.textContent = message;
  }

  updateStats();
  disableButtons();

  setTimeout(nextScene, delay);
}

function disableButtons() {
  const buttons = document.querySelectorAll(".choices button");

  buttons.forEach(function (button) {
    button.disabled = true;
  });
}

function statsHTML() {
  return `
    <div class="stats">
      <p>🔋 Battery: <span id="battery-value">${battery}%</span></p>
      <p>😰 Stress: <span id="stress-value">${stress}%</span></p>
      <p>🕗 Time: <span id="time-value">${time}</span></p>
    </div>
  `;
}

function phoneDies(message) {
  battery = 0;

  showResult(message, gameOver, 1700);
}

/* --------------------------------
   SCENARIO 1: DIRECTIONS
-------------------------------- */

function showDirectionsScenario() {
  time = "8:03 AM";

  introCard.innerHTML = `
    <p class="warning">⚠ SURVIVAL MODE ACTIVATED ⚠</p>
    <h1 class="game-title">THE LAST<br>1%</h1>
    ${statsHTML()}

    <section class="scenario">
      <h2>You are lost.</h2>
      <p>You need directions, but your phone is at 1%.</p>
      <p>What do you do?</p>
    </section>

    <div class="choices">
      <button id="maps-button">Open Maps</button>
      <button id="stranger-button">Ask a stranger</button>
      <button id="pigeon-button">Follow a pigeon</button>
    </div>

    <p id="result-message" class="tip">
      Choose wisely. The battery icon is already judging you.
    </p>
  `;

  document
    .getElementById("maps-button")
    .addEventListener("click", function () {
      stress -= 10;
      phoneDies(
        "You open Maps. It finds your route, but your phone does not survive the journey."
      );
    });

  document
    .getElementById("stranger-button")
    .addEventListener("click", function () {
      stress += 5;
      safeChoices += 1;

      showResult(
        "You ask a stranger. It is awkward, but they give you clear directions.",
        showMessageScenario
      );
    });

  document
    .getElementById("pigeon-button")
    .addEventListener("click", function () {
      stress += 15;
      pigeonFriend = true;

      showResult(
        "The pigeon looks confident. You follow it. This is either brilliant or deeply concerning.",
        showMessageScenario
      );
    });
}

/* --------------------------------
   SCENARIO 2: IMPORTANT MESSAGE
-------------------------------- */

function showMessageScenario() {
  time = "8:12 AM";

  introCard.innerHTML = `
    <p class="warning">⚠ BATTERY STILL AT 1% ⚠</p>
    <h1 class="game-title">THE LAST<br>1%</h1>
    ${statsHTML()}

    <section class="scenario">
      <h2>Your phone buzzes.</h2>
      <p>You receive a message:</p>
      <p><strong>“Where are you? Are you still coming?”</strong></p>
      <p>What do you do?</p>
    </section>

    <div class="choices">
      <button id="reply-button">Send a short reply</button>
      <button id="social-button">Open social media first</button>
      <button id="ignore-button">Ignore it and save battery</button>
    </div>

    <p id="result-message" class="tip">
      At 1%, every tap becomes a life decision.
    </p>
  `;

  document
    .getElementById("reply-button")
    .addEventListener("click", function () {
      stress += 4;
      safeChoices += 1;

      showResult(
        "You reply: “I am on my way. My phone is dying.” Clear, responsible, and dramatic.",
        showTransportationScenario
      );
    });

  document
    .getElementById("social-button")
    .addEventListener("click", function () {
      stress -= 10;

      phoneDies(
        "You opened social media for “just one second.” The feed refreshed. Your phone did not."
      );
    });

  document
    .getElementById("ignore-button")
    .addEventListener("click", function () {
      stress += 18;

      showResult(
        "You save battery, but your imagination invents 42 worst-case scenarios.",
        showTransportationScenario
      );
    });
}

/* --------------------------------
   SCENARIO 3: TRANSPORTATION
-------------------------------- */

function showTransportationScenario() {
  time = "8:20 AM";

  introCard.innerHTML = `
    <p class="warning">⚠ STILL RUNNING ON VIBES ⚠</p>
    <h1 class="game-title">THE LAST<br>1%</h1>
    ${statsHTML()}

    <section class="scenario">
      <h2>You need to get across town.</h2>
      <p>Your bus is somewhere nearby, but you do not know exactly when it arrives.</p>
      <p>What do you do?</p>
    </section>

    <div class="choices">
      <button id="check-transit-button">Check the transit app</button>
      <button id="ask-stop-button">Ask someone at the bus stop</button>
      <button id="walk-button">Start walking and hope</button>
    </div>

    <p id="result-message" class="tip">
      Your phone is one app refresh away from retirement.
    </p>
  `;

  document
    .getElementById("check-transit-button")
    .addEventListener("click", function () {
      phoneDies(
        "The transit app loads a beautiful map, three ads, and then your battery reaches 0%."
      );
    });

  document
    .getElementById("ask-stop-button")
    .addEventListener("click", function () {
      stress += 4;
      safeChoices += 1;

      showResult(
        "Someone tells you the bus is arriving in two minutes. Human conversation has saved the day.",
        showFoodScenario
      );
    });

  document
    .getElementById("walk-button")
    .addEventListener("click", function () {
      stress += 15;

      showResult(
        "You begin walking with confidence. You have no proof you are going the right way.",
        showFoodScenario
      );
    });
}

/* --------------------------------
   SCENARIO 4: FOOD / HYDRATION
-------------------------------- */

function showFoodScenario() {
  time = "8:38 AM";

  introCard.innerHTML = `
    <p class="warning">⚠ BODY BATTERY ALSO LOW ⚠</p>
    <h1 class="game-title">THE LAST<br>1%</h1>
    ${statsHTML()}

    <section class="scenario">
      <h2>You are hungry and thirsty.</h2>
      <p>You see a vending machine, a water fountain, and a café with free Wi-Fi.</p>
      <p>What do you do?</p>
    </section>

    <div class="choices">
      <button id="water-button">Drink water and keep moving</button>
      <button id="vending-button">Use your phone to pay at the vending machine</button>
      <button id="wifi-button">Connect to café Wi-Fi</button>
    </div>

    <p id="result-message" class="tip">
      A snack sounds great, but your phone has other plans.
    </p>
  `;

  document
    .getElementById("water-button")
    .addEventListener("click", function () {
      stress -= 5;
      safeChoices += 1;

      showResult(
        "You drink water, regain a little confidence, and avoid spending phone battery.",
        showOverheatingScenario
      );
    });

  document
    .getElementById("vending-button")
    .addEventListener("click", function () {
      phoneDies(
        "Your mobile payment app opens, spins for a moment, and your phone dies before approving the snack."
      );
    });

  document
    .getElementById("wifi-button")
    .addEventListener("click", function () {
      stress += 12;

      showResult(
        "Your phone starts hunting for Wi-Fi networks named ‘DefinitelyNotAVirus.’ You leave before it gets worse.",
        showOverheatingScenario
      );
    });
}

/* --------------------------------
   SCENARIO 5: OVERHEATING
-------------------------------- */

function showOverheatingScenario() {
  time = "8:50 AM";

  introCard.innerHTML = `
    <p class="warning">⚠ PHONE TEMPERATURE RISING ⚠</p>
    <h1 class="game-title">THE LAST<br>1%</h1>
    ${statsHTML()}

    <section class="scenario">
      <h2>Your phone is getting warm.</h2>
      <p>A warning says: “Phone needs to cool down before use.”</p>
      <p>What do you do?</p>
    </section>

    <div class="choices">
      <button id="close-apps-button">Close apps and put it in your pocket</button>
      <button id="freeze-button">Put it near an air conditioner</button>
      <button id="use-video-button">Watch a video while it cools down</button>
    </div>

    <p id="result-message" class="tip">
      Your phone is having a worse morning than you are.
    </p>
  `;

  document
    .getElementById("close-apps-button")
    .addEventListener("click", function () {
      stress += 2;
      safeChoices += 1;

      showResult(
        "You close unnecessary apps and let the phone rest. It is still alive, somehow.",
        showCallScenario
      );
    });

  document
    .getElementById("freeze-button")
    .addEventListener("click", function () {
      stress += 7;

      showResult(
        "The air conditioner helps. You look suspiciously devoted to an air vent, but the phone survives.",
        showCallScenario
      );
    });

  document
    .getElementById("use-video-button")
    .addEventListener("click", function () {
      phoneDies(
        "You try to watch a video while your phone overheats. The screen goes dark. It has given up."
      );
    });
}

/* --------------------------------
   SCENARIO 6: INCOMING CALL
-------------------------------- */

function showCallScenario() {
  time = "9:02 AM";

  introCard.innerHTML = `
    <p class="warning">⚠ INCOMING CALL ⚠</p>
    <h1 class="game-title">THE LAST<br>1%</h1>
    ${statsHTML()}

    <section class="scenario">
      <h2>Your phone starts ringing.</h2>
      <p>The caller ID says: <strong>“Unknown Number.”</strong></p>
      <p>You still need to find a charger.</p>
      <p>What do you do?</p>
    </section>

    <div class="choices">
      <button id="answer-button">Answer the call</button>
      <button id="decline-button">Decline and save battery</button>
      <button id="text-button">Send “Who is this?”</button>
    </div>

    <p id="result-message" class="tip">
      It could be important. It could also be a robot offering car insurance.
    </p>
  `;

  document
    .getElementById("answer-button")
    .addEventListener("click", function () {
      stress += 20;

      showResult(
        "It is a robot offering you an extended vehicle warranty. You hang up emotionally exhausted.",
        showChargerScenario
      );
    });

  document
    .getElementById("decline-button")
    .addEventListener("click", function () {
      safeChoices += 1;

      showResult(
        "You decline the call. If it matters, they can text. If it is spam, you have won.",
        showChargerScenario
      );
    });

  document
    .getElementById("text-button")
    .addEventListener("click", function () {
      phoneDies(
        "You start typing “Who is this?” Autocorrect loads. The phone does not."
      );
    });
}

/* --------------------------------
   SCENARIO 7: FIND A CHARGER
-------------------------------- */

function showChargerScenario() {
  time = "9:10 AM";

  const pigeonHint = pigeonFriend
    ? "<p>A familiar pigeon is watching from a nearby bench.</p>"
    : "";

  introCard.innerHTML = `
    <p class="warning">⚠ FINAL OBJECTIVE: FIND POWER ⚠</p>
    <h1 class="game-title">THE LAST<br>1%</h1>
    ${statsHTML()}

    <section class="scenario">
      <h2>You finally find a café.</h2>
      <p>There is one outlet by the window, but someone is charging a laptop, tablet, headphones, and a tiny desk fan.</p>
      ${pigeonHint}
      <p>What do you do?</p>
    </section>

    <div class="choices">
      <button id="employee-button">Ask an employee for help</button>
      <button id="cable-button">Ask someone to borrow a cable</button>
      <button id="walk-away-button">Keep walking and hope</button>
    </div>

    <p id="result-message" class="tip">
      The outlet glows like a legendary treasure.
    </p>
  `;

  document
    .getElementById("employee-button")
    .addEventListener("click", function () {
      stress += 5;

      showResult(
        pigeonFriend
          ? "The pigeon walks up to the employee. Nobody understands why, but you are given the outlet."
          : "The employee says yes. You find a seat near the outlet and your phone begins charging.",
        showWinScreen
      );
    });

  document
    .getElementById("cable-button")
    .addEventListener("click", function () {
      stress += 8;

      showResult(
        "Someone has a cable, but it only works if you hold it at a mysterious angle. It works anyway.",
        showWinScreen
      );
    });

  document
    .getElementById("walk-away-button")
    .addEventListener("click", function () {
      phoneDies(
        "You keep walking. The battery icon disappears. So does your confidence."
      );
    });
}

/* --------------------------------
   WIN SCREEN
-------------------------------- */

function showWinScreen() {
  let endingTitle = "BATTERY SURVIVOR";
  let endingMessage =
    "You made careful choices, found help, and reached a charger before your phone died.";
  let achievement = "Outlet Hunter";

  if (pigeonFriend) {
    endingTitle = "PIGEON APPROVED";
    endingMessage =
      "You trusted a pigeon, survived the journey, and somehow found a charger. The pigeon watches proudly.";
    achievement = "Certified Bird Follower";
  } else if (safeChoices >= 5) {
    endingTitle = "LOW BATTERY MASTER";
    endingMessage =
      "You stayed calm, avoided unnecessary apps, and made practical choices under pressure.";
    achievement = "Battery Saving Expert";
  }

  introCard.innerHTML = `
    <p class="warning">✓ CHARGER FOUND</p>
    <h1 class="game-title">${endingTitle}</h1>

    <div class="stats">
      <p>🔋 Battery saved: ${battery}%</p>
      <p>😰 Final stress: ${stress}%</p>
      <p>🕗 Time: ${time}</p>
    </div>

    <section class="scenario">
      <h2>Your phone is charging.</h2>
      <p>${endingMessage}</p>
      <p>Real-life tip: when your battery is low, reduce unnecessary phone use and find a safe place to charge.</p>
    </section>

    <button id="restart-button">PLAY AGAIN</button>

    <p class="tip">Achievement unlocked: “${achievement}”</p>
  `;

  document
    .getElementById("restart-button")
    .addEventListener("click", restartGame);
}

/* --------------------------------
   GAME OVER
-------------------------------- */

function gameOver() {
  introCard.innerHTML = `
    <p class="warning">⚠ PHONE HAS DIED ⚠</p>
    <h1 class="game-title">0%</h1>

    <p class="tagline">WELCOME TO THE YEAR 1998.</p>

    <section class="story">
      <p>Your phone is dead.</p>
      <p>You must now communicate using eye contact, memory, and vibes.</p>
      <p>The good news: you are still alive.</p>
    </section>

    <button id="restart-button">TRY AGAIN</button>

    <p class="tip">Achievement unlocked: “Just One More App”</p>
  `;

  document
    .getElementById("restart-button")
    .addEventListener("click", restartGame);
}

/* --------------------------------
   RESTART
-------------------------------- */

function restartGame() {
  battery = 1;
  stress = 20;
  time = "8:03 AM";
  pigeonFriend = false;
  safeChoices = 0;

  location.reload();
}