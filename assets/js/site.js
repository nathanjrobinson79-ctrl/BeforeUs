(() => {
  if (window.location.hostname === 'www.beforeus.com.au') {
    window.location.replace(`https://beforeus.com.au${window.location.pathname}${window.location.search}${window.location.hash}`);
    return;
  }

  const CONTACT_EMAIL = 'beforeusancestry@gmail.com';
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');

  if (menuButton && navigation) {
    const setMenuOpen = (isOpen) => {
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      navigation.classList.toggle('is-open', isOpen);
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isOpen);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuButton.focus();
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-tree-toggle]').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded;
      button.textContent = isExpanded ? 'Explore earlier generations' : 'Hide earlier generations';
    });
  });

  const form = document.querySelector('#enquiry-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('[type="submit"]');
    const fields = form.querySelector('fieldset');
    const FORM_ENDPOINT = '';
    const requestedPackage = new URLSearchParams(window.location.search).get('package');
    const packageField = form.querySelector('#package');

    if (fields) fields.disabled = false;

    if (requestedPackage && packageField) {
      const option = Array.from(packageField.options).find(
        (item) => item.textContent.trim().toLowerCase() === requestedPackage.toLowerCase()
      );
      if (option) packageField.value = option.value;
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      if (!FORM_ENDPOINT) {
        const message = Array.from(new FormData(form).entries())
          .filter(([, value]) => typeof value === 'string' && value.trim())
          .map(([name, value]) => `${name}: ${value}`)
          .join('\n');
        const subject = encodeURIComponent('Website enquiry');
        const body = encodeURIComponent(message);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        status.textContent = `Your email app should open with your enquiry addressed to ${CONTACT_EMAIL}. Send the message there to complete your enquiry.`;
        status.classList.remove('error');
        return;
      }

      if (!FORM_ENDPOINT.startsWith('https://')) {
        status.textContent = `The form endpoint must use HTTPS. Please email ${CONTACT_EMAIL} for help.`;
        status.classList.add('error');
        return;
      }

      const submitLabel = submit.textContent;
      status.textContent = 'Sending your enquiry…';
      status.classList.remove('error');
      submit.disabled = true;
      submit.textContent = 'Sending…';

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error(`Form provider returned ${response.status}`);
        form.reset();
        status.textContent = 'Thank you. Your enquiry has been sent.';
      } catch {
        status.textContent = `We could not send your enquiry. Please try again later or email ${CONTACT_EMAIL} instead.`;
        status.classList.add('error');
      } finally {
        submit.disabled = false;
        submit.textContent = submitLabel;
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
