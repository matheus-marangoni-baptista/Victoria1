
document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAgreed = document.querySelector('input[name="terms"]').checked;

            if (!nome || !email || !password || !confirmPassword) {
                mostrarAlerta('Erro', 'Preencha todos os campos obrigatórios.', 'error');
                return;
            }

            if (nome.length < 3) {
                mostrarAlerta('Erro', 'Nome deve ter no mínimo 3 caracteres.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarAlerta('Erro', 'Digite um email válido.', 'error');
                return;
            }

            if (password.length < 6) {
                mostrarAlerta('Erro', 'Senha deve ter no mínimo 6 caracteres.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                mostrarAlerta('Erro', 'As senhas não correspondem.', 'error');
                return;
            }

            if (!termsAgreed) {
                mostrarAlerta('Erro', 'Você deve concordar com os Termos de Serviço.', 'error');
                return;
            }

            try {
                const result = await Auth.register(email, password, nome);
                if (result.success) {
                    mostrarAlerta('Sucesso', 'Cadastro realizado com sucesso! Redirecionando para login...', 'success');
                    setTimeout(() => {
                        window.location.href = 'Login.html';
                    }, 2000);
                } else {
                    mostrarAlerta('Erro de Cadastro', result.message, 'error');
                }
            } catch (err) {
                mostrarAlerta('Erro', 'Falha ao processar o cadastro.', 'error');
            }
        });
    }

    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email && !emailRegex.test(email)) {
                emailInput.style.borderColor = '#ff6b6b';
            } else {
                emailInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
    }

    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            if (passwordInput.value && confirmPasswordInput.value) {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    confirmPasswordInput.style.borderColor = '#ff6b6b';
                } else {
                    confirmPasswordInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            }
        });
    }
});
