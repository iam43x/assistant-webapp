import { initMedia, myMicToggle } from "./record.js";
import { initRecordBtn } from "./record-btn.js";
import { initShareStreamBtn } from "./share-btn.js";
import { initMessages } from "./messages.js";
import { Tooltip } from "bootstrap";

export function renderContentTbl() {
  const token = localStorage.getItem('token')
  if (token) {
    $('body').append(
      `<div id="content" class="container m-0 mw-100 p-2 px-4">
          <div class="row flex-grow-1 overflow-hidden">
              <div id="video-share-tab" class="col-3 pt-4">
                  <video id="video-stream" class="w-100 h-auto border rounded shadow" autoplay playsinline></video>
                  <div class="text-center">
                      <button id="share-stream-btn" type="button" class="btn btn-dark">захват_собеса</button>
                      <button id="record-stream-btn" type="button" class="btn btn-dark">запись</button>
                  </div>
              </div>
              <div id="messages" class="col-6 border-start border-end border-light border-2 mw-100 overflow-auto position-sticky top-0 vh-100 pt-4"></div>
              <div id="config-tab" class="col-3 pt-4 d-flex justify-content-center">
                <div class="form-check form-switch">
                  <input id="my-mic-toggle" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked disabled>
                  <label class="form-check-label" for="flexSwitchCheckDefault">Запись с микрофона</label>
                </div>
              </div>
          </div>
      </div>`
    )
    tooltipForRecordBtn()
    initMedia()
    initRecordBtn()
    initShareStreamBtn()
    initMessages()
    myMicToggle()
  } else {
    $('body').append(
      `<div id="content" class="container m-0 mw-100 p-2 px-4">
          <div>About Russian IT... my English is suck...maybe maybe 💔</div>
        </div>`
    )
  }
}

function tooltipForRecordBtn() {
  const recordBtn = $('#record-stream-btn');
  const tooltip = new Tooltip(recordBtn, {
    title: '[Пробел] - начинает / останавливает запись. ',
    placement: 'bottom',
    trigger: 'hover',
    container: 'body',
    animation: true,
    delay: { show: 100, hide: 100 },
  });
  tooltip.show();
  setTimeout(() => tooltip.hide(), 5_000);
}