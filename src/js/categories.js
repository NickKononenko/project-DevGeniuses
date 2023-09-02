import axios from "axios";
const refs = {
	select: document.querySelector(".categories"),
}
refs.select.addEventListener("click", thisCategories);

function thisCategories(event) {
	const result = event.target;
	// console.log(result.classList.value);

	if (result.classList.value !== "categories-list") {
		return;
	}
	document.querySelector(".uppercase").classList.replace("uppercase", "categories-list");
	result.classList.replace("categories-list", "uppercase");
}


export async function fetchCategory() {
	const url = "https://books-backend.p.goit.global/books/category-list";

	const { data } = await axios.get(`${url}`);
	return data;
};

fetchCategory().then((breeds) => {
	// console.log(breeds);
	create(breeds);
});

function create(arr) {
	const createMarkup = arr.map(
		({ list_name }) =>
			`<li class="categories-list">${list_name}</li>`).join("");
	refs.select.insertAdjacentHTML("beforeend", createMarkup);
}