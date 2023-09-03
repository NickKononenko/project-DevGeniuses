import axios from 'axios';

const refs = {
  homePage: document.querySelector('.home-page'),
  // bestItem: document.querySelector('.best-item'),
};

axios.defaults.baseURL = 'https://books-backend.p.goit.global';
function fetchBooks() {
  return axios.get('/books/top-books').then(response => {
    return response.data;
  });
}

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

// function sliceNameBook(value) {
//   const nameBook = document.querySelector('.name-book-text');
//   nameBook;
// }

function createMarkup(arr) {
  return arr
    .map(
      ({ list_name, books }) =>
        `
        <div class="categories-cont">
          <h3 class="best-title">${list_name}</h3>

            <div class="best-list">
                  <div class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
              <div class="wrapper">          
                        <img class="cover" src="${books[0].book_image}" alt="${books[0].title}" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
               </div>   
                        <p class="name-book-text">${books[0].title}</p>
                        <p class="author-book-text">${books[0].author}</p>
                      </a>
                  </div>
              

              <div class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
                   <div class="wrapper">     
                        <img class="cover" src="${books[1].book_image}" alt="${books[1].title}" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                </div>  
                        <p class="name-book-text">${books[1].title}</p>
                        <p class="author-book-text">${books[1].author}</p>
                      </a>
              </div>


              <div class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
                 <div class="wrapper">       
                        <img class="cover" src="${books[2].book_image}" alt="${books[2].title}" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                </div>  
                        <p class="name-book-text">${books[2].title}</p>
                        <p class="author-book-text">${books[2].author}</p>
                      </a>
              </div>


              <div class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
                  <div class="wrapper">      
                        <img class="cover" src="${books[3].book_image}" alt="${books[3].title}" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                  </div>
                        <p class="name-book-text">${books[3].title}</p>
                        <p class="author-book-text">${books[3].author}</p>
                      </a>
              </div>

              <div class="best-item">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">
                   <div class="wrapper">     
                        <img class="cover" src="${books[4].book_image}" alt="${books[4].title}" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                  </div>
                        <p class="name-book-text">${books[4].title}</p>
                        <p class="author-book-text">${books[4].author}</p>
                      </a>
                  
              </div>
</div>
                   <button class="btn-seemore" type="button">SEE MORE</button>     
                
                </div>  
          `
    )
    .join('');
}
