const homePage = document.querySelector('.home-page');
export function ScrollToTop() {
  homePage.insertAdjacentHTML(
    'beforeend',
    '<button class="btn-up" type="button"></button>'
  );
  const btnUp = document.querySelector('.btn-up');
  btnUp.addEventListener('click', onBtnUp);
  function onBtnUp(evt) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
