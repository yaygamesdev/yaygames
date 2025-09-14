// Sidebar toggle
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
sidebar.classList.remove("open");
sidebarToggle.innerHTML = "▶";
sidebarToggle.style.left = "0px";

sidebarToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  sidebarToggle.innerHTML = isOpen ? "◀" : "▶";
  sidebarToggle.style.left = isOpen ? "220px" : "0px";
});

// Featured hero
const featuredGames = ["Roblox", "Bloxd.io", "Clash Royale", "Snake.io", "Gridpunk 3v3", "Vortex 9", "Rooftop Run"];
let currentHeroIndex = 0;

const sectionTitle = document.getElementById("section-title");
const dynamicSection = document.getElementById("dynamic-section");
const heroSection = document.getElementById("hero-section");
const heroDiv = document.getElementById("hero-big");
const heroTitle = document.getElementById("hero-title");
const heroLink = document.getElementById("hero-link");
const navLinks = document.querySelectorAll("nav a");
const topHome = document.getElementById("top-home");
const searchTop = document.getElementById("game-search-top");

// Game list
const games = [
  {name:"Roblox", link:"game-roblox.html", category:"multiplayer sandbox mobile trending", img:"thumbnails/roblox.jpeg", cls:"roblox"},
  {name:"Bloxd.io", link:"game-bloxd.html", category:"io multiplayer trending", img:"thumbnails/bloxd.jpeg", cls:"bloxd"},
  {name:"Clash Royale", link:"game-clashroyale.html", category:"strategy multiplayer mobile top", img:"thumbnails/clashroyale.jpg", cls:"clashroyale"},
  {name:"Snake.io", link:"game-snake.html", category:"io mobile", img:"thumbnails/snakeio.avif", cls:"snakeio"},
  {name:"Brawl Stars", link:"game-brawlstars.html", category:"arcade multiplayer mobile trending", img:"thumbnails/brawlstars.jpeg", cls:"brawlstars"},
  {name:"Bonk.io", link:"game-bonk.html", category:"arcade io multiplayer", img:"thumbnails/bonk.jpeg", cls:"bonk"},
  {name:"Build Royale", link:"game-buildroyale.html", category:"shooting io multiplayer trending", img:"thumbnails/buildroyale.jpeg", cls:"buildroyale"},
  {name:"Diep.io", link:"game-diep.html", category:"io multiplayer", img:"thumbnails/diep.jpeg", cls:"diep"},
  {name:"EvoWorld.io", link:"game-evoworld.html", category:"io trending", img:"thumbnails/evoworld.png", cls:"evoworld"},
  {name:"Fall Guys", link:"game-fallguys.html", category:"io multiplayer trending", img:"thumbnails/fallguys.jpg", cls:"fallguys"},
  {name:"Geometry Lite", link:"game-geometrylite.html", category:"arcade", img:"thumbnails/geometrylite.jpeg", cls:"geometrylite"},
  {name:"Hole.io", link:"game-holeio.html", category:"arcade io multiplayer", img:"thumbnails/holeio.jpeg", cls:"holeio"},
  {name:"Krunker.io", link:"game-krunker.html", category:"shooting io multiplayer top", img:"thumbnails/krunker.jpeg", cls:"krunker"},
  {name:"Paper.io 2", link:"game-paper.html", category:"io multiplayer", img:"thumbnails/paper2.jpeg", cls:"paper2"},
  {name:"Rocket Bot Royale 2", link:"game-rocket.html", category:"shooting io multiplayer top", img:"thumbnails/rocket.jpeg", cls:"rocket"},
  {name:"Shell Shockers", link:"game-shellshockers.html", category:"shooting io multiplayer", img:"thumbnails/shellshockers.jpeg", cls:"shellshockers"},
  {name:"Ships 3D", link:"game-ships3d.html", category:"strategy shooting io multiplayer", img:"thumbnails/ships3d.jpeg", cls:"ships3d"},
  {name:"Sky Riders", link:"game-skyriders.html", category:"racing io", img:"thumbnails/skyriders.jpeg", cls:"skyriders"},
  {name:"Smash Karts", link:"game-smashkarts.html", category:"racing io multiplayer trending", img:"thumbnails/smashkarts.jpeg", cls:"smashkarts"},
  {name:"Starve.io", link:"game-starve.html", category:"survival io multiplayer", img:"thumbnails/starve.jpeg", cls:"starve"},
  {name:"Surviv.io", link:"game-surviv.html", category:"shooting io multiplayer", img:"thumbnails/survev.jpeg", cls:"surviv"},
  {name:"Venge.io", link:"game-venge.html", category:"shooting io multiplayer trending", img:"thumbnails/venge.jpeg", cls:"venge"},
  {name:"Zombs.io", link:"game-zombs.html", category:"strategy io multiplayer top", img:"thumbnails/zombs.jpeg", cls:"zombs"},
  {name:"SimplyUp.io", link:"game-simplyup.html", category:"io arcade trending new", img:"thumbnails/simplyup.avif", cls:"simplyup"},
  {name:"Vortex 9", link:"game-vortex9.html", category:"shooting multiplayer new trending", img:"thumbnails/vortex9.jpeg", cls:"vortex9"},
  {name:"Overtide.io", link:"game-overtide.html", category:"io multiplayer shooting new", img:"thumbnails/overtide.webp", cls:"overtide"},
  {name:"Rooftop Run", link:"game-rooftoprun.html", category:"arcade running trending new", img:"thumbnails/rooftoprun.avif", cls:"rooftop"},
  {name:"Rally Dirt", link:"game-rallyracerdirt.html", category:"racing multiplayer new", img:"thumbnails/rallyracerdirt.jpeg", cls:"rallydirt"},
  {name:"BreakFree", link:"game-breakfree.html", category:"arcade multiplayer new", img:"thumbnails/breakfree.jpeg", cls:"breakfree"},
  {name:"Time Shooter 2", link:"game-timeshooter2.html", category:"shooting multiplayer new", img:"thumbnails/timeshooter2.jpg", cls:"timeshooter2"},
  {name:"Gridpunk 3v3", link:"game-gridpunk3v3.html", category:"arcade racing new", img:"thumbnails/gridpunk3v3.avif", cls:"gridpunk"},
  {name:"Kour.io", link:"game-kourio.html", category:"io multiplayer new", img:"thumbnails/kourio.avif", cls:"kourio"}
];

// Hero Functions
function updateHero(){
  const gameName = featuredGames[currentHeroIndex];
  const game = games.find(g => g.name === gameName);
  heroDiv.classList.add('loading');
  heroDiv.classList.remove("show");
  setTimeout(() => {
    heroDiv.style.background = `url('${game.img}') center/cover no-repeat`;
    heroTitle.textContent = game.name;
    heroLink.href = game.link;
    heroDiv.classList.remove('loading');
    heroDiv.classList.add("show");
  }, 300);
}

function nextHero(){
  currentHeroIndex = (currentHeroIndex + 1) % featuredGames.length;
  updateHero();
}

setInterval(nextHero, 5000);
updateHero();

// Render functions
function renderRow(title, filter, startDelay = 0){
  const filtered = games.filter(g => g.category.includes(filter));
  if(!filtered.length) return "";
  return `<h3 class="row-title">${title}</h3>
  <div class="game-grid">
    ${filtered.map((g,index)=>`
      <a href="${g.link}" class="game-card ${g.cls} animate" style="--delay:${(startDelay + index * 0.1)}s">
        <img src="${g.img}" alt="${g.name}" loading="lazy" onload="this.classList.add('loaded')">
        <div class="gradient-bottom"></div>
        <h3>${g.name}</h3>
      </a>
    `).join("")}
  </div>`;
}

function renderHome(){
  dynamicSection.innerHTML = `
    <h3 class="row-title">🎯 Featured Picks</h3>
    <div class="featured-grid">
      ${["Brawl Stars","Overtide.io","Rally Dirt","Time Shooter 2"].map((name,index)=>{
        const g = games.find(game=>game.name===name);
        if(!g) return "";
        return `<a href="${g.link}" class="game-card ${g.cls} animate" style="--delay:${index*0.15}s">
          <img src="${g.img}" alt="${g.name}" loading="lazy" onload="this.classList.add('loaded')">
          <div class="gradient-bottom"></div>
          <h3>${g.name}</h3>
        </a>`;
      }).join("")}
    </div>
    ${renderRow("🔥 Trending Games","trending",0.8)}
    ${renderRow("🆕 New Games","new",1.2)}
    ${renderRow("👥 Multiplayer Games","multiplayer",1.6)}
  `;
}

renderHome();

// Navigation
navLinks.forEach(link=>{
  link.addEventListener("click",()=>{
    navLinks.forEach(l=>l.classList.remove("active"));
    link.classList.add("active");
    const filter = link.getAttribute("data-filter");
    heroSection.style.display="none";
    sectionTitle.textContent = filter.charAt(0).toUpperCase() + filter.slice(1) + " Games";
    dynamicSection.innerHTML = `<div class="game-grid">
      ${games.filter(g=>g.category.includes(filter) || filter==='all').map((g,index)=>`
        <a href="${g.link}" class="game-card ${g.cls} animate" style="--delay:${index*0.05}s">
          <img src="${g.img}" alt="${g.name}" loading="lazy" onload="this.classList.add('loaded')">
          <div class="gradient-bottom"></div>
          <h3>${g.name}</h3>
        </a>
      `).join("")}
    </div>`;
  });
});

// Home click
topHome.addEventListener("click",()=>{
  navLinks.forEach(l=>l.classList.remove("active"));
  sectionTitle.textContent = "Home";
  heroSection.style.display = "block";
  renderHome();
});

// Search
searchTop.addEventListener("input", e=>{
  const query = e.target.value.toLowerCase();
  dynamicSection.innerHTML = `<div class="game-grid">
    ${games.filter(g=>g.name.toLowerCase().includes(query)).map((g,index)=>`
      <a href="${g.link}" class="game-card ${g.cls} animate" style="--delay:${index*0.05}s">
        <img src="${g.img}" alt="${g.name}" loading="lazy" onload="this.classList.add('loaded')">
        <div class="gradient-bottom"></div>
        <h3>${g.name}</h3>
      </a>
    `).join("")}
  </div>`;
  heroSection.style.display = query ? "none" : "block";
});
