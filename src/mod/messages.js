import { addAudioElement } from "./audio.js";
import { marked } from "marked";

let _rootElement;

const _inMsg = 'p-2 px-3';
const _outMsg = 'm-2 p-2 px-3 bg-light rounded border shadow';
const _msgText = 'lh-1 fs-6 text-muted text-wrap text-break';

export function initMessages() {
  _rootElement = $('#messages');
}

export function addIncomingMessage(text) { createBlock(_inMsg, text); }

export function addOutgoingMessage(blob, text) {
  const msgDiv = createBlock(_outMsg, text);
  addAudioElement(msgDiv, blob);
}

function createBlock(classList, textResponse) {
  const msgDiv = $('<div>', { class: classList });
  _rootElement.append(msgDiv);
  textResponse.then((txt) => {
    const txtDiv = $('<div>', { class: _msgText });
    msgDiv.append(txtDiv);
    marked.parse(txt)
      .then(md => txtDiv.append(md));
  });
  autoScroll();
  return msgDiv;
}

function autoScroll() {
  _rootElement.scrollTop = _rootElement.scrollHeight;
}