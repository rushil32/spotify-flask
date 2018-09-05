export function showModal(name) {
  window.$(`#${name}`).modal('show');
}

export function initTooltips() {
  window.$('[data-toggle="tooltip"]').tooltip();
}