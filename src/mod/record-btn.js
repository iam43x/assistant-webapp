import { startRecording, stopRecording } from "./record.js";

let _element;
let _recording;

export function initRecordBtn() {
  _element = $('#record-stream-btn');
  _recording = false;
  _element.on('click', onClickHandler);
  // init keydown handler
  document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
      onClickHandler()
    }
  });
}

function onClickHandler() {
  if (_recording) {
    _recording = false;
    stopRecording();
    stop();
  } else {
    _recording = true;
    startRecording();
    start();
  }
}

function start() {
  _element.text('stop');
  _element.attr('class', 'btn btn-danger');
}

function stop() {
  _element.text('rec');
  _element.attr('class', 'btn btn-dark');
}