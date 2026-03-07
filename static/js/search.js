(function () {
  let searchIndex = null;
  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');
  if (!input || !resultsEl) return;

  fetch('/js/search-index.json')
    .then(r => r.json())
    .then(data => { searchIndex = data; })
    .catch(() => { console.warn('Search index not found'); });

  function debounce(fn, ms) {
    let timer;
    return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), ms); };
  }

  function search(query) {
    if (!searchIndex || !query.trim()) { resultsEl.classList.remove('visible'); return; }
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = searchIndex
      .map(entry => {
        const text = entry.text;
        const titleLower = entry.title.toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (titleLower.includes(term)) score += 10;
          if (text.includes(term)) score += 1;
          let idx = 0;
          while ((idx = text.indexOf(term, idx)) !== -1) { score += 0.5; idx += term.length; }
        }
        return { ...entry, score };
      })
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    if (matches.length === 0) {
      resultsEl.innerHTML = '<div class="search-no-results">No results found</div>';
      resultsEl.classList.add('visible');
      return;
    }

    resultsEl.innerHTML = matches.map(m => {
      const excerpt = m.excerpt.slice(0, 120) + '…';
      return `<a href="${m.href}" class="search-result-item">
        <div class="search-result-title">${m.title}</div>
        <div class="search-result-excerpt">${excerpt}</div>
      </a>`;
    }).join('');
    resultsEl.classList.add('visible');
  }

  input.addEventListener('input', debounce(function () { search(this.value); }, 200));
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav-search')) resultsEl.classList.remove('visible'); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { resultsEl.classList.remove('visible'); input.blur(); } });
  document.addEventListener('keydown', function (e) { if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); } });
})();
