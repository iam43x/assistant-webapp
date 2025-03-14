import { initMedia } from "./record.js";
import { initRecordBtn } from "./record-btn.js";
import { initShareStreamBtn } from "./share-btn.js";
import { initMessages } from "./messages.js";
import { renderModalLogin } from "./login.js";

export function renderContentTbl() {
  const token = localStorage.getItem('token')
  if (token) {
    $('body').append(
      `<div id="content" class="container m-0 mw-100 p-2 px-4">
          <div class="row flex-grow-1 overflow-hidden">
              <div id="video-share-tab" class="col-3 pt-4">
                  <video id="video-stream" class="w-100 h-auto border rounded shadow" autoplay playsinline></video>
                  <div class="text-center">
                      <button id="share-stream-btn" type="button" class="btn btn-dark">share_tab</button>
                      <button id="record-stream-btn" type="button" class="btn btn-dark">record</button>
                  </div>
              </div>
              <div id="messages" class="col-6 border-start border-end border-light border-2 mw-100 overflow-auto position-sticky top-0 vh-100 pt-4"></div>
          </div>
      </div>`
    )
    initMedia()
    initRecordBtn()
    initShareStreamBtn()
    initMessages()
  } else {
    $('body').append(
      `<div id="content" class="container m-0 mw-100 p-2 px-4">
          <div>About Russian IT... my English is suck...maybe maybe 💔</div>
        </div>`
    )
  }
}