import { Modal } from "bootstrap";

export function renderInviteRegistrationForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const inviteToken = urlParams.get('invite');
  if (inviteToken && !localStorage.getItem('token')) {
    $('body').append(
      `<div class="modal modal-lg" data-bs-backdrop="static" id="reg-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                  <h5 class="modal-title">registration</h5>
                </div>
                <div class="modal-body">
                    <form class="form-login text-center px-5">
                      <div class="input-group mb-3">
                        <span class="input-group-text w-25" id="input-name-desc">name</span>
                        <input id="reg-input-name" type="text" class="form-control" aria-describedby="input-name-desc">
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text w-25" id="input-login-desc">login</span>
                        <input id="reg-input-login" type="text" class="form-control" aria-describedby="input-login-desc">
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text w-25" id="input-password-desc">password</span>
                        <input id="reg-input-password" type="password" class="form-control" aria-describedby="input-password-desc">
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text w-25" id="input-invite-desc">invite_code</span>
                        <input type="text" id="reg-input-invite" class="form-control" value="${inviteToken}" disabled aria-describedby="input-invite-desc">
                      </div>
                      <button id="reg-btn" type="button" class="btn btn-dark">submit</button>
                    </form>
                </div>
            </div>
        </div>    
    </div>`
    )
    $('#reg-btn').on('click', registrationHandler)
    new Modal($('#reg-modal')).show();
  }
}

function registrationHandler() {
  const name = $('#reg-input-name')
  const login = $('#reg-input-login')
  const password = $('#reg-input-password')
  const invite = $('#reg-input-invite')

  fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({
      name: name.val(),
      login: login.val().toLowerCase(),
      password: password.val(),
      invite: invite.val()
    })
  })
    .then(resp => resp.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.reload();
      }
    })
    .catch(error => console.error('Ошибка при регистрации:', error))
    .finally(() => {
      name.val('');
      login.val('');
      password.val('');
      invite.val('');
    });
}