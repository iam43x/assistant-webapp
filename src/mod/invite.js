import { Modal } from "bootstrap";

export function renderInviteRegistrationForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const inviteToken = urlParams.get('invite');
  if (inviteToken) {
    $('body').append(
      `<div class="modal" data-bs-backdrop="static" id="reg-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                  <h5 class="modal-title">registration</h5>
                </div>
                <div class="modal-body">
                    <form class="form-login text-center px-5">
                      <div class="input-group mb-3">
                        <span class="input-group-text w-50" id="input-name-desc">name</span>
                        <input id="input-name" type="text" class="form-control" aria-describedby="input-name-desc">
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text w-50" id="input-login-desc">login</span>
                        <input id="input-login" type="text" class="form-control" aria-describedby="input-login-desc">
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text w-50" id="input-password-desc">password</span>
                        <input id="input-password" type="password" class="form-control" aria-describedby="input-password-desc">
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text w-50" id="input-invite-desc">invite_code</span>
                        <input type="text" id="input-invite" class="form-control" value="${inviteToken}" disabled aria-describedby="input-invite-desc">
                      </div>
                      <button type="submit" class="btn btn-dark">submit</button>
                    </form>
                </div>
            </div>
        </div>    
    </div>`
    )
    new Modal($('#reg-modal')).show();
  }
}
