/* eslint-disable import/no-useless-path-segments */
import { getFetch } from '../js/modules/fetch.js';

const token = localStorage.getItem('articleUserToken');
// import { renderGroups } from './modules/html.js';

const cardContainerEl = document.querySelector('.cards-container');

function makeEl(tagName, text, dest, elClass = null) {
  const el = document.createElement(tagName);
  el.textContent = text;
  if (elClass) el.className = elClass;
  dest.appendChild(el);
  return el;
}

function createCard(newCardObj) {
  const articleEl = document.createElement('article');

  articleEl.className = 'card-group';
  makeEl('h3', `ID: ${newCardObj.id}`, articleEl);
  makeEl('p', `${newCardObj.name}`, articleEl);

  return articleEl;
}

function renderGroups(cardArr, dest) {
  dest.innerHTML = '';
  cardArr.forEach((cObj) => {
    const card = createCard(cObj);
    dest.append(card);
  });
}

async function getGroups(token) {
  try {
    const groupsArr = await getFetch('groups', token);
    console.log('groupsArr===', groupsArr);
    if (!Array.isArray(groupsArr)) {
      console.log('Your session has expired!');
      //   window.location.href = 'login.html';
    }
    renderGroups(groupsArr, cardContainerEl);
    createCard(groupsArr[0]);
  } catch (error) {
    console.warn('error ===', error);
    console.log('atvaizduojam klaida');
  }
}

getGroups(token);
