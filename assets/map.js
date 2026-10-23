// Meditation Map page: continent buttons, and the map (Leaflet), which is loaded only when the visitor presses "Show the map".
// Without this script the page still shows the full list of places.
(function () {
  var ui = document.querySelector(".mapui");
  if (!ui) return;
  var places = JSON.parse(ui.querySelector(".map-data").textContent);
  var tiles = JSON.parse(ui.getAttribute("data-tiles"));
  var bar = ui.querySelector(".cont-bar");
  var panel = ui.querySelector(".map-panel");
  var buttons = ui.querySelectorAll(".cont-btn");
  var items = ui.querySelectorAll("ul.places li");
  var count = ui.querySelector(".map-count");
  var canvas = ui.querySelector(".map-canvas");
  var start = ui.querySelector(".map-start");
  var current = "all", map = null, markers = [];
  var base = document.querySelector('link[href*="map.css"]').href.replace(/map\.css.*$/, "");

  bar.hidden = false;
  panel.hidden = false;

  function select(cont) {
    current = cont;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-cont") === cont ? "true" : "false"); });
    var n = 0;
    items.forEach(function (li) {
      var show = cont === "all" || li.getAttribute("data-cont") === cont;
      li.hidden = !show;
      if (show) n++;
    });
    count.textContent = n + (n === 1 ? " place" : " places") + (cont === "all" ? "" : " in " + cont);
    if (map) fit();
  }

  function fit() {
    var pts = places.filter(function (p) { return p.lat !== null && p.lat !== undefined && p.lat !== "" && (current === "all" || p.continent === current); })
      .map(function (p) { return [p.lat, p.lng]; });
    if (!pts.length) return;
    if (pts.length === 1) map.setView(pts[0], 6);
    else map.fitBounds(pts, { padding: [40, 40], maxZoom: current === "all" ? 3 : 7 });
  }

  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }

  function build() {
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = base + "vendor/leaflet/leaflet.css";
    document.head.appendChild(css);
    var js = document.createElement("script");
    js.src = base + "vendor/leaflet/leaflet.js";
    js.onload = init;
    js.onerror = function () { start.querySelector("p").textContent = "The map could not be loaded. The list below has a link for each place."; };
    document.head.appendChild(js);
  }

  function init() {
    start.hidden = true;
    canvas.hidden = false;
    map = L.map(canvas, { worldCopyJump: true, minZoom: 2 });
    L.tileLayer(tiles.url, { attribution: tiles.attribution, maxZoom: tiles.max_zoom || 18 }).addTo(map);
    if (!tiles.dark_url) canvas.classList.add("tiles-filter");
    places.forEach(function (p) {
      if (p.lat === null || p.lat === undefined || p.lat === "") return;
      var m = L.marker([p.lat, p.lng], {
        icon: L.divIcon({ className: "", html: '<div class="pin"></div>', iconSize: [18, 18] }),
        title: p.name, keyboard: true
      }).addTo(map);
      m.bindPopup('<p class="tag">' + esc(p.region) + "</p><b>" + esc(p.name) + '</b><a href="' + p.url + '">Open in Google Maps ↗</a>', { closeButton: false });
      markers.push(m);
    });
    fit();
  }

  buttons.forEach(function (b) { b.addEventListener("click", function () { select(b.getAttribute("data-cont")); }); });
  ui.querySelector(".map-show").addEventListener("click", build);
  select("all");
})();
