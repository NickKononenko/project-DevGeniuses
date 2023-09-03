const toggle = document.querySelector('.toggle');
const body = document.querySelector('body');
const openBtnMenu = document.querySelector('.burger-btn');
const closeBtnMenu = document.querySelector('.burger-btn-close');
openBtnMenu.addEventListener('click', () => {
  openBtnMenu.classList.add('js-switch-btn');
  closeBtnMenu.classList.remove('js-switch-btn');
});
closeBtnMenu.addEventListener('click', () => {
  openBtnMenu.classList.remove('js-switch-btn');
  closeBtnMenu.classList.add('js-switch-btn');
});

toggle.addEventListener('click', onToggleClick);

openBtnMenu.addEventListener('click', () => {
  openBtnMenu.classList.add('js-switch-btn');
  closeBtnMenu.classList.remove('js-switch-btn');
});

closeBtnMenu.addEventListener('click', () => {
  openBtnMenu.classList.remove('js-switch-btn');
  closeBtnMenu.classList.add('js-switch-btn');
});

function onToggleClick() {
  toggle.classList.toggle('active');
  body.classList.toggle('dark-body-theme');
}
