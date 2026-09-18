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
    setupScrollHintAutoHide();
    addRandomPhotoTags();
  }, 600);
}

// ═══ Le message "Descendre en bas" disparaît dès qu'on voit le titre ═══
function setupScrollHintAutoHide() {
  const prompt = document.querySelector(".page-top-prompt");
  const target = document.querySelector(".main-header");
  if (!prompt || !target || !("IntersectionObserver" in window)) return;

  const minVisibleTime = 1200;
  const shownAt = Date.now();
  let hidden = false;

  const hidePrompt = () => {
    if (hidden) return;
    hidden = true;
    prompt.classList.add("is-hidden");
    observer.disconnect();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const remaining = minVisibleTime - (Date.now() - shownAt);
      if (remaining > 0) {
        setTimeout(hidePrompt, remaining);
      } else {
        hidePrompt();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(target);
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

const WHATSAPP_IMAGES = [
  "images/WhatsApp Image 2026-09-18 at 19.51.59 (1).jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.51.59.jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.00 (1).jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.00.jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.01 (1).jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.01.jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.02 (1).jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.02.jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.03 (1).jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.03.jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.04.jpeg",
  "images/WhatsApp Image 2026-09-18 at 19.52.05.jpeg"
];

// Place les vignettes WhatsApp dans les marges réelles autour du contenu
// (mesurées en direct), pour qu'elles restent toujours visibles au premier
// plan sans jamais toucher le texte ni se toucher entre elles.
function addRandomPhotoTags() {
  const layer = document.getElementById("photo-floating-layer");
  const poemCard = document.querySelector(".poem-card");
  const header = document.querySelector(".main-header");
  const footer = document.querySelector(".main-footer");
  if (!layer || !poemCard || !header || !footer) return;

  const layerRect = layer.getBoundingClientRect();
  if (layerRect.width === 0 || layerRect.height === 0) return;

  const contentRect = poemCard.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  const footerRect = footer.getBoundingClientRect();

  const gutterLeft = contentRect.left - layerRect.left;
  const gutterRight = layerRect.right - contentRect.right;
  const gutter = Math.min(gutterLeft, gutterRight);

  const MIN_GUTTER = 44;
  const margin = 24;
  const startY = headerRect.bottom - layerRect.top + margin;
  const endY = footerRect.top - layerRect.top - margin;
  const usableHeight = endY - startY;

  layer.innerHTML = "";

  if (gutter < MIN_GUTTER || usableHeight < 200) {
    layer.style.display = "none";
    return;
  }
  layer.style.display = "block";

  const tagWidth = Math.max(32, Math.min(96, gutter - 14));
  const tagHeight = Math.round(tagWidth * 0.64);
  const edgeOffset = 8;
  const slotCount = 12;
  const order = [...Array(slotCount).keys()].sort(() => Math.random() - 0.5);

  for (let i = 0; i < slotCount; i++) {
    const frac = i / (slotCount - 1);
    const side = i % 2 === 0 ? "left" : "right";
    const angle = (side === "left" ? -1 : 1) * (8 + (i % 3) * 2) + "deg";

    const tag = document.createElement("div");
    tag.className = "photo-tag";
    tag.style.width = tagWidth + "px";
    tag.style.top = Math.round(startY + frac * usableHeight) + "px";
    tag.style[side] = edgeOffset + "px";
    tag.style.setProperty("--angle", angle);

    const mini = document.createElement("div");
    mini.className = "photo-mini";
    mini.style.height = tagHeight + "px";
    mini.style.backgroundImage = `url('${WHATSAPP_IMAGES[order[i] % WHATSAPP_IMAGES.length]}')`;

    tag.appendChild(mini);
    layer.appendChild(tag);
  }
}

window.addEventListener("resize", () => {
  addRandomPhotoTags();
});
