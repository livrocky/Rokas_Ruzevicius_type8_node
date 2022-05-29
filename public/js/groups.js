// /* eslint-disable import/no-useless-path-segments */
// import { getFetch } from '../js/modules/fetch.js';

// const token = localStorage.getItem('articleUserToken');

// const cardContainerEl = document.querySelector('.cards-container');

// function makeEl(tagName, text, dest, elClass) {
//   const el = document.createElement(tagName);
//   el.textContent = text;
//   el.className = elClass;
//   dest.append(el);
//   return el;
// }

// // function createCard(newCardObj) {
// //   const articleEl = document.createElement('article');

// //   articleEl.className = 'card-group';

// //   return articleEl;
// // }

// function renderGroups(cardArr, dest) {
//   dest.innerHTML = '';
//   cardArr.forEach((newCardObj) => {
//     const groupArticleEl = makeEl('article', '', 'card-group', dest);
//     makeEl('h3', `ID: ${newCardObj.group_id}`, groupArticleEl);
//     makeEl('p', `${newCardObj.name}`, groupArticleEl);
//     groupArticleEl.addEventListener('click', () => {
//       window.location.href = `bills.html?group_id=${newCardObj.group_id} + ${newCardObj.name}`;
//     });
//     // const card = createCard(cObj);
//     // dest.append(card);
//   });
// }

// // eslint-disable-next-line no-shadow
// async function getAccounts(token) {
//   try {
//     const groupsArr = await getFetch('accounts', token);
//     console.log('groupsArr===', groupsArr);
//     if (!Array.isArray(groupsArr)) {
//       console.log('Your session has expired!');
//       //   window.location.href = 'login.html';
//     }
//     renderGroups(groupsArr, cardContainerEl);
//     // createCard(groupsArr[0]);
//   } catch (error) {
//     console.warn('error ===', error);
//     console.log('atvaizduojam klaida');
//   }
// }

// getAccounts(token);

// ****************************************** //

import { BASE_URL } from '../js/modules/fetch.js';

const token = localStorage.getItem('articleUserToken');
const cardContainerEl = document.querySelector('.group-container');

function makeEl(tagName, text, elClass, dest) {
  const el = document.createElement(tagName);
  el.textContent = text;
  el.className = elClass;
  dest.append(el);
  return el;
}

function renderGroups(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((cObj) => {
    const groupArticleEl = makeEl('article', '', 'card-group', dest);
    makeEl('h3', `ID: ${cObj.group_id}`, 'card-id', groupArticleEl);
    makeEl('p', `${cObj.name}`, 'card-group-title', groupArticleEl);
    groupArticleEl.addEventListener('click', () => {
      window.location.href = `bills.html?group_id=${cObj.group_id} + ${cObj.name}`;
    });
  });
}

async function getAccounts(token) {
  try {
    const resp = await fetch(`${BASE_URL}/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('resp ===', resp);
    // if (!Array.isArray(resp)) {
    //   console.log('Your session has expired!');
    //   window.location.href = 'login.html';
    // }

    const dataInJs = await resp.json();
    console.log('dataInJs ===', dataInJs);
    renderGroups(dataInJs, cardContainerEl);
    console.log('dataInJs  ===', resp);
  } catch (error) {
    console.log('error in get groups ===', error);
  }
}
getAccounts(token);
