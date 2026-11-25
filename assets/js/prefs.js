// Preferences panel: theme (light / dark / match device) and text size. Saved per device.
(function () {
  var d = document.documentElement;
  var btn = document.getElementById('prefs-toggle');
  var panel = document.getElementById('prefs-panel');
  if (!btn || !panel) { return; }

  function save(key, value) {
    try { if (value === null) { localStorage.removeItem(key); } else { localStorage.setItem(key, value); } } catch (e) {}
  }
  function sync() {
    var theme = d.dataset.theme || 'light', size = d.dataset.size || 'standard';
    panel.querySelectorAll('input[name="theme"]').forEach(function (r) { r.checked = r.value === theme; });
    panel.querySelectorAll('input[name="size"]').forEach(function (r) { r.checked = r.value === size; });
  }
  function open() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    var first = panel.querySelector('input:checked') || panel.querySelector('input');
    if (first) { first.focus(); }
  }
  function close(returnFocus) {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (returnFocus) { btn.focus(); }
  }

  btn.addEventListener('click', function () { if (panel.hidden) { open(); } else { close(true); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { close(true); } });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) { close(false); }
  });

  panel.addEventListener('change', function (e) {
    var el = e.target;
    if (el.name === 'theme') { d.dataset.theme = el.value; save('fhic-theme', el.value); }
    if (el.name === 'size') {
      if (el.value === 'large') { d.dataset.size = 'large'; save('fhic-size', 'large'); }
      else { delete d.dataset.size; save('fhic-size', null); }
    }
  });
  var lang = document.getElementById('prefs-lang');
  if (lang) {
    lang.addEventListener('change', function () {
      var v = lang.value;
      window.location.href = v;
    });
  }
  document.getElementById('prefs-reset').addEventListener('click', function () {
    delete d.dataset.theme; delete d.dataset.size;
    save('fhic-theme', null); save('fhic-size', null);
    sync();
  });

  sync();
})();
