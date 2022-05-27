/* eslint-disable object-curly-newline */
import { BASE_URL } from './modules/fetch.js';
import { clearErrorsArr, checkInput, errorsArr } from './modules/validation.js';

const formEl = document.getElementById('registerForm');
const errorMsg = document.querySelectorAll('.error-msg');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('clicked');

  const formData = {
    name: formEl.elements.name.value.trim(),
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repeatPassword: formEl.elements.repeatPassword.value.trim(),
  };

  clearErrors();

  // TODO front end validation

  checkInput(formData.name, 'name', ['required', 'minLength-2', 'name']);
  checkInput(formData.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(formData.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  checkInput(formData.repeatPassword, 'repeatPassword', ['required', 'minLength-5', 'maxLength-20']);

  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  // 2. palytingi ar sutampa slaptazodziai
  if (formData.password !== formData.repeatPassword) {
    handleError('nesutampa slaptazodziai');
    return;
  }
  registerFetch(formData.name, formData.email, formData.password, formData.repeatPassword);
});

// HANDLE ERROR //

function handleError(msg) {
  errorMsg.textContent = '';
  if (typeof msg === 'string') {
    errorMsg.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
    // if (Array.isArray(msg)) {
    //   msg.forEach((eObj) => {
    //     errorMsg.innerHTML += `${eObj.message}<br>`;
    //   });

    // GRYZTI PATIKRINTI DAR //
  }
}

async function registerFetch(name, email, password, repeatPassword) {
  const registerObj = { name, email, password, repeatPassword };
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    handleError('register success');
    // window.location.href = 'login.html';
  } else {
    handleError(await resp.json());
  }
}

function clearErrors() {
  // errorsArr = [];
  clearErrorsArr();
  errorMsg.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
