/**
 * Already applied to Desktop/index.html (NyanChu source).
 * To update the live site: Netlify dashboard → candid-cassata-bceae7 → Deploys → drag this folder.
 */
(function kasawaNyanchuPrefill() {
  var p = new URLSearchParams(location.search);
  if (!p.has("kw") && !p.has("url") && !p.has("from") && !p.has("wt") && !p.has("tag") && !p.has("mention")) return;
  function $(id){ return document.getElementById(id); }
  function set(id, value) {
    var el = $(id);
    if (el && value) el.value = value;
  }
  set("kw", p.get("kw"));
  set("url", p.get("url"));
  set("from", p.get("from"));
  set("wt", p.get("wt"));
  set("lang", p.get("lang"));
  set("tag", p.get("tag"));
  set("mention", p.get("mention"));
  set("ex", p.get("ex"));
  var wtUnit = p.get("wtUnit");
  if (wtUnit) set("wtUnit", wtUnit);
  var mode = p.get("mode");
  if (mode) {
    var modeInput = document.querySelector('input[name="kwmode"][value="' + mode + '"]');
    if (modeInput) modeInput.checked = true;
  }
})();
