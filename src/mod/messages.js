import { marked } from "marked";
import { addAudioElement } from "./audio.js";

let _rootElement;

const _inMsg = 'p-2 px-3';
const _outMsg = 'p-2 px-3 bg-light rounded border shadow';
const _msgText = 'mt-2 lh-1 fs-6 text-muted text-wrap text-break';

export function initMessages() {
  _rootElement = $('#messages');
}

export function addIncomingMessage(textResponse) {
  const msgDiv = $('<div>', { class: _inMsg });
  _rootElement.append(msgDiv);
  textResponse.then((txt) => {
    const txtDiv = $('<div>', { class: _msgText });
    if (txt) {
      txtDiv.html(
        marked.parse(txt)
      );
    }
    msgDiv.append(txtDiv);
  });
  autoScroll();
}

export function addOutgoingMessage(blob, textResponse) {
  const msgDiv = $('<div>', { class: _outMsg });
  _rootElement.append(msgDiv);
  textResponse.then((txt) => {
    const txtDiv = $('<div>', {
      class: _msgText,
      text: txt,
    });
    msgDiv.append(txtDiv);
  });
  autoScroll();
  addAudioElement(msgDiv, blob);
}

function autoScroll() {
  _rootElement.animate({ scrollTop: _rootElement.scrollHeight }, 500);
}