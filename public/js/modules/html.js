// function makeEl(tagName, text, dest, elClass = null, src = null) {
//   const el = document.createElement(tagName);
//   el.textContent = text;
//   if (elClass) el.className = elClass;
//   if (src) el.src = src;
//   dest.appendChild(el);
//   return el;
// }

// export function createCard(newCardObj) {
//   const articleEl = document.createElement('article');

//   articleEl.className = 'card-service';
//   makeEl('h3', `${newCardObj.numberplates}`, articleEl);
//   makeEl('p', `${newCardObj.title}`, articleEl);
//   makeEl('hr', '', articleEl, 'hr');
//   makeEl('img', '', articleEl, '', `${newCardObj.image}`);
//   makeEl('hr', '', articleEl, 'hr');

//   // console.log('articleEl ===', articleEl);
//   return articleEl;
// }

// export function renderCards(cardArr, dest) {
//   dest.innerHTML = '';
//   cardArr.forEach((cObj) => {
//     const card = createCard(cObj);
//     dest.append(card);
//   });
// }
