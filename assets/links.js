// Search box for the Links page. Without this script all links are shown and the box is hidden.
(function () {
  var box = document.getElementById("link-search");
  if (!box) return;
  var cards = [].slice.call(document.querySelectorAll(".link-card"));
  var groups = [].slice.call(document.querySelectorAll(".link-group"));
  var subs = [].slice.call(document.querySelectorAll(".link-sub"));
  var count = document.getElementById("link-count");
  var none = document.getElementById("link-none");
  function norm(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  var text = cards.map(function (c) {
    return norm(c.textContent);
  });
  function apply() {
    var words = norm(box.value).split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c, i) {
      var ok = words.every(function (w) {
        return text[i].indexOf(w) > -1;
      });
      c.hidden = !ok;
      if (ok) shown++;
    });
    subs.forEach(function (s) {
      s.hidden = !s.querySelector(".link-card:not([hidden])");
    });
    groups.forEach(function (g) {
      g.hidden = !g.querySelector(".link-card:not([hidden])");
    });
    count.textContent = words.length ? shown + " of " + cards.length + " links" : cards.length + " links";
    none.hidden = shown !== 0;
  }
  document.querySelector(".link-tools").classList.add("on");
  box.addEventListener("input", apply);
  apply();
})();
