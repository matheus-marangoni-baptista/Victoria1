document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('cadastro') === 'sucesso') {
        Swal.fire('Sucesso!', 'Conta criada com sucesso!', 'success');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});