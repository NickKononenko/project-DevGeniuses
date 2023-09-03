import amazonLink from '../images/pop-up/amazon.png';
import appleBooks from '../images/pop-up/apple-books.png';
import bookShop from '../images/pop-up/book-shop.png';

let isAuth;
let isAuthSrt;

function renderModalMarkup({
  book_image,
  title,
  author,
  description,
  buy_links,
  _id,
}) {
  const bookRef = document.querySelector('.modal-pop-book');
  const modalRef = document.querySelector('.modal-pop');
  const btnWrap = document.querySelector('.btn-wrap');
  let buyMarkup = [];
  let markupImg;
  let markupTitle;
  let markupAuthor;
  let markupDescription;

  isAuthSrt = localStorage.getItem('isAuthenticated');

  try {
    isAuth = JSON.parse(isAuthSrt);
  } catch (error) {
    console.log(error);
  }

  buy_links.forEach(link => {
    if (link.name === 'Amazon') {
      const amazon = `<a href="${link.url}" target="_blank" rel="noreferrer noopener">
            <img
            // src="${amazonLink}"
            alt="amazon label"
            class="buy-img amaz"
            />
        </a>`;

      buyMarkup.push(amazon);
    }

    if (link.name === 'Apple Books') {
      const apple = `<a href="${link.url}" target="_blank" rel="noreferrer noopener">
            <img
            src="${appleBooks}"
            alt="apple label"
            class="buy-img"
                />
        </a>`;

      buyMarkup.push(apple);
    }

    if (link.name === 'Barnes and Noble') {
      const barnes = `<a href="${link.url}" target="_blank" rel="noreferrer noopener">
              <img
                src="${bookShop}"
                alt="apple label"
                class="buy-img"
              />
                </a>`;

      buyMarkup.push(barnes);
    }
  });

  if (book_image !== '') {
    markupImg = `<img class="modal-pop-image" src="${book_image}" alt="book-cover"/>`;
  } else {
    markupImg = `<img class="modal-pop-image" src="../images/Logotype.png" alt="book-cover"/>`;
  }

  if (title !== '') {
    markupTitle = `<h1 class="modal-pop-title">${title}</h1>`;
  } else {
    markupTitle = `<h1 class="modal-pop-title">No title</h1>`;
  }

  if (author !== '') {
    markupAuthor = `<h2 class="modal-pop-author">${author}</h2>`;
  } else {
    markupAuthor = `<h2 class="modal-pop-author">No author name</h2>`;
  }

  if (description !== '') {
    markupDescription = `<p class="modal-pop-descr">${description}</p>`;
  } else {
    markupDescription = `<p class="modal-pop-descr">No description</p>`;
  }

  const markup = `${markupImg}
   <div class="book-descr-wrapper">${markupTitle}
${markupAuthor}
${markupDescription}
<div class="buy-label">${buyMarkup.join('')}</div>

</div>`;
  bookRef.innerHTML = markup;
  if (isAuth) {
    btnWrap.innerHTML =
      '<button class="pop-add-book-btn" data-id = ${_id} type="button">add to shopping list</button>';
  } else {
    return;
  }
}

export { renderModalMarkup, isAuth };
