import { mediaRecorderConfigure, setTabAudioMediaRecorder } from "./record";

let _element;
let _videoStreamElement;
let _sharing;

export function initShareStreamBtn() {
  _element = $('#share-stream-btn');
  _videoStreamElement = $('#video-stream');
  _sharing = false;
  _element.on('click', onClickHandler);
}

function onClickHandler() {
  if (_sharing) {
    setTabAudioMediaRecorder(null);
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
        mediaRecorderConfigure(mediaRecorder)
        setTabAudioMediaRecorder(mediaRecorder);
        stopSharing();
      })
      .catch((err) => {
        console.error("Ошибка захвата экрана:", err);
      });
  }
}

function shareTab() {
  _sharing = false;
  _element.text('share_tab');
  _element.attr('class', 'btn btn-dark');
}

function stopSharing() {
  _sharing = true;
  _element.text('stop');
  _element.attr('class', 'btn btn-danger');
}