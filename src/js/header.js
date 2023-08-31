const toggle = document.querySelector('.toggle');
const body = document.querySelector('body');
toggle.addEventListener('click', onToggleClick);

function onToggleClick() {
  toggle.classList.toggle('active');
  body.classList.toggle('dark-body-theme');
}
