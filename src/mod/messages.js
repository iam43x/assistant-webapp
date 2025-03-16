import { marked } from "marked";

let _rootElement;

const _inMsg = 'p-2 px-3';
const _outMsg = 'p-2 px-3 bg-light rounded border shadow';
const _msgText = 'lh-1 fs-6 text-muted text-wrap text-break';

export function initMessages() {
  _rootElement = $('#messages');
}

export function addIncomingMessage(msgCnt, textResponse) {
  const msgDiv = $('<div>', { class: _inMsg });
  msgCnt.append(msgDiv);
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

export function addOutgoingMessage(msgCnt, textResponse) {
  _rootElement.prepend(msgCnt);
  const msgDiv = $('<div>', { class: _outMsg });
  msgCnt.append(msgDiv);
  textResponse.then((txt) => {
    const txtDiv = $('<div>', {
      class: _msgText,
      text: txt,
    });
    msgDiv.append(txtDiv);
  });
  autoScroll();
}

function autoScroll() {
  _rootElement.animate({ scrollTop: 0 }, 'slow');
}