export function createFormData(data) {
  let bodyFormData = new FormData();

  for (let key in data) {
    bodyFormData.set(key, data[key]);
  }
  return bodyFormData;
}