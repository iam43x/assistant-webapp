import { convertToPCM } from './encode.js';

export async function transcribe(audioBlob) {
  return backendCallToTranscriptions(audioBlob)
    .catch((error) => {
      console.error('Ошибка при отправке аудио:', error);
    });
}

async function convertToPCMAndCallLocalWhisper1(audioBlob) {
  const formData = new FormData();
  const audioBlobPCM = await convertToPCM(audioBlob)
  formData.append('file', audioBlobPCM, 'sample.pcm');
  return fetch('/transcribe', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data.text)
}

function backendCallToTranscriptions(audioBlob) {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-1');
  const token = localStorage.getItem('token');
  return fetch('/v1/transcribe', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.status == 401) localStorage.removeItem('token')
      response.json()
    })
    .then((data) => data.text)
}