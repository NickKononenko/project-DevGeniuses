console.log('test')

const inputTheme = document.querySelector('.div-theme');
const spanTheme = document.querySelector('.span-theme');

const body = document.querySelector('body');
let indexTheme = false;


inputTheme.addEventListener('change', () => {
  if (indexTheme) {
    indexTheme = false;
    localStorage.setItem('userTheme', 'light');
  } else {
    indexTheme = true;
    localStorage.setItem('userTheme', 'dark');
  }

  currentTheme();
});

