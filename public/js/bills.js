import { getFetch } from './modules/fetch.js';
import { clearErrorsArr, checkInput, errorsArr } from './modules/validation.js';

const BASE_URL = 'http://localhost:3003/api';
const token = localStorage.getItem('articleUserToken');
const billsContainerEl = document.querySelector('.billsTableBody');
const formEl = document.querySelector('.addBillForm');
const successMsgEl = document.querySelector('.success-msg');
const errorMsgEl = document.querySelectorAll('.error-msg');
const billTitleEl = document.querySelector('.bills-title');

const groupTitle = window.location.href.split('=')[2].split('%20').join(' ');
billTitleEl.textContent = groupTitle;

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

async function getBills(userToken) {
  const groupID = window.location.search.split('=');
  const billsArr = await getFetch(`bills/${groupID[1]}`, userToken);
  renderBill(billsArr, billsContainerEl);
}
getBills(token);

// _____________________________________________ //

async function fetchBill(group_id, amount, description) {
  console.log('group_id===', group_id);
  const billObj = { group_id, amount, description };
  //   console.log(billObj);
  const resp = await fetch(`${BASE_URL}/bills?group_id=${group_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(billObj),
  });
  const dataInJs = await resp.json();
  //   console.log('dataInJs ===', dataInJs);

  if (dataInJs === 'Bill add') {
    successMsg('Bill successfully added!');
    errroEl.textContent = '';
    // console.log('Bill add');
    formEl.elements.amount.value = '';
    formEl.elements.description.value = '';
    getBills(token);
    handleError('Bill add', true);

    // const { token } = dataInJs;
    // localStorage.setItem('Token', token);

    // window.location.replace('groups.html');
  } else if (dataInJs.error === 'invalid token') {
    clearErrors();
    handleError('Invalid token', false);
    window.location.href = 'login.html';
  } else {
    clearErrors();
    handleError('Bill dnot add', false);
  }
}

function paramsvalue(search) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(search);
}
// -----------------------------------------------------
formEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const groupID = window.location.search.split('=');
  const groupid2 = paramsvalue('group_id');
  const groupName = paramsvalue('groupName');
  console.log('groupName===', groupName);
  console.log('groupid2===', groupid2);
  const billObj = {
    amount: formEl.elements.amount.value.trim(),
    description: formEl.elements.description.value.trim(),
  };
  console.log('billObj ===', billObj);

  // ------------------------------------------------
  clearErrors();
  checkInput(billObj.amount, 'amount', ['required', 'positive']);
  checkInput(billObj.description, 'description', ['required', 'minLength-2', 'maxLength-48']);
  console.log('FE errorsArr ===', errorsArr);
  // --------------------------------------------------
  // jei yra klaidu FE tada nesiunciam uzklausos
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  fetchBill(groupid2, billObj.amount, billObj.description);
  window.location.reload();
  // --------------------------------------------
});

function handleError(msg) {
  errorMsgEl.textContent = '';
  if (typeof msg === 'string') {
    errorMsgEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

function successMsg(msg) {
  successMsgEl.textContent = '';
  if (typeof msg === 'string') {
    successMsgEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((sObj) => {
      const elWithSuccess = formEl.elements[sObj.field];
      elWithSuccess.classList.add('success-msg');
      elWithSuccess.nextElementSibling.textContent = sObj.message;
    });
  }
}

function clearErrors() {
  clearErrorsArr();
  errorMsgEl.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
