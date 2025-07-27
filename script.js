const zapDamage = [0, 150, 180, 210, 240, 270, 320, 400, 480, 560, 600, 640, 680];
const quakeDamage = [0, 0.145, 0.17, 0.21, 0.25, 0.29];
const targetHP = {
  air_defense: [0, 800, 850, 900, 950, 1000, 1050, 1100, 1210, 1300, 1400, 1500, 1650, 1750, 1850, 1950],
  inferno: [0, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3700, 4000, 4400],
  xbow: [0, 1500, 1900, 2300, 2700, 3100, 3400, 3700, 4000, 4200, 4400, 4600, 4800],
  Canon: [0, 300, 360, 420, 500, 600, 660, 730, 800, 880, 960, 1060, 1160, 1260, 1380, 1500, 1620, 1740, 1870, 2000, 2150, 2250],
  Mortar: [0, 400, 450, 500, 550, 600, 650, 700, 800, 950, 1100, 1300, 1500, 1700, 1950, 2150, 2300, 2450],
  Wizard: [0, 620, 650, 680, 730, 840, 960, 1200, 1440, 1600, 1900, 2120, 2240, 2500, 2800, 3000, 3150, 3300],
  Monolit: [0, 4747, 5050, 5353, 5656],
  Multi_archer: [0, 5000, 5200, 5400],
  Canon_ganda: [0, 5400, 5700, 6000],
  Spell_tower: [0, 2500, 2800, 3100],
  Hook_tower: [0, 100, 500, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
  Api_area: [0, 600, 1200, 1800, 2400, 3000, 3600, 4200, 4800, 5400, 6000],
Batako: [0, 400, 900, 1400, 1900, 2400, 2900, 3400, 3900, 4400, 4900],
  Sweper: [0, 750, 800, 850, 900, 950, 1000, 1050],
  Eagle: [0, 4000, 4400, 4800, 5200, 5600, 5900, 6200],
  Ketapel: [0, 3600, 4200, 4800, 5100, 5410, 5600],
  Builder: [0, 250, 1000, 1300, 1600, 1800, 1900, 2000],
  Archer_tower: [0, 380, 420, 460, 500, 540, 580, 630, 690, 750, 810, 890, 970, 1050, 1130, 1230, 1310, 1390, 1510, 1600, 1700, 1800],
  tesla: [0, 600, 630, 660, 690, 730, 770, 810, 850, 900, 980, 1100, 1200, 1350, 1450, 1550, 1650],
  fire_spriter: [0, 4500, 5000],
  bom_tower: [0, 650, 700, 750, 850, 1050, 
  1300, 1600, 1900, 2300, 2500, 2700, 2900],
  pilihan_GandaCanon: [0, 4000, 4200],
  pilihan_GandaArcher: [0, 4000, 4200],
  bost_xbow: [0, 4800, 4900],
  bost_builder: [0, 2000, 2050],
  bost_BomTower: [0, 2900, 3000],
  bost_mortar: [0, 2450, 2525],
  bost_inferno: [0, 4800, 5000],
  bost_tesla: [0, 1650, 1700],
  bost_CanonGanda: [0, 6000, 6150],
  bost_MultiArcher: [0, 5400, 5500],
  bost_FireSpriter: [0, 5000, 5250],
  bost_pilihan_GandaCanon: [0, 4200, 4350],
  bost_pilihan_GandaArcher: [0, 4200, 4350],
  bost_wizard: [0, 3300, 3375]
};
function updateBuildingLevels() {
  const target = document.getElementById("target").value;
  const buildingLevelSelect = document.getElementById("building-level");
  buildingLevelSelect.innerHTML = "";
  const buildingArray = targetHP[target];
  if (!buildingArray) return;
  for (let i = 1; i < buildingArray.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = "Level " + i;
    buildingLevelSelect.appendChild(option);
  }
}

let gunakanGempa = true; 

function toggleGunakanGempa() {
  gunakanGempa = !gunakanGempa;
  const tombol = document.getElementById("toggleGempa");
  tombol.textContent = gunakanGempa ? "Menggunakan Gempa" : "Tanpa Gempa";
}

function hitungZapQuake(pakaiGempa) {
  const zapLevel = parseInt(document.getElementById("zap-level").value);
  const quakeLevel = parseInt(document.getElementById("quake-level").value);
  const target = document.getElementById("target").value;
  const buildingLevel = parseInt(document.getElementById("building-level").value);

  const safeZapLevel = Math.min(zapLevel, zapDamage.length - 1);
  const safeQuakeLevel = Math.min(quakeLevel, quakeDamage.length - 1);
  const buildingArray = targetHP[target];

  if (!buildingArray) {
    document.getElementById("hasil").innerHTML = "Target tidak ditemukan.";
    return;
  }

  const safeBuildingLevel = Math.min(buildingLevel, buildingArray.length - 1);
  const zapDmg = zapDamage[safeZapLevel];
  const gempaDmg = quakeDamage[safeQuakeLevel];
  const hp = buildingArray[safeBuildingLevel];

  let damageGempa = 0;
  let sisaHP = hp;

  if (pakaiGempa) {
    damageGempa = Math.floor(hp * gempaDmg);
    sisaHP = hp - damageGempa;
  }

  const jumlahZap = Math.ceil(sisaHP / zapDmg);
  const totalZapDamage = zapDmg * jumlahZap;
  const totalDamage = damageGempa + totalZapDamage;

  document.getElementById("hasil").innerHTML =
    `
    ${pakaiGempa ? `
    <b>Damage spell Gempa (level ${quakeLevel}): ${(gempaDmg * 100).toFixed(1)}% dari HP bangunan</b><br>
    Damage 1 Gempa: ${damageGempa}<br><br>` : ``}

    <b>Damage spell Zap (level ${zapLevel}):</b><br>
    ${zapDmg} × ${jumlahZap} zap = ${totalZapDamage}<br><br>

    <b>Total Damage</b>: ${totalDamage}<br><br>

    Butuh <span class="a4">${jumlahZap}</span> spell Lightning
    ${pakaiGempa ? `dan <span class="a5">1</span> spell Gempa` : ``}
    untuk menghancurkan ${target.replace('_', ' ')}.
    <br><br>
    <button id="tutup-button">Tutup</button>
    `;

  document.getElementById("tutup-button").addEventListener("click", function () {
    document.getElementById("hasil").innerHTML = "";
  });
}
  updateBuildingLevels();
  document.getElementById("target").addEventListener("change", updateBuildingLevels);
  

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js') 
      .then(reg => console.log('✅ Service Worker registered', reg))
      .catch(err => console.error('❌ Service Worker registration failed', err));
  });
}


let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener('load', () => {

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) {
    installBtn.style.display = 'none';
  }


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ Service Worker registered', reg))
      .catch(err => console.error('❌ Service Worker registration failed', err));
  }
});


window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  if (deferredPrompt) return;

  deferredPrompt = e;

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) return;

  installBtn.style.display = 'block';

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted the install prompt');
      } else {
        console.log('❌ User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }, { once: true });
});