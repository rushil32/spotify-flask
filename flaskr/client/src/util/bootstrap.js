export function showModal(name) {
  window.$(`#${name}`).modal('show');
}

export function initTooltips() {
  try {
    window.$('[data-toggle="tooltip"]').tooltip();
  } catch(e) {
    console.log('Bootstrap not loaded');
  }
}