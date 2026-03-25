document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const page = body.dataset.page;

  if (page) {
    const activeLink = document.querySelector(`[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector('[data-toggle]');
  if (toggle) {
    const updateLabel = () => {
      toggle.textContent = body.classList.contains('matrix') ? 'Matrix: ON' : 'Matrix: OFF';
    };
    toggle.addEventListener('click', () => {
      body.classList.toggle('matrix');
      updateLabel();
    });
    updateLabel();
  }

  const searchInput = document.querySelector('[data-search]');
  const eventCards = document.querySelectorAll('[data-tags]');
  const filterBtns = document.querySelectorAll('[data-filter]');
  let activeFilter = 'all';

  const applyFilters = () => {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    eventCards.forEach(card => {
      const tags = card.dataset.tags.toLowerCase();
      const text = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const matchesSearch = !query || text.includes(query);
      card.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  const ticketRows = document.querySelectorAll('[data-price]');
  const totalEl = document.querySelector('[data-total]');

  const updateTotal = () => {
    let total = 0;
    ticketRows.forEach(row => {
      const qtyInput = row.querySelector('[data-qty]');
      const price = parseInt(row.dataset.price) || 0;
      const qty = parseInt(qtyInput?.value) || 0;
      total += price * qty;
    });
    if (totalEl) {
      totalEl.textContent = total;
    }
  };

  ticketRows.forEach(row => {
    const qtyInput = row.querySelector('[data-qty]');
    const minusBtn = row.querySelector('[data-qty="-"]');
    const plusBtn = row.querySelector('[data-qty="+"]');

    const clampQty = () => {
      if (!qtyInput) return;
      let val = parseInt(qtyInput.value) || 0;
      val = Math.max(0, Math.min(10, val));
      qtyInput.value = val;
      updateTotal();
    };

    if (qtyInput) {
      qtyInput.addEventListener('change', clampQty);
    }

    if (minusBtn && qtyInput) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 0;
        qtyInput.value = Math.max(0, val - 1);
        clampQty();
      });
    }

    if (plusBtn && qtyInput) {
      plusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 0;
        qtyInput.value = Math.min(10, val + 1);
        clampQty();
      });
    }
  });

  if (ticketRows.length) updateTotal();
});