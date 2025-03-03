import 'bootstrap'
import '@popperjs/core'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'

import { initLoginModal } from './mod/auth.js';
import { initRecordBtn } from './mod/record-btn.js';
import { addIncomingMessage, addOutgoingMessage } from './mod/messages.js';
import { initShareStreamBtn } from './mod/share-btn.js';
import { transcribe } from './mod/transcript.js';
import { askGpt } from './mod/query.js';

const mediaRecorderHolder = {
    myMicMediaRecorder: null,
    tabAudioMediaRecorder: null,
}
let recordedChunks = [];

initLoginModal()
initRecordBtn(startRecording, stopRecording)
initShareStreamBtn(mediaRecorderHolder, onDataAvailable, onStopHandler)

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorder.ondataavailable = onDataAvailable;
        mediaRecorder.onstop = onStopHandler
        mediaRecorderHolder.myMicMediaRecorder = mediaRecorder;
    })
    .catch((error) => {
        console.error('Error while initialize mediaRecorder:', error);
    });

function onDataAvailable(event) {
    if (event.data.size > 0) recordedChunks.push(event.data);
}

// старт записи...
function startRecording() {
    recordedChunks = []; // Сбраcываем массив записанных данных
    console.log('start recording!');
    if (mediaRecorderHolder.tabAudioMediaRecorder) {
        mediaRecorderHolder.tabAudioMediaRecorder.start();
    } else {
        mediaRecorderHolder.myMicMediaRecorder.start();
    }
}

function onStopHandler() {
    const blob = new Blob(recordedChunks, { type: "audio/webm" });
    recordedChunks = []; // Сбразываем массив записанных данных
    console.log('stop recording!');
    const textPromise = transcribe(blob)
    addOutgoingMessage(blob, textPromise);
    textPromise.then((txt) => {
        addIncomingMessage(askGpt(txt));
    });
}

// Остановка записи
function stopRecording() {
    if (mediaRecorderHolder.tabAudioMediaRecorder) {
        mediaRecorderHolder.tabAudioMediaRecorder.stop();
    } else {
        mediaRecorderHolder.myMicMediaRecorder.stop();
    }
}
