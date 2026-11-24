// Hide each event once its end time has passed. If none are left, show the "no events" note.
(function () {
  var now = Date.now(), left = 0;
  document.querySelectorAll('article[data-end]').forEach(function (el) {
    if (Date.parse(el.getAttribute('data-end')) <= now) { el.remove(); } else { left++; }
  });
  if (!left) {
    ['.events', '#upcoming'].forEach(function (s) {
      var el = document.querySelector(s); if (el) { el.remove(); }
    });
    var none = document.getElementById('no-events'); if (none) { none.hidden = false; }
  }
})();
