const CACHE_VERSION = "20";
const CACHE = "guide-palworld-v" + CACHE_VERSION;
const FILES = ["./", "./index.html", "./data.json", "./carte-palworld.jpg", "./manifest.json", "./logo-192.png", "./logo-512.png", "./nav-accueil.png", "./nav-guide.png", "./nav-boss.png", "./nav-pals.png", "./nav-carte.png", "./nav-fin.png"].concat(["./ic/e/dark.webp", "./ic/e/dragon.webp", "./ic/e/elec.webp", "./ic/e/fire.webp", "./ic/e/grass.webp", "./ic/e/ground.webp", "./ic/e/ice.webp", "./ic/e/neutral.webp", "./ic/e/water.webp", "./ic/w/Cooling.webp", "./ic/w/Farming.webp", "./ic/w/Gathering.webp", "./ic/w/GenerateElectricity.webp", "./ic/w/Handiwork.webp", "./ic/w/Kindling.webp", "./ic/w/Lumbering.webp", "./ic/w/MedicineProduction.webp", "./ic/w/Mining.webp", "./ic/w/Planting.webp", "./ic/w/Transporting.webp", "./ic/w/Watering.webp", "./ic/egg/dark.webp", "./ic/egg/dragon.webp", "./ic/egg/elec.webp", "./ic/egg/fire.webp", "./ic/egg/grass.webp", "./ic/egg/ground.webp", "./ic/egg/ice.webp", "./ic/egg/mut.webp", "./ic/egg/neutral.webp", "./ic/egg/tree.webp", "./ic/egg/water.webp", "./ic/i/alpha.webp", "./ic/i/bench.webp", "./ic/i/breed.webp", "./ic/i/cake.webp", "./ic/i/cake2.webp", "./ic/i/cake3.webp", "./ic/i/cake4.webp", "./ic/i/cake5.webp", "./ic/i/chromite.webp", "./ic/i/coal.webp", "./ic/i/core.webp", "./ic/i/dungeon.webp", "./ic/i/effigy.webp", "./ic/i/egg.webp", "./ic/i/glider.webp", "./ic/i/hexolite.webp", "./ic/i/holywater.webp", "./ic/i/honey.webp", "./ic/i/incub.webp", "./ic/i/ingot.webp", "./ic/i/leather.webp", "./ic/i/meteor.webp", "./ic/i/milk.webp", "./ic/i/money.webp", "./ic/i/oil.webp", "./ic/i/ore.webp", "./ic/i/palbox.webp", "./ic/i/paldium.webp", "./ic/i/paloxite.webp", "./ic/i/parts.webp", "./ic/i/quartz.webp", "./ic/i/saddle.webp", "./ic/i/soralite.webp", "./ic/i/sphere.webp", "./ic/i/sulfur.webp", "./ic/i/techbook.webp", "./ic/i/tower.webp", "./ic/i/wingpack.webp", "./ic/i/wool.webp", "./ic/i/wtwood.webp"]);

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: "reload"})))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("guide-palworld-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return r; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok && new URL(req.url).pathname.indexOf("/ic/") !== -1) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
