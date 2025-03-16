import loginLogo from '../img/login.png'

let _submit
let _modal
let _usernameInput
let _passwordInput

export function configureLoginModal() {
  _submit = $('#login-btn');
  _modal = $('#login-modal');
  _usernameInput = $('#login-username-input');
  _passwordInput = $('#login-password-input');
  $('#login-img').attr('src', loginLogo);
  _submit.on('click', loginSubmit);
}

function loginSubmit() {
  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      login: _usernameInput.val().toLowerCase(),
      password: _passwordInput.val()
    })
  })
    .then(resp => resp.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.reload();
      }
    })
    .catch(error => console.error('Ошибка при авторизации:', error))
    .finally(() => {
      _usernameInput.val('');
      _passwordInput.val('');
    });
}