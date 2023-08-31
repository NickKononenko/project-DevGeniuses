import { charityList } from "./charity_orgs";

const charityWrapper = document.querySelector('[data-source="charity_section"]');
const charityListUl = document.querySelector('.charity_list_ul')

const charityEl = charityList.reduce((acc, imgEl, i) => {

    const ind = `${i < 9 ? '0' : ''}${i + 1}`

    return acc + `<li class="charity_style">${ind}<a href="${imgEl.url}"><img src="${imgEl.img}" class="charity_brand"></a></li>`
}, '')
console.log(charityEl)

charityListUl.insertAdjacentHTML('beforeend', charityEl)