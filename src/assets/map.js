// Meditation Map page: a carousel of places (like the quotes on the start page), continent buttons, a "jump to a place"
// menu, and the map (Leaflet), which is loaded only when the visitor presses "Show the map".
// Without this script the page shows the full list of places.
(function () {
  var ui = document.querySelector(".mapui");
  if (!ui) return;
  var places = JSON.parse(ui.querySelector(".map-data").textContent);
  var tiles = JSON.parse(ui.getAttribute("data-tiles"));
  var bar = ui.querySelector(".cont-bar");
  var jump = ui.querySelector(".place-jump");
  var jumpSel = jump.querySelector("select");
  var panel = ui.querySelector(".map-panel");
  var card = ui.querySelector(".place-card");
  var buttons = ui.querySelectorAll(".cont-btn");
  var items = ui.querySelectorAll("ul.places li");
  var count = ui.querySelector(".map-count");
  var details = ui.querySelector(".all-list");
  var canvas = ui.querySelector(".map-canvas");
  var start = ui.querySelector(".map-start");
  var current = "all", shown = [], idx = 0;
  var map = null, group = null, tileLayer = null, countries = null, markers = {};
  var base = document.querySelector('link[href*="map.css"]').href.replace(/map\.css.*$/, "");
  var englishLabels = tiles.labels === false;   // the tiles have no names; this page writes them in English

  bar.hidden = false; jump.hidden = false; panel.hidden = false; card.hidden = false;
  details.removeAttribute("open");   // the list is folded away when the script runs

  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
  function hasCoords(p) { return p.lat !== null && p.lat !== undefined && p.lat !== ""; }
  function bySlug(s) { for (var i = 0; i < places.length; i++) if (places[i].slug === s) return places[i]; return null; }

  // ----- the card -----
  function render() {
    var p = shown[idx];
    if (!p) { card.innerHTML = ""; return; }
    var h = '<p class="tag">' + esc(p.continent) + '</p><h3>' + esc(p.name) + '</h3>';
    if (p.line) h += '<p class="line">' + esc(p.line) + '</p>';
    if (p.text) h += '<p class="over">' + esc(p.text) + '</p>';
    h += '<p class="pop-btns">';
    if (p.website) h += '<a class="pop-btn" href="' + p.website + '">Visit the website ↗</a>';
    if (p.google) h += '<a class="pop-btn" href="' + p.google + '">Open in Google Maps ↗</a>';
    h += '</p><div class="card-nav"><button type="button" class="pc-btn" data-d="-1">← Previous</button>' +
         '<span class="pc-count">' + (idx + 1) + " / " + shown.length + '</span>' +
         '<button type="button" class="pc-btn" data-d="1">Next →</button></div>';
    card.innerHTML = h;
    jumpSel.value = p.slug;
    if (map) focus(p);
  }

  function setShown(cont, slug) {
    current = cont;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-cont") === cont ? "true" : "false"); });
    shown = places.filter(function (p) { return cont === "all" || p.continent === cont; });
    var n = 0;
    items.forEach(function (li) {
      var on = cont === "all" || li.getAttribute("data-cont") === cont;
      li.hidden = !on;
      if (on) n++;
    });
    count.textContent = "All " + n + (n === 1 ? " place" : " places") + (cont === "all" ? "" : " in " + cont) + " as a list";
    idx = 0;
    if (slug) for (var i = 0; i < shown.length; i++) if (shown[i].slug === slug) idx = i;
    render();
    if (map && !slug) fitAll();
  }

  // ----- the map -----
  function fitAll() {
    var pts = shown.filter(hasCoords).map(function (p) { return [p.lat, p.lng]; });
    if (!pts.length) return;
    if (pts.length === 1) map.setView(pts[0], 6);
    else map.fitBounds(pts, { padding: [40, 40], maxZoom: current === "all" ? 3 : 7 });
  }

  function focus(p) {
    Object.keys(markers).forEach(function (k) { markers[k].getElement && markers[k].getElement() && markers[k].getElement().firstChild.classList.remove("on"); });
    var m = markers[p.slug];
    if (!m) return;
    group.zoomToShowLayer(m, function () {
      m.getElement().firstChild.classList.add("on");
      var ll = m.getLatLng();
      if (!map.getBounds().contains(ll)) map.panTo(ll);
    });
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

  function load(src, done) {
    var s = document.createElement("script");
    s.src = base + "vendor/leaflet/" + src;
    s.onload = done;
    s.onerror = function () { start.querySelector("p").textContent = "The map could not be loaded. The list below has a link for each place."; };
    document.head.appendChild(s);
  }

  function build() {
    ["leaflet.css", "MarkerCluster.css"].forEach(function (f) {
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = base + "vendor/leaflet/" + f;
      document.head.appendChild(css);
    });
    load("leaflet.js", function () { load("leaflet.markercluster.js", init); });
  }

  function init() {
    start.hidden = true;
    canvas.hidden = false;
    map = L.map(canvas, { worldCopyJump: true, minZoom: 2 });
    setTiles();
    new MutationObserver(setTiles).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setTiles);
    group = L.markerClusterGroup({
      showCoverageOnHover: false, maxClusterRadius: 40,
      iconCreateFunction: function (c) { return L.divIcon({ html: "<div>" + c.getChildCount() + "</div>", className: "cl", iconSize: [34, 34] }); }
    });
    places.forEach(function (p) {
      if (!hasCoords(p)) return;
      var m = L.marker([p.lat, p.lng], {
        icon: L.divIcon({ className: "", html: '<div class="pin"></div>', iconSize: [18, 18] }),
        title: p.name, keyboard: true
      });
      m.on("click", function () {
        var q = shown.indexOf(p);
        if (q < 0) { setShown("all", p.slug); } else { idx = q; render(); }
      });
      markers[p.slug] = m;
      group.addLayer(m);
    });
    map.addLayer(group);
    if (englishLabels) addCountries();
    fitAll();
    render();
  }

  // ----- controls -----
  buttons.forEach(function (b) { b.addEventListener("click", function () { setShown(b.getAttribute("data-cont")); }); });
  card.addEventListener("click", function (e) {
    var b = e.target.closest(".pc-btn");
    if (!b || !shown.length) return;
    idx = (idx + Number(b.getAttribute("data-d")) + shown.length) % shown.length;
    render();
  });
  jumpSel.addEventListener("change", function () {
    var p = bySlug(jumpSel.value);
    if (p) setShown(p.continent, p.slug);
  });
  ui.querySelector(".map-show").addEventListener("click", build);

  // A link like /resources/map/#amaravati-buddhist-monastery opens that place.
  var want = decodeURIComponent((location.hash || "").slice(1));
  var first = want && bySlug(want);
  setShown(first ? first.continent : "all", first ? first.slug : null);
})();
