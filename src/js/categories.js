import axios from "axios";
import { fetchBooksHomePage } from "./home-page";
import { spinnerStartForCategories, spinerStopForCategories } from './spin';
const refs = {
	select: document.querySelector(".categories"),
	homePage: document.querySelector('.home-page'),
	homePageTitle: document.querySelector('.title-section'),
	homePageWordEnd: document.querySelector('.title-span'),
	categoriesCont: document.querySelector('.categories-cont')

}
refs.select.addEventListener("click", thisCategories);

export function thisCategories(event) {
	spinnerStartForCategories();
	const result = event.target;

	if (result.classList.value !== "categories-list") {
		return;
	}
	try {
		document.querySelector(".uppercase").classList.replace("uppercase", "categories-list");
		result.classList.replace("categories-list", "uppercase");
		const category = document.querySelector(".uppercase").textContent;

		let wordBegin = category.split(" ").slice(0, category.split(" ").length - 1).join(" ");
		let wordEnd = category.split(" ").slice(category.split(" ").length - 1, category.split(" ").length).join(" ");
		// console.log(wordBegin);
		// console.log(wordEnd);

		if (category == "All categories") {
			wordBegin = "Best Sellers";
			wordEnd = "Books";
			refs.homePage.classList.replace("categories-page", "home-page");
			fetchBooksHomePage();
		}
		clearPage(wordBegin, wordEnd);
		refs.homePage.classList.replace("home-page", "categories-page");
		fetchCatBooks(category).then((books) => {
			createBooksCard(books)
		});
		spinerStopForCategories();
	}
	catch (error) {
		console.log('catch error', error);
	}

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


export function createBooksCard(arr) {

	const createCard = arr.map(
		({ book_image, _id, author, title }) =>
			`
                  <div class="categories-direction" id="${_id}">
                      <a href="" class="portfolio-link link">
                        <div class="portfolio-thumb">        
                        <img class="cover" src="${book_image}" alt="${title}" loading="lazy" />
                            <p class="overlay">
                            QUICK VIEW
                            </p>
                        </div> 
                        <p class="name-book-text">${title}</p>
                        <p class="author-book-text">${author}</p>
                      </a>
					  </div>
				  `
	)
		.join('');
	document.querySelector(".categories-list-book").insertAdjacentHTML('beforeend', createCard);

}
function clearPage(wordBegin, wordEnd) {
	refs.homePage.innerHTML = ` <h2 class="title-section">
    ${wordBegin} <span class="title-span" > ${wordEnd}</span >
  </h2 >
  <div class="categories-list-book"></div>` ;
}