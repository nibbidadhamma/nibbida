// "A passage to sit with" on the start page: shows one passage at a time with Previous / Next.
// Without this script all passages are listed one after the other.
(function () {
  var box = document.querySelector(".reading");
  if (!box) return;
  var items = box.querySelectorAll(".passage");
  var buttons = box.querySelectorAll(".passage-btn");
  var count = box.querySelector(".passage-count");
  if (items.length < 2) return;
  var now = 0;
  box.classList.add("js-rot");
  function show(i) {
    now = (i + items.length) % items.length;
    items.forEach(function (el, n) { el.classList.toggle("on", n === now); });
    if (count) count.textContent = (now + 1) + " / " + items.length;
  }
  buttons.forEach(function (b) {
    b.hidden = false;
    b.addEventListener("click", function () { show(now + Number(b.getAttribute("data-dir"))); });
  });
  show(0);
})();
