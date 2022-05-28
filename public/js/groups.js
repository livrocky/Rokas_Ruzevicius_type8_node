import { BASE_URL, getFetch } from '../js/modules/fetch.js';

const cardContainerEl = document.querySelector('.cards-container');

function createCard(newCardObj) {
  const articleEl = document.createElement('article');

  articleEl.className = 'card-group';
  makeEl('h3', `${newCardObj.id}`, articleEl);
  makeEl('p', `${newCardObj.name}`, articleEl);

  return articleEl;
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

getGroups();
