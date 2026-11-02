/*
  Site logic:
  - navigation and footer
  - translations
  - theme switch
  - mobile menu
  - project rendering
  - simple contact mailto form
*/

const content = window.PORTFOLIO_CONTENT;
const supportedLanguages = ['en', 'no', 'pl'];
const defaultLanguage = 'en';

document.addEventListener('DOMContentLoaded', () => {
  renderSharedLayout();
  setInitialTheme();
  setInitialLanguage();
  renderProjects();
  bindEvents();
});

function renderSharedLayout() {
  const page = document.body.dataset.page || 'home';
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');

  if (header) {
    header.innerHTML = `
      <div class="container header__inner">
        <a class="brand" href="index.html" aria-label="Krzysztof Bytniewski">
          <span>Krzysztof</span>
          <strong>Bytniewski</strong>
        </a>

        <button class="menu-toggle icon-button" type="button" data-menu-toggle aria-expanded="false">
          <span class="sr-only" data-i18n="common.menuLabel">Open menu</span>
          <span class="menu-toggle__line"></span>
          <span class="menu-toggle__line"></span>
                    <span class="menu-toggle__line"></span>

        </button>

        <div class="header__panel" data-menu-panel>
          <nav class="main-nav" aria-label="Primary navigation">
            ${navLink('home', 'index.html', 'common.main', page)}
            ${navLink('work', 'work.html', 'common.work', page)}
            ${navLink('about', 'about.html', 'common.about', page)}
            ${navLink('contact', 'contact.html', 'common.contact', page)}
          </nav>

          <div class="header__tools">
            <div class="language-switcher" aria-label="Language">
              ${languageButton('en')}
              ${languageButton('no')}
              ${languageButton('pl')}
            </div>

            <button class="theme-toggle icon-button" type="button" data-theme-toggle>
              <span class="sr-only" data-i18n="common.themeLabel">Change color mode</span>
              <span aria-hidden="true" data-theme-icon>◐</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="container footer__inner">
        <div>
          <strong>Krzysztof Bytniewski</strong>
          <p data-i18n="common.footerText">Frontend development · Web design · Agency subcontracting</p>
        </div>

        <div class="footer__links">
          <a href="mailto:hello@yourdomain.no">hello@yourdomain.no</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>

        <p>© <span data-current-year></span></p>
      </div>
    `;

    const year = footer.querySelector('[data-current-year]');
    if (year) year.textContent = new Date().getFullYear();
  }
}

function navLink(pageName, href, translationKey, activePage) {
  const active = pageName === activePage ? 'aria-current="page"' : '';
  return `<a href="${href}" ${active} data-i18n="${translationKey}">${pageName}</a>`;
}

function languageButton(language) {
  return `
    <button type="button" data-language="${language}" aria-pressed="false">
      ${language.toUpperCase()}
    </button>
  `;
}

function setInitialTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia(
    '(prefers-color-scheme: light)',
  ).matches;
  const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
  applyTheme(initialTheme);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);

  const icon = document.querySelector('[data-theme-icon]');
  if (icon) icon.textContent = theme === 'dark' ? '☼' : '◐';
}

function setInitialLanguage() {
  const savedLanguage = localStorage.getItem('portfolio-language');
  const browserLanguage = navigator.language.slice(0, 2);
  const initialLanguage = supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : supportedLanguages.includes(browserLanguage)
      ? browserLanguage
      : defaultLanguage;

  applyLanguage(initialLanguage);
}

function applyLanguage(language) {
  if (!supportedLanguages.includes(language)) return;

  document.documentElement.lang = language;
  localStorage.setItem('portfolio-language', language);

  document.querySelectorAll('[data-language]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.language === language),
    );
  });

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = getNestedValue(
      content.translations[language],
      element.dataset.i18n,
    );
    if (value) element.textContent = value;
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    const value = getNestedValue(
      content.translations[language],
      element.dataset.i18nAlt,
    );
    if (value) element.alt = value;
  });

  renderProjects(language);
}

function getNestedValue(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object);
}

function renderProjects(
  language = document.documentElement.lang || defaultLanguage,
) {
  const projectLists = document.querySelectorAll('[data-project-list]');

  projectLists.forEach((list) => {
    const limit = Number(list.dataset.limit) || content.projects.length;
    const projects = content.projects.slice(0, limit);

    list.innerHTML = projects
      .map((project) => projectCard(project, language))
      .join('');
  });
}

function projectCard(project, language) {
  const translation = project[language] || project.en;
  const common =
    content.translations[language]?.common || content.translations.en.common;

  return `
    <article class="project-card" id="${project.id}">
      <a class="project-card__visual" href="${project.links.live}" aria-label="${translation.title}">
        <img src="${project.image}" alt="" loading="lazy">
      </a>

      <div class="project-card__content">
        <div class="project-card__meta">
          <span>${project.number}</span>
          <span>${project.year}</span>
        </div>

        <p class="eyebrow">${translation.category}</p>
        <h2>${translation.title}</h2>
        <p>${translation.summary}</p>
        <p class="project-card__role"><strong>${translation.role}</strong></p>

        <ul class="tag-list" aria-label="Technology stack">
          ${project.stack.map((item) => `<li>${item}</li>`).join('')}
        </ul>

        <div class="project-card__links">
          <a class="text-link" href="${project.links.live}">${common.liveSite}</a>
          <a class="text-link" href="${project.links.source}">${common.sourceCode}</a>
        </div>
      </div>
    </article>
  `;
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const languageButton = event.target.closest('[data-language]');
    if (languageButton) {
      applyLanguage(languageButton.dataset.language);
    }

    const themeButton = event.target.closest('[data-theme-toggle]');
    if (themeButton) {
      const currentTheme = document.documentElement.dataset.theme;
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    const menuButton = event.target.closest('[data-menu-toggle]');
    if (menuButton) {
      toggleMenu(menuButton);
    }

    const navigationLink = event.target.closest('.main-nav a');
    if (navigationLink) closeMenu();
  });

  const form = document.querySelector('[data-contact-form]');
  if (form) form.addEventListener('submit', handleContactForm);
}

function toggleMenu(button) {
  const panel = document.querySelector('[data-menu-panel]');
  const isOpen = button.getAttribute('aria-expanded') === 'true';

  button.setAttribute('aria-expanded', String(!isOpen));
  panel?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
}

function closeMenu() {
  const button = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-menu-panel]');

  button?.setAttribute('aria-expanded', 'false');
  panel?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

function handleContactForm(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = form.querySelector('[data-form-status]');
  const language = document.documentElement.lang || defaultLanguage;
  const labels = content.translations[language].contact;

  if (!form.checkValidity()) {
    form.reportValidity();
    if (status) status.textContent = labels.error;
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(
    `Portfolio inquiry: ${data.get('projectType')} — ${data.get('company') || data.get('name')}`,
  );
  const body = encodeURIComponent(
    `Name: ${data.get('name')}
Company: ${data.get('company')}
Email: ${data.get('email')}
Project type: ${data.get('projectType')}

${data.get('message')}`,
  );

  window.location.href = `mailto:hello@yourdomain.no?subject=${subject}&body=${body}`;
  if (status) status.textContent = labels.success;
}
