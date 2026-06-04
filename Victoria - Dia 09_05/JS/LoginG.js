
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!email || !password) {
                mostrarAlerta('Erro', 'Digite email e senha para continuar.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarAlerta('Erro', 'Digite um email válido.', 'error');
                return;
            }

            try {
                const result = await Auth.login(email, password);
                if (result.success) {
                    mostrarAlerta('Sucesso', 'Login realizado com sucesso!', 'success');
                    setTimeout(() => {
                        window.location.href = 'Inicial.html';
                    }, 1500);
                } else {
                    mostrarAlerta('Erro de Autenticação', result.message, 'error');
                }
            } catch (err) {
                mostrarAlerta('Erro', 'Falha ao processar o login.', 'error');
            }
        });
    }

    const forgotPasswordLinks = document.querySelectorAll('.link-opcoes');
    forgotPasswordLinks.forEach(link => {
        if (link.textContent.includes('Esqueci')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarAlerta(
                    'Recuperar Senha',
                    'A funcionalidade de recuperação de senha ainda não está disponível. Por favor, espere um pouco até a transição de login local para server-side :3 .',
                    'info'
                );
            });
        }
    });
});
