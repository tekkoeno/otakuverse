document.addEventListener('DOMContentLoaded', () => {
  // === Открытие мобильного меню === //
  const burger = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('.header__mobile-menu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  // === Тема сайта ===
  const html = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const modal = document.querySelector('.modal-theme');
  const btnThemeClose = document.querySelector('.modal-theme-close');
  const modalContent = document.querySelector('.modal-theme-content');
  const btnDark = document.querySelector('.themes-night');
  const btnLight = document.querySelector('.themes-light');
  const btnSystem = document.querySelector('.themes-system');
  const systemText = btnSystem.querySelector('span');

  // Теперь ищем ВСЕ кнопки темы (и десктоп, и мобилька)
  const btnThemes = document.querySelectorAll('.button-theme');

  const updateSystemText = () => {
    return true;
  };

  const setTheme = (theme, system = false) => {
    html.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    localStorage.setItem('systemMode', system);

    // Обновляем иконки на ВСЕХ кнопках темы
    btnThemes.forEach((btn) => {
      const icon = btn.querySelector('img');
      icon.src = `./assets/img/${theme === 'dark' ? 'night' : 'light'}-theme.svg`;
    });
  };

  // === Инициализация ===
  (() => {
    updateSystemText();
    const saved = localStorage.getItem('theme');
    const systemMode = localStorage.getItem('systemMode') === 'true';

    if (systemMode) {
      setTheme(prefersDark.matches ? 'dark' : 'light', true);
    } else {
      setTheme(saved || (prefersDark.matches ? 'dark' : 'light'));
    }
  })();

  // === Реакция на смену системной темы ===
  prefersDark.addEventListener('change', (e) => {
    updateSystemText();
    if (localStorage.getItem('systemMode') === 'true') {
      setTheme(e.matches ? 'dark' : 'light', true);
    }
  });

  // === События для кнопок темы (прикрепляем ко всем) ===
  btnThemes.forEach((btnTheme) => {
    btnTheme.addEventListener('click', () => {
      modal.classList.add('modal-theme-active');
      document.body.style.overflow = 'hidden';
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });

    // Обновляем иконку при инициализации (если нужно)
    const currentTheme = html.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
    const icon = btnTheme.querySelector('img');
    icon.src = `./assets/img/${currentTheme === 'dark' ? 'night' : 'light'}-theme.svg`;
  });

  btnDark.addEventListener('click', () => {
    setTheme('dark');
    modal.classList.remove('modal-theme-active');
    document.body.style.overflow = '';
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
  btnThemeClose.addEventListener('click', () => {
    modal.classList.remove('modal-theme-active');
    document.body.style.overflow = '';
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
  btnLight.addEventListener('click', () => {
    setTheme('light');
    modal.classList.remove('modal-theme-active');
    document.body.style.overflow = '';
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });

  btnSystem.addEventListener('click', () => {
    const systemTheme = prefersDark.matches ? 'dark' : 'light';
    setTheme(systemTheme, true);
    modal.classList.remove('modal-theme-active');
    document.body.style.overflow = '';
  });
  // === Закрытие по клику вне контента ===
  modal.addEventListener('click', (e) => {
    if (!modalContent.contains(e.target)) {
      modal.classList.remove('modal-theme-active');
      document.body.style.overflow = '';
    }
  });

  /* Функционал поисков статьи */
  // Функционал модального окна поиска статьи
  // Теперь ищем ВСЕ кнопки поиска
  const buttonSearches = document.querySelectorAll('.button-search');
  const btnSearchClose = document.querySelector('.modal-search-close');
  const modalSearch = document.querySelector('.modal-search');
  const modalSearchContent = document.querySelector('.modal-search-content');

  // Прикрепляем события ко всем кнопкам поиска
  buttonSearches.forEach((buttonSearch) => {
    buttonSearch.addEventListener('click', () => {
      modalSearch.classList.add('modal-search-active');
      document.body.style.overflow = 'hidden';
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  btnSearchClose.addEventListener('click', () => {
    modalSearch.classList.remove('modal-search-active');
    document.body.style.overflow = '';
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
  // === Закрытие по клику вне контента ===
  modalSearch.addEventListener('click', (e) => {
    if (!modalSearchContent.contains(e.target)) {
      modalSearch.classList.remove('modal-search-active');
      document.body.style.overflow = '';
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });

  // === Авто обертка изображений в single.php === //
  const images = document.querySelectorAll('.single-content img');

  images.forEach((img) => {
    // Если картинка находится внутри <li> — пропускаем
    if (img.closest('li')) return;

    // Создаем обертку
    const wrapper = document.createElement('div');
    wrapper.classList.add('single-img-container');

    // Вставляем wrapper перед картинкой
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
  });
});
