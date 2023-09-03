import axios from "axios";
const refs = {
	select: document.querySelector(".categories"),
	homePage: document.querySelector('.home-page'),
	homePageTitle: document.querySelector('.title-section'),
	homePageWordEnd: document.querySelector('.title-span'),
	categoriesCont: document.querySelector('.categories-cont')

}
refs.select.addEventListener("click", thisCategories);

function thisCategories(event) {
	const result = event.target;

	if (result.classList.value !== "categories-list") {
		return;
	}
	document.querySelector(".uppercase").classList.replace("uppercase", "categories-list");
	result.classList.replace("categories-list", "uppercase");
	const category = document.querySelector(".uppercase").textContent;

	let wordBegin = category.split(" ").slice(0, category.split(" ").length - 1).join(" ");
	let wordEnd = category.split(" ").slice(category.split(" ").length - 1, category.split(" ").length).join(" ");
	console.log(wordBegin);
	console.log(wordEnd);
	if (category == "All categories") {
		wordBegin = "Best Sellers";
		wordEnd = "Books";

	}
	clearPage(wordBegin, wordEnd);
	refs.homePage.classList.replace("home-page", "categories-page");
	fetchCatBooks(category).then((books) => {
		createBooksCard(books)
	});

}


export async function fetchCategory() {
	const url = "https://books-backend.p.goit.global/books/category-list";

	const { data } = await axios.get(`${url}`);
	return data;
};

export async function fetchCatBooks(category) {
	const url = "https://books-backend.p.goit.global/books/category?category="

	const { data } = await axios.get(`${url}${category}`)
	return data
}

fetchCategory().then((breeds) => {
	create(breeds);
});

function create(arr) {
	const createMarkup = arr.map(
		({ list_name }) =>
			`<li class="categories-list">${list_name}</li>`).join("");
	refs.select.insertAdjacentHTML("beforeend", createMarkup);
}


function createBooksCard(arr) {

	const createCard = arr.map(
		({ book_image, author, title }) =>
			`
			<div class="best-list">
                  <div class="categories-direction">
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
                  </div>
				  `
	)
		.join('');
	refs.homePage.insertAdjacentHTML('beforeend', createCard);

}
function clearPage(wordBegin, wordEnd) {
	refs.homePage.innerHTML = ` <h2 class="title-section">
    ${wordBegin} <span class="title-span" > ${wordEnd}</span >
  </h2 >` ;
}