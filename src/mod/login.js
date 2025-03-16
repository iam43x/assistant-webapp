import { configureLoginModal } from "./auth"
import { parseJwt } from "./jwt"

function renderModalLogin() {
  $('body').append(
    `<div class="modal modal-sm fade" id="login-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <form class="form-login text-center">
                      <img id="login-img">
                      <div class="input-group">
                          <span class="input-group-text w-35" id="login-username-span">Username</span>
                          <input type="username" id="login-username-input" class="form-control">
                      </div>
                      <div class="input-group mb-3">
                          <span class="input-group-text w-35" id="login-password-span">Password</span>
                          <input type="password" id="login-password-input" class="form-control">
                      </div>
                      <button id="login-btn" class="btn btn-dark btn-lg btn-block" data-bs-dismiss="modal" type="button">submit</button>
                    </form>
                </div>
            </div>
        </div>    
    </div>`
  )
  configureLoginModal()
}

export function renderLogBtn() {
  const token = localStorage.getItem('token')
  if (token) {
    const jwt = parseJwt(token)
    $('#header').append(
      `<div class="col-2 d-flex justify-content-end">
        <span class="p-2">${jwt.u_name}</span>
        <button id="logout-btn" type="button" class="btn btn-outline-dark mx-2">log_out</button>
      </div>`
    )
    $('#logout-btn').on('click', logoutHandler)
  } else {
    $('#header').append(
      `<div class="col-2 text-end">
        <button type="button" class="btn btn-dark mx-2" data-bs-toggle="modal" data-bs-target="#login-modal">log_in</button>
      </div>`
    )
    renderModalLogin()
  }
}

function logoutHandler() {
  localStorage.removeItem('token')
  window.location.reload()
}