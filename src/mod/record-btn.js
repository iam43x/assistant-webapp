let _element;
let _startRecording;
let _stopRecording;
let _recording;

export function initRecordBtn(startRecording, stopRecording) {
    _element = document.getElementById('record-stream-btn');
    _startRecording = startRecording;
    _stopRecording = stopRecording;
    _recording = false;
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
    if (_recording) {
        _recording = false;
        _stopRecording();
        stop();
    } else {
        _recording = true;
        _startRecording();
        start();
    }
}

function start() {
    _element.innerHTML = 'Stop';
    _element.setAttribute('class', 'btn btn-danger');
}

function stop() {
    _element.innerHTML = 'Rec';
    _element.setAttribute('class', 'btn btn-dark');
}