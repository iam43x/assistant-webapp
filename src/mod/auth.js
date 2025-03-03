import loginLogo from '../img/login.png'

let _submit
let _modal
let _usernameInput
let _passwordInput

export function initLoginModal() {
    _submit = document.getElementById('login-btn')
    _modal = document.getElementById('login-modal')
    _usernameInput = document.getElementById('login-username-input')
    _passwordInput = document.getElementById('login-password-input')
    _submit.addEventListener('click', loginSubmit)
    document.getElementById('login-img').src = loginLogo
}

function loginSubmit() {
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            username: _usernameInput.value.toLowerCase(),
            password: _passwordInput.value
        })
    })
        .then((resp) => resp.json())
        .then((data) => {
            localStorage.setItem('token', data.token)
        })
        .catch((error) => {
            console.error('Ошибка при авторизации:', error);
        })
        .finally(() => {
            _usernameInput.value = ''
            _passwordInput.value = ''
        });
}

export function showModal() { $('#login-modal').modal('show') }