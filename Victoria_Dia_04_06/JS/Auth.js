const Auth = (() => {
    const USER_KEY = 'Victoria_user';
    const TOKEN_KEY = 'Victoria_token';
    const USERS_STORE = 'Victoria_users';

    const bufToBase64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));

    const base64ToBuf = (b64) => {
        const str = atob(b64);
        const arr = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
        return arr.buffer;
    };

    const generateSalt = (length = 16) => {
        const salt = new Uint8Array(length);
        crypto.getRandomValues(salt);
        return salt.buffer;
    };

    const deriveKey = async (password, salt, iterations = 150000, hash = 'SHA-256', keyLen = 32) => {
        const enc = new TextEncoder();
        const passKey = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']);
        return await crypto.subtle.deriveBits(
            { name: 'PBKDF2', salt: salt instanceof ArrayBuffer ? salt : base64ToBuf(salt), iterations, hash },
            passKey,
            keyLen * 8
        );
    };

    const safeEqual = (buf1, buf2) => {
        if (buf1.byteLength !== buf2.byteLength) return false;
        const a = new Uint8Array(buf1), b = new Uint8Array(buf2);
        let diff = 0;
        for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
        return diff === 0;
    };

    const getUsers = () => JSON.parse(localStorage.getItem(USERS_STORE) || '[]');
    const saveUsers = (users) => localStorage.setItem(USERS_STORE, JSON.stringify(users));

    const register = async (email, password, nome) => {
        try {
            const users = getUsers();
            if (users.some(u => u.email === email)) {
                return { success: false, message: 'Email já registrado no sistema.' };
            }
            if (password.length < 6) {
                return { success: false, message: 'A senha deve conter pelo menos 6 caracteres.' };
            }

            const saltBuf = generateSalt(16);
            const hashBuf = await deriveKey(password, saltBuf);

            const newUser = {
                id: Date.now(),
                nome: nome,
                email: email,
                salt: bufToBase64(saltBuf),
                hash: bufToBase64(hashBuf),
                avatar: '',
                wallpaper: '',
                bio: '',
                cidade: '',
                profissao: '',
                website: '',
                consumoMensal: 0,
                economia: 0,
                eficiencia: 0,
                pontuacao: 0,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            saveUsers(users);

            return { success: true, message: 'Conta criada com sucesso! Por favor, faça login.' };
        } catch (error) {
            return { success: false, message: 'Erro ao processar cadastro.' };
        }
    };

    const login = async (email, password) => {
        try {
            const users = getUsers();
            const user = users.find(u => u.email === email);
            if (!user) return { success: false, message: 'Email ou senha inválidos.' };

            const hashBuf = await deriveKey(password, base64ToBuf(user.salt));
            const storedHashBuf = base64ToBuf(user.hash);

            if (!safeEqual(hashBuf, storedHashBuf)) {
                return { success: false, message: 'Email ou senha inválidos.' };
            }

            const token = btoa(JSON.stringify({ id: user.id, email: user.email, timestamp: Date.now() }));

            localStorage.setItem(USER_KEY, JSON.stringify({
                id: user.id,
                nome: user.nome,
                email: user.email,
                avatar: user.avatar,
                wallpaper: user.wallpaper || '',
                bio: user.bio || '',
                cidade: user.cidade || '',
                profissao: user.profissao || '',
                website: user.website || '',
                consumoMensal: user.consumoMensal || 0,
                economia: user.economia || 0,
                eficiencia: user.eficiencia || 0,
                pontuacao: user.pontuacao || 0,
                dataCadastro: user.createdAt || new Date().toISOString()
            }));

            localStorage.setItem(TOKEN_KEY, token);

            return { success: true, user };
        } catch (error) {
            return { success: false, message: 'Erro ao processar login.' };
        }
    };

    const logout = () => {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        return { success: true };
    };

    const getCurrentUser = () => {
        try {
            const userStr = localStorage.getItem(USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        } catch (e) { return null; }
    };

    const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY);

    const updateAvatar = (avatarData) => {
        try {
            const user = getCurrentUser();
            if (!user) return { success: false };

            const users = getUsers();
            const index = users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                users[index].avatar = avatarData;
                saveUsers(users);

                user.avatar = avatarData;
                localStorage.setItem(USER_KEY, JSON.stringify(user));
                return { success: true, user };
            }
            return { success: false };
        } catch (error) { return { success: false }; }
    };

    const updateProfile = (profileData) => {
        try {
            const user = getCurrentUser();
            if (!user) return { success: false, message: 'Usuário não autenticado' };

            const users = getUsers();
            const index = users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                users[index].nome = profileData.nome || users[index].nome;
                users[index].bio = profileData.bio || '';
                users[index].cidade = profileData.cidade || '';
                users[index].profissao = profileData.profissao || '';
                users[index].website = profileData.website || '';
                users[index].dataCadastro = users[index].dataCadastro || new Date().toISOString();

                saveUsers(users);

                const updatedUser = {
                    id: user.id,
                    nome: users[index].nome,
                    email: user.email,
                    avatar: user.avatar,
                    wallpaper: user.wallpaper || '',
                    bio: users[index].bio,
                    cidade: users[index].cidade,
                    profissao: users[index].profissao,
                    website: users[index].website,
                    consumoMensal: user.consumoMensal || 0,
                    economia: user.economia || 0,
                    eficiencia: user.eficiencia || 0,
                    pontuacao: user.pontuacao || 0,
                    dataCadastro: users[index].dataCadastro
                };

                localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
                return { success: true, user: updatedUser };
            }
            return { success: false, message: 'Usuário não encontrado' };
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            return { success: false, message: 'Erro ao atualizar perfil' };
        }
    };

    return { register, login, logout, getCurrentUser, isAuthenticated, updateAvatar, updateProfile };
})();

function checkAuthOnPageLoad() {
    const currentPage = window.location.pathname.toLowerCase();

    const paginasPublicas = [
        'inicial.html',
        'login.html',
        'cadastro.html',
        'sobre.html',
        'Metodologia.html',
        'documentacao.html',
        'referencias.html',
        'protocolos.html',
        'hardware.html',
        '/'
    ];

    const paginasProtegidas = [
        'dashboard.html',
        'relatórios.html',
        'relatorios.html'
    ];

    const ehPaginaProtegida = paginasProtegidas.some(pagina =>
        currentPage.includes(pagina)
    );

    if (ehPaginaProtegida && !Auth.isAuthenticated()) {
        Swal.fire({
            title: 'Acesso Restrito',
            html: '<p style="font-size: 1rem; color: #333;">Esta página requer autenticação.</p><p style="font-size: 0.9rem; color: #666;">Por favor, faça login para continuar.</p>',
            icon: 'warning',
            confirmButtonText: 'Ir para Login',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                const popup = Swal.getPopup();
                const btnVoltar = document.createElement('button');
                btnVoltar.textContent = 'Voltar';
                btnVoltar.className = 'swal2-cancel swal2-styled';
                btnVoltar.style.marginRight = '10px';
                btnVoltar.onclick = () => {
                    window.history.back();
                    Swal.close();
                };
                popup.querySelector('.swal2-actions').insertBefore(btnVoltar, popup.querySelector('.swal2-confirm'));
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'Login.html';
            }
        });
        return;
    }

    if ((currentPage.includes('login.html') || currentPage.includes('cadastro.html')) && Auth.isAuthenticated()) {
        window.location.href = 'Inicial.html';
    }
}

document.addEventListener('DOMContentLoaded', checkAuthOnPageLoad);