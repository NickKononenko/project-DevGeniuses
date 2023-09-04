// const btnRef = document.querySelector('.btn_up');
const mainWrapper = document.querySelector('.main-wrapper');
mainWrapper.insertAdjacentHTML(
  'beforeend',
  '<button class="btn-up hidden-btn-up" type="button"><svg class="icon-btn-up " width="24" height="24"><use href="./images/sprite.svg#icon-arrow-up"></use></svg>UP</button>'
);
const btnRef = document.querySelector('.btn-up');
console.log(btnRef);

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 1000) {
    addBtnUp();
  } else {
    removeBtnUp();
  }
});

btnRef.addEventListener('click', scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

function removeBtnUp() {
  btnRef.classList.add('hidden-btn-up');
}
function addBtnUp() {
  btnRef.classList.remove('hidden-btn-up');
}
