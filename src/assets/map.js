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
  var current = "all", map = null, pins = [], tileLayer = null, countries = null;
  var base = document.querySelector('link[href*="map.css"]').href.replace(/map\.css.*$/, "");
  var englishLabels = tiles.labels === false;   // the tiles have no names; this page writes them in English

  bar.hidden = false;
  panel.hidden = false;

  function hasCoords(p) { return p.lat !== null && p.lat !== undefined && p.lat !== ""; }

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
    if (map) { fit(); labels(); }
  }

  function fit() {
    var pts = places.filter(function (p) { return hasCoords(p) && (current === "all" || p.continent === current); })
      .map(function (p) { return [p.lat, p.lng]; });
    if (!pts.length) return;
    if (pts.length === 1) map.setView(pts[0], 6);
    else map.fitBounds(pts, { padding: [40, 40], maxZoom: current === "all" ? 3 : 7 });
  }

  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }

  // The names of the places are written next to the pins when one continent is shown and the map is zoomed in.
  function labels() {
    var show = current !== "all" && map.getZoom() >= 4;
    canvas.classList.toggle("hide-labels", !show);
  }

  function isDark() {
    var t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function setTiles() {
    var url = isDark() && tiles.dark_url ? tiles.dark_url : tiles.url;
    if (tileLayer) map.removeLayer(tileLayer);
    tileLayer = L.tileLayer(url, { attribution: tiles.attribution, maxZoom: tiles.max_zoom || 18 }).addTo(map);
    tileLayer.bringToBack();
  }

  // English names of countries, for maps whose tiles have no labels.
  function addCountries() {
    fetch(base + "countries-en.json").then(function (r) { return r.json(); }).then(function (list) {
      countries = L.layerGroup();
      list.forEach(function (c) {
        L.marker([c[1], c[2]], {
          icon: L.divIcon({ className: "ctry", html: "<span>" + esc(c[0]) + "</span>", iconSize: [0, 0] }),
          interactive: false, keyboard: false
        }).addTo(countries);
      });
      var update = function () {
        var z = map.getZoom();
        if (z >= 3 && z <= 6) { if (!map.hasLayer(countries)) countries.addTo(map); }
        else if (map.hasLayer(countries)) map.removeLayer(countries);
      };
      map.on("zoomend", update);
      update();
    });
  }

  function popup(p) {
    var h = '<p class="tag">' + esc(p.region) + "</p><b>" + esc(p.name) + '</b><span class="pop-btns">';
    if (p.website) h += '<a class="pop-btn" href="' + p.website + '">Visit the website ↗</a>';
    h += '<a class="pop-btn" href="' + p.url + '">Open in Google Maps ↗</a></span>';
    return h;
  }

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
    setTiles();
    if (!tiles.dark_url) canvas.classList.add("tiles-filter");
    new MutationObserver(setTiles).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setTiles);
    places.forEach(function (p, i) {
      if (!hasCoords(p)) return;
      var m = L.marker([p.lat, p.lng], {
        icon: L.divIcon({ className: "", html: '<div class="pin"></div>', iconSize: [18, 18] }),
        title: p.name, keyboard: true
      }).addTo(map);
      m.bindTooltip(esc(p.name), { permanent: true, direction: i % 2 ? "left" : "right", offset: [i % 2 ? -10 : 10, 0], className: "pin-label" });
      m.bindPopup(popup(p), { closeButton: false, maxWidth: 230, autoPanPadding: [20, 20] });
      pins.push(m);
    });
    if (englishLabels) addCountries();
    map.on("zoomend", labels);
    fit();
    labels();
  }

  buttons.forEach(function (b) { b.addEventListener("click", function () { select(b.getAttribute("data-cont")); }); });
  ui.querySelector(".map-show").addEventListener("click", build);
  select("all");
})();
