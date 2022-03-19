const rootEl = document.documentElement;
const input = document.querySelector('.theme-switcher__input');

// adding this property insures that the media query for dark mode in css won't be executed. We'll use media query from js instead. Toggle without this line would also work just fine. But then light would actually mean dark and vice-versa.
rootEl.setAttribute('js', 'enabled');

// function for adding or removing the theme(and checked state for checkbox) accordingly
const toggleTheme = theme => {
  if (theme === 'dark') {
    rootEl.setAttribute('theme', 'dark');
    input.setAttribute('checked', '');
  } else if (theme === 'light') {
    rootEl.removeAttribute('theme');
    input.removeAttribute('checked');
  }
};

// storing user and browser preferences
const userPrefersTheme = typeof Storage ? localStorage.getItem('theme') : null;
const browserPrefersDarkTheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;

// setting theme taking into account calculated preferences
if (userPrefersTheme) toggleTheme(userPrefersTheme);
else if (browserPrefersDarkTheme) toggleTheme('dark');

// setting theme when user toggles the theme-switcher input(and storing the preference in localStorage)
input.addEventListener('change', e => {
  let theme = e.target.checked ? 'dark' : 'light';
  toggleTheme(theme);
  localStorage.setItem('theme', theme);
});

// localStorage.removeItem("theme");
