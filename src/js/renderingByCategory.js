import getRefs from './homeRefs';
import { createBookCard } from './createBookCard';
import { fetchingByCategory } from './apiService';
import { renderingHomePage } from './renderingHomePage';
import addBooksListeners from './addBooksListeners';
const { galleryRef, categoriesRef } = getRefs();

export default function renderingByCategory(e) {
  galleryRef.innerHTML = '';
  if (e.target.classList.contains('gallery-see-more-btn')) {
    galleryRef.insertAdjacentHTML(
      'beforeend',
      `<h2 class="gallery-title">${e.target.dataset.category
        .trim()
        .split(' ')
        .slice(0, length - 1)
        .join(
          ' '
        )} <span class = "gellery-title-akcent">${e.target.dataset.category
        .trim()
        .split(' ')
        .pop()}</span></h2>`
    );
    galleryRef.insertAdjacentHTML(
      'beforeend',
      `<div class="gallery-list2"></div>`
    );

    const galleryListRef = document.querySelector('.gallery-list2');
    const query = e.target.dataset.category.split(' ').join('%20');
    fetchingByCategory(query).then(response => {
      response.map(book => {
        galleryListRef.insertAdjacentHTML('beforeend', createBookCard(book));
      });
      addBooksListeners();
    });

    categoriesRef.querySelector('.active').classList.remove('active');
    document
      .querySelector(`[data-id="${e.target.dataset.category}"]`)
      .classList.add('active');

    window.scrollTo(0, 0);

    return;
  }

  if (e.target.innerHTML.trim() === 'All categories') {
    renderingHomePage();

    window.scrollTo(0, 0);
    return;
  }

  galleryRef.insertAdjacentHTML(
    'beforeend',
    //   category.split(" ").slice(category.split(" ").length - 1, category.split(" ").length).join(" ");
    // category.split(" ").slice(0, category.split(" ").length - 1).join(" ");
    `<h2 class="gallery-title">${e.target.innerHTML
      .trim()
      .split(' ')
      .slice(0, length - 1)
      .join(' ')} <span class = "gellery-title-akcent">${e.target.innerHTML
      .trim()
      .split(' ')
      .pop()}</span></h2>`

  );

  galleryRef.insertAdjacentHTML(
    'beforeend',
    `<div class="gallery-list2"></div>`
  );

  const galleryListRef = document.querySelector('.gallery-list2');
  const query = e.target.innerHTML.trim().split(' ').join('%20');

  fetchingByCategory(query).then(response => {
    response.map(book =>
      galleryListRef.insertAdjacentHTML('beforeend', createBookCard(book))
    );
    addBooksListeners();
  });

  // Летимо вгору

  window.scrollTo(0, 0);
}
