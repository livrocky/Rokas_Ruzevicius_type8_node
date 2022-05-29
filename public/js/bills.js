import { getFetch } from './modules/fetch.js';

const BASE_URL = 'http://localhost:3003/api';
const token = localStorage.getItem('articleUserToken');
const billsContainerEl = document.querySelector('.billsTableBody');

function makeEl(tagName, text, elClass, dest) {
  const el = document.createElement(tagName);
  el.textContent = text;
  el.className = elClass;
  dest.append(el);
  return el;
}

function renderBill(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((tObj) => {
    const trEl = makeEl('tr', '', '', dest);
    makeEl('td', `${tObj.id}`, '', trEl);
    makeEl('td', `${tObj.description}`, '', trEl);
    makeEl('td', `€ ${tObj.amount}`, '', trEl);
  });
}

// async function getBills(token) {
//   try {
//       const groupID = window.location.search.split('=');
//     const resp = await getFetch(`${BASE_URL}/bills/${groupID[1]}`, token {
//       // headers: {
//       //   Authorization: `Bearer ${token}`,
//       // },
//     });
//     console.log('resp ===', resp);
//     // if (!Array.isArray(resp)) {
//     //   console.log('Your session has expired!');
//     //   window.location.href = 'login.html';
//     // }

//     const dataInJs = await resp.json();
//     console.log('dataInJs ===', dataInJs);
//     renderBill(dataInJs, billsContainerEl);
//     console.log('dataInJs  ===', resp);
//   } catch (error) {
//     console.log('error in get groups ===', error);
//   }
// }
// getBills(token);

async function getBills(userToken) {
  const groupID = window.location.search.split('=');
  const billsArr = await getFetch(`bills/${groupID[1]}`, userToken);
  renderBill(billsArr, billsContainerEl);
}
getBills(token);
