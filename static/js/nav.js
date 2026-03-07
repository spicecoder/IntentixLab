(function () {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
  nav.querySelectorAll('.nav-page a').forEach(link => {
    link.addEventListener('click', () => { nav.classList.remove('open'); });
  });
})();
