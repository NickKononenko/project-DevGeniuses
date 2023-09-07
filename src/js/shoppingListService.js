import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchingByBook } from './apiService';
import Notiflix from 'notiflix';
import amazon from '../images/amazon.png';
import appleBooks from '../images/apple-books.png';
import bookShop from '../images/book-shop.png';
import imageUrl from '../images/trashicon.png';

Notiflix.Notify.init({
  width: '370px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '18px',
  timeout: 4000,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  fontFamily: 'DM Sans',
  cssAnimationStyle: 'from-top',

  info: {
    background: '#4F2EE8',
    textColor: '#FFFFFF',
    childClassName: 'notiflix-notify-info',
  },
  success: {
    background: '#4F2EE8',
    textColor: '#FFFFFF',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },
});

export const emptyRef = document.querySelector('.empty-shopping-list');
const booksList = document.querySelector('.shopping-list');
export let booksArray;
try {
  booksArray = JSON.parse(localStorage.getItem('books'));
} catch (error) {
  console.log(error);
}
if (booksArray === null) {
  booksArray = [];
}

const paginationContainer = document.getElementById('tui-pagination-container');

let itemsPerPage = 4;
let pagination = null;

renderingShoppingList();

function renderingShoppingList() {
  const booksList = document.querySelector('.shopping-list');
  if (!booksList) {
    return;
  }

  const data = localStorage.getItem('books');
  const books = JSON.parse(data);

  if (books === null || books.length <= itemsPerPage) {
    emptyRef.classList.remove('visuallyhidden');
    paginationContainer.remove();
  } else {
    booksList.innerHTML = '';
    const dataJSON = localStorage.getItem('books');
    if (dataJSON) {
      booksArray = JSON.parse(dataJSON);
    }
  }

  if (booksArray !== null) {
    if (booksArray.length > 0) {
      emptyRef.classList.add('visuallyhidden');
      paginationContainer.style.display = 'flex';
    }

    updatePagination();
  }
}

window.addEventListener('resize', renderingShoppingList);

function updatePagination() {
  if (pagination) {
    pagination.reset();
  }

  const totalItems = booksArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let paginationOptions;

  const paginationOptionsDesktop = {
    totalItems: totalItems,
    itemsPerPage: 4,
    visiblePages: 2,
    page: 1,
  };

  const paginationOptionsMobile = {
    totalItems: totalItems,
    itemsPerPage: 4,
    visiblePages: 1,
    page: 1,
  };

  if (window.matchMedia('(max-width: 768px)').matches) {
    paginationOptions = paginationOptionsMobile;
  } else {
    paginationOptions = paginationOptionsDesktop;
  }

  pagination = new Pagination(paginationContainer, paginationOptions);

  pagination.on('afterMove', function (eventData) {
    const currentPage = eventData.page;
    renderBooksOnPage(currentPage);
  });

  renderBooksOnPage(1);
}

function renderBooksOnPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const booksToDisplay = booksArray.slice(startIndex, endIndex);

  booksList.innerHTML = '';

  for (let i = 0; i < booksToDisplay.length; i++) {
    const book = loadFromLocalStorage(booksToDisplay[i]._id);
    booksList.insertAdjacentHTML(
      'beforeend',
      `<div class="shopping-list-thumb">
        <div class="cover-shopping-list" style="background-image: url('${book.book_image}'); background-size: cover;"></div>
        <div class="book-interface">
          <div class="book-title-btn">
            <div>
              <h2 class="shopping-list-book-title">${book.title}</h2>
              <p class="shopping-list-book-category">${book.list_name}</p>
            </div>

          <button class="delete-shopping-list-btn" type="button" data-id="${book._id}">
              <img src="${imageUrl}" />
          </button>

          </div>
          <p class="shopping-list-book-about">${book.description}</p>
          <div class="shopping-list-book">
            <p class="shopping-list-book-author">${book.author}</p>
            <ul class="shopping-list-trading">
              <li class="shopping-list-trading-item">
                <a class="shopping-list-trading-link brightness" href="${book.buy_links[0].url}" target="_blank" rel="noopener noreferrer">
                  <img src="${amazon}" class="shopping-list-trading-icon-amazon" alt="Amazon icon" />
                </a>
              </li>
              <li class="shopping-list-trading-item">
                <a class="shopping-list-trading-link" href="${book.buy_links[1].url}" target="_blank" rel="noopener noreferrer">
                  <img src="${appleBooks}" class="shopping-list-trading-icon-apple-books" alt="Apple icon" />
                </a>
              </li>
              <li class="shopping-list-trading-item">
                <a class="shopping-list-trading-link" href="${book.buy_links[2].url}" target="_blank" rel="noopener noreferrer">
                  <img src="${bookShop}" class="shopping-list-trading-icon-book-shop" alt="Book shop icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>`
    );
  }
  const deleteBtnRefs = document.querySelectorAll('.delete-shopping-list-btn');
  for (let i = 0; i < deleteBtnRefs.length; i++) {
    deleteBtnRefs[i].addEventListener('click', removingBookFromShoppingList);
  }
}

export async function addingToShopList(e) {
  const book = await fetchingByBook(e.target.dataset.id);
  saveToLocalStorage(book);
  Notiflix.Notify.success('Book added to shopping list');
}

export function removingBookFromShoppingList(e) {
  const id = e.currentTarget.dataset.id;
  const index = booksArray.findIndex(book => book._id === id);
  if (index !== -1) {
    booksArray.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(booksArray));
    Notiflix.Notify.info('Book removed from shopping list');
  }
  renderingShoppingList();

  if (booksArray.length === 0) {
    emptyRef.classList.remove('visuallyhidden');
  }
}

export function saveToLocalStorage(book) {
  try {
    if (booksArray === null) {
      booksArray = [];
    }
    booksArray.push(book);
    const dataJSON = JSON.stringify(booksArray);
    localStorage.setItem('books', dataJSON);
  } catch (error) {
    console.log(error);
  }
}

export function loadFromLocalStorage(id) {
  try {
    const dataJSON = localStorage.getItem('books');
    if (dataJSON) {
      const booksArray = JSON.parse(dataJSON);
      return booksArray.find(book => book._id === id);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
