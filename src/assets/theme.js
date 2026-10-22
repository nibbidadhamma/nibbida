// Light / Dark button. The theme follows the device by default; a choice made with the
// button is remembered in this browser. Without this script the device setting still applies.
(function () {
  var root = document.documentElement;
  var query = window.matchMedia("(prefers-color-scheme: light)");
  function current() {
    return root.getAttribute("data-theme") || (query.matches ? "light" : "dark");
  }
  function refresh() {
    var next = current() === "light" ? "dark" : "light";
    document.querySelectorAll(".theme-btn").forEach(function (b) {
      b.hidden = false;
      b.textContent = next === "light" ? "Light" : "Dark";
      b.setAttribute("aria-label", "Switch to " + next + " theme");
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".theme-btn");
    if (!b) return;
    var next = current() === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("nibbida-theme", next);
    } catch (err) {}
    refresh();
  });
  if (query.addEventListener) query.addEventListener("change", refresh);
  refresh();
})();
