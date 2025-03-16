export async function transcribe(audioBlob) {
  return backendCallToTranscriptions(audioBlob)
    .catch((error) => {
      console.error('Ошибка при отправке аудио:', error);
    });
}

function backendCallToTranscriptions(audioBlob) {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-1');
  const token = localStorage.getItem('token');
  return fetch('/api/v1/transcribe', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then(response => response.json())
    .then(data => data.text)
}