document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get('erro')) {
    Swal.fire('Erro!', 'Falha ao cadastrar.', 'error');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});