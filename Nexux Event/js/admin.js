document.addEventListener('DOMContentLoaded',() => {
  const AUTH_KEY = 'nexusAuth';
  const USER = 'core';
  const PASS = 'matrix24';

  const page = document.body.dataset.page;

  if (page === 'admin') {
    if (localStorage.getItem(AUTH_KEY) === 'true') {
      window.location.href = 'admin/index.html';
      return;
    }
    
    const form = document.querySelector('[data-admin-form]');
    const status = document.querySelector('[data-status]');
    const userInput = document.querySelector('[data-user]');
    const passInput = document.querySelector('[data-pass]');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = userInput.value.trim();
        const pass = passInput.value.trim();

        if (user === USER && pass === PASS) {
          localStorage.setItem(AUTH_KEY, 'true');
          window.location.href = 'admin/index.html';
        } else {
          status.textContent = 'Access denied. Try: core / matrix24';
          status.classList.add('status', 'red');
        }
      });
    }
  }

  if (page === 'dashboard') {
    if (localStorage.getItem(AUTH_KEY) !== 'true') {
      window.location.href = '../admin-login.html';
      return;
    }

    const logout = document.querySelector('[data-logout]');
    if (logout) {
      logout.addEventListener('click', () => {
        localStorage.removeItem(AUTH_KEY);
        window.location.href = '../admin-login.html';
      });
    }
  }
});