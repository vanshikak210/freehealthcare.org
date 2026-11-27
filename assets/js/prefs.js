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
  // ---- Language: real pages (English / Español) or in-page Google Translate with its bar hidden
  var pageLang = d.lang || 'en';
  function cookies(code) {
    var host = location.hostname, exp = code ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    var val = code ? '/' + pageLang + '/' + code : '';
    ['', '; domain=' + host, '; domain=.' + host].forEach(function (dom) {
      document.cookie = 'googtrans=' + val + '; path=/' + dom + exp;
    });
  }
  function translateTo(code) {
    cookies(code);
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement({ pageLanguage: pageLang, autoDisplay: false }, 'google_translate_element');
    };
    if (!document.getElementById('google_translate_element')) {
      var box = document.createElement('div');
      box.id = 'google_translate_element';
      document.body.appendChild(box);
    }
    if (!document.getElementById('google-translate-script')) {
      var sc = document.createElement('script');
      sc.id = 'google-translate-script'; sc.async = true;
      sc.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(sc);
    }
    var tries = 0;
    (function pick() {
      var sel = document.querySelector('.goog-te-combo');
      if (sel) { sel.value = code; sel.dispatchEvent(new Event('change')); }
      else if (tries++ < 100) { setTimeout(pick, 50); }
    })();
  }
  var lang = document.getElementById('prefs-lang');
  if (lang) {
    var saved = null;
    try { saved = localStorage.getItem('fhic-lang'); } catch (e) {}
    if (saved && pageLang === 'en') { lang.value = 'mt:' + saved; translateTo(saved); }
    lang.addEventListener('change', function () {
      var v = lang.value;
      if (v.indexOf('mt:') === 0) {
        if (pageLang !== 'en') { // machine translation is applied from the English pages
          lang.selectedIndex = 0; return;
        }
        save('fhic-lang', v.slice(3)); translateTo(v.slice(3));
      } else {
        save('fhic-lang', null); cookies('');
        var translated = d.classList.contains('translated-ltr') || d.classList.contains('translated-rtl');
        if (v === location.pathname && translated) { location.reload(); } else { location.href = v; }
      }
    });
  }
  // ---- Font
  var font = document.getElementById('prefs-font');
  if (font) {
    font.value = d.dataset.font || '';
    font.addEventListener('change', function () {
      if (font.value) { d.dataset.font = font.value; save('fhic-font', font.value); }
      else { delete d.dataset.font; save('fhic-font', null); }
    });
  }
  // ---- Read selected text aloud (browser text-to-speech)
  var read = document.getElementById('prefs-read');
  if (read) {
    if (!('speechSynthesis' in window)) { read.hidden = true; }
    read.addEventListener('click', function () {
      if (speechSynthesis.speaking) { speechSynthesis.cancel(); read.textContent = read.dataset.read; return; }
      var text = String(window.getSelection()).trim() || (document.querySelector('main') || document.body).innerText;
      var u = new SpeechSynthesisUtterance(text);
      u.lang = pageLang;
      u.onend = function () { read.textContent = read.dataset.read; };
      read.textContent = read.dataset.stop;
      speechSynthesis.speak(u);
    });
  }
  document.getElementById('prefs-reset').addEventListener('click', function () {
    delete d.dataset.theme; delete d.dataset.size; delete d.dataset.font;
    save('fhic-theme', null); save('fhic-size', null); save('fhic-font', null);
    if (font) { font.value = ''; }
    sync();
  });

  sync();
})();
