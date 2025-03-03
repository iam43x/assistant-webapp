import { addAudioElement } from "./audio.js";

let _rootElement = document.getElementById('messages');

const _inMsg = 'p-2 px-3';
const _outMsg = 'm-2 p-2 px-3 bg-light rounded border shadow';
const _msgText = 'lh-1 fs-6 text-muted text-wrap text-break';

export function addIncomingMessage(text) { createBlock(_inMsg, text); }

export function addOutgoingMessage(blob, text) { 
    const msgDiv = createBlock(_outMsg, text);
    addAudioElement(msgDiv, blob);
}

function createBlock(classList, textResponse) {
    const msgDiv = document.createElement('div');
    msgDiv.setAttribute('class', classList);
    const msgTxt = document.createElement('div');
    msgTxt.setAttribute('class', _msgText);
    textResponse.then((txt) => {
        msgDiv.appendChild(msgTxt);
        msgTxt.innerHTML = txt;
    });
    _rootElement.appendChild(msgDiv);
    autoScroll();
    return msgDiv;
}

function autoScroll() {
    _rootElement.scrollTop = _rootElement.scrollHeight;
}