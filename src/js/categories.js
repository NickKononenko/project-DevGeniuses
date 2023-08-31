import axios from "axios";
const refs = {
	select: document.querySelector(".categories"),
}

export async function fetchCategory() {
	const url = "https://books-backend.p.goit.global/books/category-list";

	const { data } = await axios.get(`${url}`);
	return data;
};

fetchCategory().then((breeds) => {
	console.log(breeds);
	create(breeds);
});

function create(arr) {
	const createMarkup = arr.map(
		({ list_name }) =>
			`<li class="categories-list">${list_name}</li>`).join("");
	refs.select.insertAdjacentHTML("beforeend", createMarkup);
}