export function createFormData(data) {
  debugger;
  let bodyFormData = new FormData();

  for (let key in data) {
    bodyFormData.set(key, data[key]);
  }
  return bodyFormData;
}