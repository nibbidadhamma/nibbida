// Closes the menus after a link is chosen, a click outside, or Escape.
// The menus open and close without this script; it is only a convenience.
document.addEventListener("click", function (e) {
  document.querySelectorAll("details.menu[open], details.drop[open]").forEach(function (d) {
    if (!d.contains(e.target) || e.target.closest("a")) d.open = false;
  });
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll("details[open]").forEach(function (d) {
      d.open = false;
    });
  }
});
