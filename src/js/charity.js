import { charityList } from "./charity_orgs";

function charityInsertImg() {
    const charityListUl = document.querySelector('[data-source="charity_list"]');
    const charityEl = charityList.reduce((acc, imgEl, i) => {
        const ind = `${i < 9 ? '0' : ''}${i + 1} `;
        return acc + `<li class="charity_li">${ind}<a href="${imgEl.url}" target="_blank"><img src="${imgEl.img}" class="charity_brand"></a></li>`;
    }, '');

    charityListUl.insertAdjacentHTML('beforeend', charityEl);
}
charityInsertImg();



function charityScrollImg() {
    const charityListUl = document.querySelector('[data-source="charity_list"]');
    const cardHeight = 52;
    const scrollBtn = document.querySelector('[data-source="charity_scroll"]');


    scrollBtn.addEventListener('click', () => {
        charityListUl.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    })
}
charityScrollImg()

