export function parseJwt(token) {
  try {
      // Разделяем токен на части
      const base64Url = token.split('.')[1]; // Получаем Payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Заменяем символы Base64Url на Base64
      const jsonPayload = decodeURIComponent(
          atob(base64) // Декодируем Base64
              .split('')
              .map(function(c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join('')
      ); // Преобразуем в строку

      return JSON.parse(jsonPayload); // Парсим JSON
  } catch (e) {
      console.error('Invalid token', e);
      return null;
  }
}