// Search box and folder buttons for the archive shelf.
// Without this script the page shows every book and the controls stay hidden.
(function () {
  var ctl = document.querySelector(".ctl");
  var shelf = document.getElementById("shelf");
  if (!ctl || !shelf) return;
  ctl.hidden = false;
  var books = [].slice.call(shelf.querySelectorAll(".bk"));
  var input = ctl.querySelector("input");
  var chips = [].slice.call(ctl.querySelectorAll(".chip"));
  var count = ctl.querySelector(".count");
  var none = document.querySelector(".none");
  var pressed = ctl.querySelector('.chip[aria-pressed="true"]');
  var folder = pressed ? pressed.getAttribute("data-folder") : "all";
  function norm(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function apply() {
    var words = norm(input.value).split(/\s+/).filter(Boolean);
    var shown = 0;
    books.forEach(function (b) {
      // A search looks through all books, also when "Recommended" is selected.
      var inFolder =
        folder === "all" ||
        (folder === "recommended" ? words.length > 0 || b.getAttribute("data-rec") === "1" : b.getAttribute("data-folder") === folder);
      var ok =
        inFolder &&
        words.every(function (w) {
          return b.getAttribute("data-search").indexOf(w) > -1;
        });
      b.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = shown === books.length ? books.length + " books" : shown + " of " + books.length + " books";
    none.hidden = shown !== 0;
  }
  input.addEventListener("input", apply);
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      folder = c.getAttribute("data-folder");
      chips.forEach(function (x) {
        x.setAttribute("aria-pressed", x === c ? "true" : "false");
      });
      apply();
    });
  });
  apply();
})();
