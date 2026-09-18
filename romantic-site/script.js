// ═══ Écran de bienvenue : les DEUX boutons disent OUI ═══
const welcome = document.getElementById("welcome");
const main = document.getElementById("main");

// Bouton 1 : entrée classique
document.getElementById("btnYes1").addEventListener("click", () => {
  enterSite("Très bon choix ! 💗");
});

// Bouton 2 : entrée "en mieux" avec un petit clin d'œil
document.getElementById("btnYes2").addEventListener("click", (e) => {
  const btn = e.currentTarget;
  const funnyMessages = [
    "Excellente décision ! 😌",
    "On t'avait dit qu'il n'y avait pas d'autre option 😏",
    "Tu vois, c'était sans choix ! 💕",
    "Le bouton 1 était jaloux… 💗",
    "Charisme +1000 ✨"
  ];
  const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  btn.textContent = msg;
  setTimeout(() => enterSite(msg), 900);
});

function enterSite(message) {
  console.log(message);
  welcome.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  welcome.style.opacity = "0";
  welcome.style.transform = "scale(1.05)";
  setTimeout(() => {
    welcome.classList.add("hidden");
    main.classList.remove("hidden");
    launchHearts();
  }, 600);
}

// ═══ Pluie de cœurs romantique ═══
function launchHearts() {
  const container = document.getElementById("hearts-container");
  const hearts = ["💕", "💖", "💗", "💓", "💘", "🌸", "✨", "💝"];
  spawnHeart();
  const interval = setInterval(spawnHeart, 900);

  function spawnHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 0.9 + Math.random() * 1.6 + "rem";
    const duration = 6 + Math.random() * 6;
    heart.style.animationDuration = duration + "s";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }
}
