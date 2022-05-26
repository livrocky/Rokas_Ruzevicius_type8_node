const BASE_URL = 'http://localhost:3003';

const formEl = document.getElementById('registerForm');
const errorEl = document.getElementById('err');
console.log('formEl===', formEl);

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('clicked');

  const formData = {
    name: formEl.elements.name.value.trim(),
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repeatPassword: formEl.elements.repeat_password.value.trim(),
  };

  // 2. palytingi ar sutampa slaptazodziai
  if (formData.password !== formData.repeatPassword) {
    handleError('nesutampa slaptazodziai');
    return;
  }
  registerFetch(formData.name, formData.email, formData.password);
});

// HANDLE ERROR //

function handleError(msg) {
  errorEl.textContent = '';
  if (typeof msg === 'string') {
    errorEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      errorEl.innerHTML += `${eObj.message}<br>`;
    });
  }
}

async function registerFetch(name, email, password) {
  const registerObj = { name, email, password };
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    handleError('register success');
  } else {
    handleError(await resp.json());
  }
}
