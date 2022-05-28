import { BASE_URL, getFetch } from '../js/modules/fetch.js';

const cardContainerEl = document.querySelector('.cards-container');

function createCard(newCardObj) {
  const articleEl = document.createElement('article');

  articleEl.className = 'card-service';
  makeEl('h3', `${newCardObj.numberplates}`, articleEl);
  makeEl('p', `${newCardObj.title}`, articleEl);

  return articleEl;
}

async function getGroups(token) {
  try {
    const groupsArr = await getFetch('accounts', token);
    console.log('groupsArr===', groupsArr);
    if (!Array.isArray(groupsArr)) {
      alert('Your session has expired!');
      window.location.href = 'login.html';
    }

    const groupsArr = await resp.json();
    console.log('groupsArr ===', groupsArr);
    console.log('piesiam korteles');
    renderGroups(groupsArr, cardContainerEl);
    // createCard(servicesArr[0]);
  } catch (error) {
    console.warn('error ===', error);
    console.log('atvaizduojam klaida');
  }
}

getGroups();
