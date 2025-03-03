import { showModal } from "./auth";

const _element = document.getElementById('share-stream-btn');
const _videoStreamElement = document.getElementById('video-stream');
let _onStopHandler;
let _sharing;
let _mediaRecorderHolder;
let _onDataAvailable;

export function initShareStreamBtn(mediaRecorderHolder, onDataAvailable, onStopHandler) {
    _mediaRecorderHolder = mediaRecorderHolder;
    _onDataAvailable = onDataAvailable;
    _onStopHandler = onStopHandler;
    _sharing = false;
    configureElement();
}

function configureElement() {
    _element.addEventListener('click', onClickHandler);
}

function onClickHandler() {
    if (!localStorage.getItem('token')) {
        showModal()
        return
    }
    if (_sharing) {
        _mediaRecorderHolder.tabAudioMediaRecorder = null;
        _videoStreamElement.srcObject = null;
        shareTab();
    } else {
        navigator.mediaDevices.getDisplayMedia({
            video: { displaySurface: "browser" }, // Захватываем вкладку
            audio: true,
        })
            .then(stream => {
                _videoStreamElement.srcObject = new MediaStream(stream.getVideoTracks());
                const audioStream = new MediaStream(stream.getAudioTracks());
                const mediaRecorder = new MediaRecorder(audioStream, { mimeType: "audio/webm" });
                mediaRecorder.ondataavailable = _onDataAvailable;
                mediaRecorder.onstop = _onStopHandler;

                _mediaRecorderHolder.tabAudioMediaRecorder = mediaRecorder;
                stopSharing();
            })
            .catch((err) => {
                console.error("Ошибка захвата экрана:", err);
            });
    }
}

function shareTab() {
    _sharing = false;
    _element.innerHTML = 'Share';
    _element.setAttribute('class', 'btn btn-dark');

}

function stopSharing() {
    _sharing = true;
    _element.innerHTML = 'Stop';
    _element.setAttribute('class', 'btn btn-danger');
}