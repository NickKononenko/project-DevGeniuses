import axios from 'axios';
import { spinnerStartForCategories, spinerStopForCategories } from './spin';

import { fetchingByCategory } from './apiService';

const refs = {
  homePage: document.querySelector('.home-page'),
  homePage2: document.querySelector('.home-page2'),
  // bestItem: document.querySelector('.best-item'),
};

axios.defaults.baseURL = 'https://books-backend.p.goit.global';
function fetchBooks() {
  return axios.get('/books/top-books').then(response => {
    return response.data;
  });
}

export function fetchBooksHomePage() {
  fetchBooks()
    .then(data => {
      console.log(data);
      // console.log(data[1].books);

      refs.homePage.insertAdjacentHTML('beforeend', createMarkup(data));
      console.log(document.documentElement.clientWidth);

      const bestList = document.querySelectorAll('.best-list');
      // console.log(bestList);

      const nameBook = document.querySelector('.name-book-text');
      console.log(nameBook.textContent);
    })
    .catch(error => {
      console.log(error.message);
      Notiflix.Notify.failure(`Oops! ${error.message}! Try reloading the page!`, {
        width: '380px',
        position: 'center-center',
        timeout: 6000,
        clickToClose: true,
      });

      // refs.loader.classList.add('is-hidden');
    });
}

fetchBooksHomePage();

const homePage = document.querySelector('.home-page');
homePage.addEventListener('click', onBtnSeeMoreClick);
async function onBtnSeeMoreClick(evt) {
  if (evt.target.classList.contains('js-btn-more')) {
    const currentCategory =
      evt.target.closest('.categories-cont').dataset.idCategories;

    try {
      const category = await fetchingByCategory(currentCategory);
      refs.homePage.innerHTML = '';
      refs.homePage.innerHTML = `<ul class="category-page list">
      
      ${await createMarkupCategories(category)}
      </ul>`;

      // refs.homePage2.insertAdjacentHTML(
      //   'beforeend',
      //   await createMarkupCategories(category)
      // );

      // console.log(category);
    } catch (error) {
      console.log('catch error', error);
    }

    return;
  }
}

function createMarkupCategories(array) {
  return array
    .map(
      ({ list_name, books, _id, book_image, title, author }) =>
        `
            <li class="book-item">
                  <a href="" class="portfolio-link link">
                  <div class="portfolio-thumb">
                      <div class="wrapper">          
                        <img class="cover" src="${book_image}" alt="${title}" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                  </div>   
                        <p class="name-book-text">${title}</p>
                        <p class="author-book-text">${author}</p>
                      </a>
                  </li>
        
          `
    )
    .join('');
}

function createMarkup(arr) {
  return arr
    .map(
      ({ list_name, books }, i) =>
        `
        <div data-id-categories="${list_name}" class="categories-cont" >
          <h3 class="best-title">${list_name}</h3>

            <ul class="best-list">
                  <li class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
              <div class="wrapper">          
                        <img class="cover" src="${books[0].book_image}" alt="${
          books[0].title
        }" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
               </div>   
                        <p class="name-book-text">${books[0].title}</p>
                        <p class="author-book-text">${books[0].author}</p>
                      </a>
                  </li>
              

              <li class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
                   <div class="wrapper">     
                        <img class="cover" src="${books[1].book_image}" alt="${
          books[1].title
        }" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                </div>  
                        <p class="name-book-text">${books[1].title}</p>
                        <p class="author-book-text">${books[1].author}</p>
                      </a>
              </li>


              <li class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
                 <div class="wrapper">       
                        <img class="cover" src="${books[2].book_image}" alt="${
          books[2].title
        }" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                </div>  
                        <p class="name-book-text">${books[2].title}</p>
                        <p class="author-book-text">${books[2].author}</p>
                      </a>
              </li>


              <li class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
                  <div class="wrapper">      
                        <img class="cover" src="${books[3].book_image}" alt="${
          books[3].title
        }" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                  </div>
                        <p class="name-book-text">${books[3].title}</p>
                        <p class="author-book-text">${books[3].author}</p>
                      </a>
              </li>

              <li class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
                   <div class="wrapper">     
                        <img class="cover" src="${books[4].book_image}" alt="${
          books[4].title
        }" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                  </div>
                        <p class="name-book-text">${books[4].title}</p>
                        <p class="author-book-text">${books[4].author}</p>
                      </a>
                  
              </li>
</ul>
                   <button class="btn-seemore js-btn-more" id="${
                     i + 1
                   }" type="button">SEE MORE</button>     
                
                </div>  
          `
    )
    .join('');
}
