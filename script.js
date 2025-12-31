// Scroll animation for every section
const elements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// Floating hearts generator
const heartsContainer = document.querySelector('.hearts');

setInterval(() => {
  const heart = document.createElement('div');
  heart.innerText = '💖';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.bottom = '-20px';
  heart.style.fontSize = Math.random() * 20 + 15 + 'px';
  heart.style.animation = 'float 6s linear forwards';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}, 500);

// Cute popup when she reaches the end
const popup = document.getElementById('lovePopup');
let popupShown = false;

window.addEventListener('scroll', () => {
  if (
    !popupShown &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
  ) {
    popup.classList.add('show');
    popupShown = true;
  }
});

function closePopup() {
  popup.classList.remove('show');
}

// Yes/No Game Logic
const gameQuestions = [
  "Agar mai choice du… kya tum mujhe phir se choose krogi? 💗",
  "Jab maine tumhe pehli baar kiss kiya tha… tumhe acha laga tha? 💋",
  "Jab mai tumhe hug karta hoon… kya tumhe safe feel hota hai? 🫶",
  "Jab mai tumpe haq jataata hoon toh achha lagta hai? 😌",
  "Kya tumhe kabhi apna decision regret hua… mujhe choose karne ka?"
];

let qIndex = 0;
let gameStarted = false;

const questionEl = document.getElementById("game-question");
const noText = document.getElementById("no-text");
const questionOverlay = document.getElementById("questionOverlay");
const fullscreenQuestion = document.getElementById("fullscreen-question");
const noTextFullscreen = document.getElementById("no-text-fullscreen");

function yesClick() {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const container = document.getElementById("effect-container");

  const heart = document.createElement("div");
  heart.className = "yes-effect";
  heart.textContent = "💗";

  const kiss = document.createElement("div");
  kiss.className = "kiss";
  kiss.textContent = "😘";

  heart.appendChild(kiss);
  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 3000);

  // teasing text
  noText.innerHTML = "Arey jao na 😌<br>NO pe click kro";
  noText.style.display = "block";

  if (!gameStarted) {
    // First YES click - show fullscreen overlay
    gameStarted = true;
    questionOverlay.classList.add("show");
    fullscreenQuestion.innerText = gameQuestions[0];
    qIndex = 0;
    
    // Reset button text to default
    const buttons = document.querySelectorAll(".game-buttons-fullscreen button");
    buttons[0].innerText = "YES";
    buttons[1].innerText = "NO";
  }
  
  return false;
}

function yesClickFullscreen() {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  noTextFullscreen.style.display = "none";

  // Check if it's the last question
  const isLastQuestion = qIndex === gameQuestions.length - 1;
  
  // Show YES effect (heart + kiss)
  const container = document.getElementById("effect-container");
  
  const heart = document.createElement("div");
  heart.className = "yes-effect";
  heart.innerText = "💗";

  const kiss = document.createElement("div");
  kiss.className = "kiss";
  kiss.innerText = "😘";

  heart.appendChild(kiss);
  container.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);

  // Multiple BIG floating hearts
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const floatHeart = document.createElement("div");
      floatHeart.className = "heart-float";
      floatHeart.innerText = "💗";
      // Random positions across the screen
      floatHeart.style.left = (Math.random() * 80 + 10) + "%";
      floatHeart.style.top = (Math.random() * 80 + 10) + "%";
      // Random sizes between 250px and 400px
      floatHeart.style.fontSize = (Math.random() * 150 + 250) + "px";
      container.appendChild(floatHeart);
      setTimeout(() => floatHeart.remove(), 2000);
    }, i * 150);
  }

  // Fade out animation
  fullscreenQuestion.style.opacity = "0";
  fullscreenQuestion.style.transform = "scale(0.9)";
  
  setTimeout(() => {
    qIndex++;

    if (qIndex < gameQuestions.length) {
      fullscreenQuestion.innerText = gameQuestions[qIndex];
      
      // Update button text for last question
      if (qIndex === gameQuestions.length - 1) {
        const buttons = document.querySelectorAll(".game-buttons-fullscreen button");
        buttons[0].innerText = "NO CHANCE";
        buttons[1].innerText = "NO";
      } else {
        // Reset button text for other questions
        const buttons = document.querySelectorAll(".game-buttons-fullscreen button");
        buttons[0].innerText = "YES";
        buttons[1].innerText = "NO";
      }
    } else {
      fullscreenQuestion.innerText = "Hehe 😌 mujhe pta tha 💗";
      document.querySelector(".game-buttons-fullscreen").style.display = "none";
      
      // Fade in animation first
      fullscreenQuestion.style.transition = "0.5s ease";
      fullscreenQuestion.style.opacity = "1";
      fullscreenQuestion.style.transform = "scale(1)";
      
      // Wait for click to proceed to game-end screen (after fade in completes)
      setTimeout(() => {
        const proceedToGameEnd = function() {
          questionOverlay.classList.remove("show");
          // Show game end screen first
          const gameEnd = document.getElementById("game-end");
          gameEnd.classList.add("show");
          
          // Add floating hearts to game end screen
          const container = document.getElementById("effect-container");
          for (let i = 0; i < 10; i++) {
            setTimeout(() => {
              const floatHeart = document.createElement("div");
              floatHeart.className = "heart-float";
              floatHeart.innerText = "💗";
              floatHeart.style.left = (Math.random() * 80 + 10) + "%";
              floatHeart.style.top = (Math.random() * 80 + 10) + "%";
              floatHeart.style.fontSize = (Math.random() * 150 + 200) + "px";
              container.appendChild(floatHeart);
              setTimeout(() => floatHeart.remove(), 3000);
            }, i * 200);
          }
          
          // Add click handler to game end screen to proceed to final love screen
          const proceedToFinal = function() {
            gameEnd.classList.remove("show");
            const finalLove = document.getElementById("final-love");
            finalLove.classList.add("show");
          };
          
          gameEnd.addEventListener('click', proceedToFinal, { once: true });
        };
        
        // Add click handler to proceed when user clicks anywhere on the overlay
        questionOverlay.addEventListener('click', proceedToGameEnd, { once: true });
      }, 500); // Wait for fade in to complete
      return; // Exit early to prevent the fade in code below from running
    }
    
    // Fade in animation
    fullscreenQuestion.style.transition = "0.5s ease";
    fullscreenQuestion.style.opacity = "1";
    fullscreenQuestion.style.transform = "scale(1)";
  }, 200);
}

function noClick() {
  event.preventDefault();
  event.stopPropagation();
  
  noText.style.display = "block";
  
  // Show NO effect (angry face)
  const container = document.getElementById("effect-container");
  
  const angry = document.createElement("div");
  angry.className = "no-effect";
  angry.innerText = "😠";

  container.appendChild(angry);

  setTimeout(() => angry.remove(), 3000);

  // Red background flash
  document.body.classList.add("red-flash");
  setTimeout(() => {
    document.body.classList.remove("red-flash");
  }, 500);

  // Body shake effect
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 500);
  
  return false;
}

function noClickFullscreen() {
  event.preventDefault();
  event.stopPropagation();
  
  // Check if it's the last question
  const isLastQuestion = qIndex === gameQuestions.length - 1;
  
  if (isLastQuestion) {
    // For last question, NO is the wrong answer - show negative effects
    noTextFullscreen.style.display = "block";
    noTextFullscreen.innerHTML = "Nhi mai ni manta 😤 <br>chlo NO CHANCE pe click kro";

    // Show NO effect (angry face)
    const container = document.getElementById("effect-container");
    
    const angry = document.createElement("div");
    angry.className = "no-effect";
    angry.innerText = "😠";

    container.appendChild(angry);

    setTimeout(() => angry.remove(), 3000);

    // Red background flash
    document.body.classList.add("red-flash");
    setTimeout(() => {
      document.body.classList.remove("red-flash");
    }, 500);

    // Body shake effect
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 500);
  } else {
    // For other questions, normal NO behavior
    noTextFullscreen.style.display = "block";

    // Show NO effect (angry face)
    const container = document.getElementById("effect-container");
    
    const angry = document.createElement("div");
    angry.className = "no-effect";
    angry.innerText = "😠";

    container.appendChild(angry);

    setTimeout(() => angry.remove(), 3000);

    // Red background flash
    document.body.classList.add("red-flash");
    setTimeout(() => {
      document.body.classList.remove("red-flash");
    }, 500);

    // Body shake effect
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 500);
  }
  
  return false;
}

// Choice Section Functions
function loveYes() {
  // Show the game section
  const gameSection = document.getElementById("gameSection");
  if (gameSection) {
    gameSection.style.display = "block";
    // Scroll to game section smoothly
    setTimeout(() => {
      gameSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
  
  // Reset game state
  qIndex = 0;
  gameStarted = false; // Reset so they can click YES on "Ready?"
  
  // Reset the game question to "Ready?"
  const questionEl = document.getElementById("game-question");
  if (questionEl) {
    questionEl.innerText = "Ready? 💗";
  }
  
  // Reset no text
  const noText = document.getElementById("no-text");
  if (noText) {
    noText.style.display = "none";
  }
  
  // Hide choice buttons after selection
  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";
  });
}

function loveNo() {
  const choiceText = document.getElementById("choice-text");
  choiceText.innerText = "Nhi mai ni manta 😤 chlo YES pe click kro";
  choiceText.style.animation = "shake 0.4s ease";
  
  // Keep buttons visible so they can click YES
  setTimeout(() => {
    choiceText.innerText = "";
  }, 3000);
}
