import { addIncomingMessage, addOutgoingMessage } from './messages.js';
import { transcribe } from './transcript.js';
import { askGpt } from './query.js';

var _myMicFlag = true;
var _myMicToggle;

const _mediaRecorderHolder = {
  tabAudioMediaRecorder: null,
  myMicMediaRecorder: null,
}
let _recordedChunks;

export function setTabAudioMediaRecorder(value) {
  _mediaRecorderHolder.tabAudioMediaRecorder = value;
}

export function initMedia() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderConfigure(mediaRecorder)
      _mediaRecorderHolder.myMicMediaRecorder = mediaRecorder;
    })
    .catch((error) => {
      console.error('Error while initialize mediaRecorder:', error);
    });
}

export function mediaRecorderConfigure(mediaRecorder) {
  mediaRecorder.ondataavailable = onDataAvailable;
  mediaRecorder.onstop = onStopHandler
}

function onDataAvailable(event) {
  if (event.data.size > 0) _recordedChunks.push(event.data);
}

function onStopHandler() {
  const blob = new Blob(_recordedChunks, { type: "audio/webm" });
  _recordedChunks = []; // Сбразываем массив записанных данных
  const textPromise = transcribe(blob)
  const msg = $('<div>')
  addOutgoingMessage(msg, textPromise);
  textPromise.then((txt) => {
    addIncomingMessage(msg, askGpt(txt));
  });
}

// старт записи...
export function startRecording() {
  _myMicToggle.prop('disabled', true);
  _recordedChunks = []; // Сбраcываем массив записанных данных
  if (_mediaRecorderHolder.tabAudioMediaRecorder && _myMicFlag) {
    _mediaRecorderHolder.tabAudioMediaRecorder.start();
  } else {
    _mediaRecorderHolder.myMicMediaRecorder.start();
  }
}

// Остановка записи
export function stopRecording() {
  if (_mediaRecorderHolder.tabAudioMediaRecorder && _myMicFlag) {
    _mediaRecorderHolder.tabAudioMediaRecorder.stop();
  } else {
    _mediaRecorderHolder.myMicMediaRecorder.stop();
  }
  _myMicToggle.prop('disabled', false);
}

export function myMicToggle() {
  _myMicToggle = $('#my-mic-toggle')
  _myMicToggle.on('change', function() {
    if (_myMicFlag) {
      _myMicFlag = false;
    } else {
      _myMicFlag = true;
    }
  });
}