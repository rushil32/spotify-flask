import cookie from 'js-cookie';

export function createFormData(data) {
  const bodyFormData = new FormData();

  for (let key in data) {
    bodyFormData.set(key, data[key]);
  }
  return bodyFormData;
}

export function getRequestOptions(url) {
  return {
    url,
    credentials: 'same-origin'
  };
}

export function getRequestHeader() {
  return {
    Authorization: `Bearer ${cookie.get('access_token')}`,
    'Content-Type': 'application/json',
  };
}
