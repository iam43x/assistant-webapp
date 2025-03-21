export function askGpt(textQuery) {
  const token = localStorage.getItem('token');
  return fetch('/api/v1/ask', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text: textQuery }),
  })
    .then(response => response.json())
    .then(data => data.response)
    .catch(error => console.error('Ошибка при отправке текста:', error));
}