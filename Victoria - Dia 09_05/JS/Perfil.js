document.addEventListener('DOMContentLoaded', () => {

    if (!Auth.isAuthenticated()) {
        Swal.fire({
            title: 'Acesso Restrito',
            html: '<p style="color: #333; margin-top: 10px;">Você precisa estar logado para acessar seu perfil.</p>',
            icon: 'warning',
            iconColor: '#598392',
            background: 'rgba(255, 255, 255, 0.95)',
            backdrop: 'rgba(0, 0, 0, 0.5)',
            confirmButtonColor: '#124559',
            confirmButtonText: 'Ir para Login',
            allowOutsideClick: false,
            allowEscapeKey: false,
            willClose: () => {
                window.location.href = 'Login.html';
            }
        });
        return;
    }

    const perfilNome = document.getElementById('perfilNome');
    const perfilUsername = document.getElementById('perfilUsername');
    const perfilBio = document.getElementById('perfilBio');
    const perfilCidade = document.getElementById('perfilCidade');
    const perfilProfissao = document.getElementById('perfilProfissao');
    const perfilWebsite = document.getElementById('perfilWebsite');
    const perfilDataCadastro = document.getElementById('perfilDataCadastro');
    const perfilAvatar = document.getElementById('perfilAvatar');
    const perfilBanner = document.getElementById('perfilBanner');

    const btnEditarPerfil = document.getElementById('btnEditarPerfil');
    const btnEditarAvatar = document.getElementById('btnEditarAvatar');
    const btnEditarBanner = document.getElementById('btnEditarBanner');
    const btnFecharModal = document.getElementById('btnFecharModal');
    const btnCancelarEditar = document.getElementById('btnCancelarEditar');
    const btnSalvarWallpaper = document.getElementById('btnSalvarWallpaper');

    const modalEditar = document.getElementById('modalEditar');
    const modalCrop = document.getElementById('modal-crop-foto');
    const modalWallpaper = document.getElementById('modalWallpaper');

    const formEditar = document.getElementById('formEditar');
    const editNome = document.getElementById('editNome');
    const editBio = document.getElementById('editBio');
    const editCidade = document.getElementById('editCidade');
    const editProfissao = document.getElementById('editProfissao');
    const editWebsite = document.getElementById('editWebsite');
    const hintNome = document.getElementById('hintNome');
    const hintBio = document.getElementById('hintBio');

    const statConsumo = document.getElementById('statConsumo');
    const statEconomia = document.getElementById('statEconomia');
    const statEficiencia = document.getElementById('statEficiencia');
    const statPontuacao = document.getElementById('statPontuacao');

    let cropperWallpaper = null;
    const imageElementWallpaper = document.getElementById('imagem-para-cortar-wallpaper');
    const cropperContainerWallpaper = document.getElementById('containerCropperWallpaper');
    const fileWallpaper = document.getElementById('fileWallpaper');

    if (fileWallpaper) {
        fileWallpaper.addEventListener('click', function () {
            this.value = null;
        });
    }

    if (btnEditarBanner) {
        btnEditarBanner.addEventListener('click', (e) => {
            e.stopPropagation();
            if (modalWallpaper) modalWallpaper.classList.add('ativo');
        });
    }

    window.fecharModalWallpaper = function () {
        if (modalWallpaper) {
            modalWallpaper.classList.remove('ativo');
            document.getElementById('urlWallpaper').value = '';

            if (cropperWallpaper) {
                cropperWallpaper.destroy();
                cropperWallpaper = null;
            }
            if (cropperContainerWallpaper) {
                cropperContainerWallpaper.style.display = 'none';
            }
        }
    };

    function carregarImagemNoCropper(source) {
        if (cropperWallpaper) {
            cropperWallpaper.destroy();
        }

        imageElementWallpaper.src = source;
        if (cropperContainerWallpaper) {
            cropperContainerWallpaper.style.display = 'block';
        }

        cropperWallpaper = new Cropper(imageElementWallpaper, {
            aspectRatio: 16 / 9,
            viewMode: 2,
            background: false,
            ready() {
                console.log("Cropper de Wallpaper pronto e dimensionado!");
            }
        });
    }

    function processarArquivoWallpaper(file) {
        if (!file.type.startsWith('image/')) {
            Swal.fire('Erro', 'O arquivo precisa ser uma imagem!', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            carregarImagemNoCropper(e.target.result);

            if (document.getElementById('fileWallpaper')) {
                document.getElementById('fileWallpaper').value = "";
            }
        };
        reader.readAsDataURL(file);
    }

    document.getElementById('urlWallpaper')?.addEventListener('change', function (e) {
        if (e.target.value) carregarImagemNoCropper(e.target.value);
    });

    document.getElementById('fileWallpaper')?.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) processarArquivoWallpaper(file);
    });

    const dropzoneWallpaper = document.getElementById('dropzoneWallpaper');
    if (dropzoneWallpaper) {
        dropzoneWallpaper.addEventListener('click', () => document.getElementById('fileWallpaper').click());

        dropzoneWallpaper.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzoneWallpaper.style.borderColor = '#124559';
            dropzoneWallpaper.style.background = 'rgba(89, 131, 146, 0.1)';
        });

        dropzoneWallpaper.addEventListener('dragleave', () => {
            dropzoneWallpaper.style.borderColor = '#598392';
            dropzoneWallpaper.style.background = '';
        });

        dropzoneWallpaper.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzoneWallpaper.style.borderColor = '#598392';
            dropzoneWallpaper.style.background = '';
            const file = e.dataTransfer.files[0];
            if (file) processarArquivoWallpaper(file);
        });
    }

    if (btnSalvarWallpaper) {
        btnSalvarWallpaper.addEventListener('click', () => {
            let finalData = null;

            if (cropperWallpaper) {

                const canvas = cropperWallpaper.getCroppedCanvas({
                    width: 1920,
                    height: 1080,
                    imageSmoothingEnabled: true,
                    imageSmoothingQuality: 'high',
                });

                finalData = canvas.toDataURL('image/jpeg', 0.7);
            } else {
                finalData = document.getElementById('urlWallpaper').value.trim();
            }

            if (!finalData) {
                Swal.fire('Aviso', 'Selecione uma imagem ou cole uma URL primeiro.', 'warning');
                return;
            }

            const userData = Auth.getCurrentUser();
            if (userData) {
                userData.wallpaper = finalData;
                localStorage.setItem('Victoria_user', JSON.stringify(userData));

                const users = JSON.parse(localStorage.getItem('Victoria_users') || '[]');
                const index = users.findIndex(u => u.id === userData.id);
                if (index !== -1) {
                    users[index].wallpaper = finalData;
                    localStorage.setItem('Victoria_users', JSON.stringify(users));
                }

                if (perfilBanner) {
                    perfilBanner.style.backgroundImage = `url('${finalData}')`;
                }

                fecharModalWallpaper();
                Swal.fire({
                    title: 'Sucesso',
                    text: 'Seu banner foi atualizado!',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });
    }

    document.addEventListener('paste', (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let item of items) {
            if (item.type.startsWith('image/')) {
                const blob = item.getAsFile();

                if (modalWallpaper?.classList.contains('ativo')) {
                    processarArquivoWallpaper(blob);
                } else if (modalCrop?.style.display === 'flex' || modalCrop?.classList.contains('ativo')) {
                    if (window.processarFotoPerfil) window.processarFotoPerfil(blob);
                }
                break;
            }
        }
    });

    function carregarWallpaper() {
        const userData = Auth.getCurrentUser();
        if (userData && userData.wallpaper && perfilBanner) {
            perfilBanner.style.backgroundImage = `url('${userData.wallpaper}')`;
        }
    }

   function carregarDadosUsuario() {
    const userData = Auth.getCurrentUser();
    if (!userData) {
        window.location.href = 'Login.html';
        return;
    }

    console.log('Dados do usuário carregados:', userData);

    const nomeCompleto = userData.nome || 'Usuário';
    if (perfilNome) perfilNome.textContent = nomeCompleto;

    const username = '@' + nomeCompleto.toLowerCase().replace(/\s+/g, '');
    if (perfilUsername) perfilUsername.textContent = username;

    const emailEl = document.getElementById('perfilEmail') || document.querySelector('.user-email');
    if (emailEl) {
        emailEl.textContent = userData.email; 
        emailEl.style.display = 'block';
    }

    if (perfilBio) perfilBio.textContent = userData.bio || 'Adicione uma descrição ao seu perfil';
    if (perfilCidade) perfilCidade.textContent = userData.cidade || 'Cidade não informada';
    if (perfilProfissao) perfilProfissao.textContent = userData.profissao || 'Profissão não informada';

    if (perfilWebsite) {
        if (userData.website && userData.website.trim()) {
            perfilWebsite.href = userData.website;
            perfilWebsite.textContent = userData.website;
            perfilWebsite.style.display = 'inline-flex';
        } else {
            perfilWebsite.style.display = 'none';
        }
    }

    if (perfilDataCadastro) {
        if (userData.dataCadastro) {
            const data = new Date(userData.dataCadastro);
            const mes = data.toLocaleDateString('pt-BR', { month: 'long' });
            const ano = data.getFullYear();
            perfilDataCadastro.textContent = `Membro desde ${mes} de ${ano}`;
        } else {
            perfilDataCadastro.textContent = 'Data não disponível';
        }
    }

    atualizarAvatar(userData);
    carregarEstatisticas(userData);
    carregarAtividade(userData);
}


    function atualizarAvatar(userData) {
        const temFoto = userData.avatar && userData.avatar.length > 50;

        if (temFoto) {
            if (perfilAvatar) perfilAvatar.innerHTML = `<img src="${userData.avatar}" alt="Perfil">`;
        } else {
            if (perfilAvatar) {
                const inicial = userData.nome ? userData.nome.charAt(0).toUpperCase() : '?';
                const corFundo = gerarCorAvatarSegura(userData.email);
                perfilAvatar.innerHTML = `
            <div style="
                background: ${corFundo};
                color: white;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                font-weight: bold;
                font-size: 3.5rem;
                font-family: 'Montserrat', sans-serif;
            ">
                ${inicial}
            </div>
        `;
            }
        }
    }


    function gerarCorAvatarSegura(email) {
        let hash = 0;
        const str = email || "default";
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = Math.abs(hash % 360);
        const s = 65;
        const l = 40;
        return `hsl(${h}, ${s}%, ${l}%)`;
    }


    function carregarEstatisticas(userData) {
        const consumo = userData.consumoMensal || 0;
        const economia = userData.economia || 0;
        const eficiencia = userData.eficiencia || 0;
        const pontuacao = userData.pontuacao || 0;

        if (statConsumo) statConsumo.textContent = `${consumo} L`;
        if (statEconomia) statEconomia.textContent = `${economia} L`;
        if (statEficiencia) statEficiencia.textContent = `${eficiencia}%`;
        if (statPontuacao) statPontuacao.textContent = `${pontuacao} pts`;

        carregarStatusArduino();
    }


    function carregarStatusArduino() {
        let statusArduino = document.getElementById('statusArduino');
        if (!statusArduino) {
            const statsContainer = document.querySelector('.perfil-stats');
            if (statsContainer) {
                statusArduino = document.createElement('div');
                statusArduino.id = 'statusArduino';
                statusArduino.className = 'stat-card';
                statusArduino.style.gridColumn = 'span 1';
                statsContainer.appendChild(statusArduino);
            }
        }

        if (!statusArduino) return;

        const isOnline = false;
        const statusText = isOnline ? 'Online' : 'Offline';
        const statusColor = isOnline ? '#27ae60' : '#e74c3c';
        const statusIcon = isOnline ? 'fa-check-circle' : 'fa-times-circle';

        statusArduino.innerHTML = `
        <div class="stat-icon" style="color: ${statusColor};">
            <i class="fas ${statusIcon}"></i>
        </div>
        <div class="stat-content">
            <p class="stat-label">Arduino</p>
            <p class="stat-value" style="color: ${statusColor};">${statusText}</p>
        </div>
    `;
    }

    function carregarAtividade(userData) {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        activityList.innerHTML = '';

        const dataCadastro = userData.dataCadastro ? new Date(userData.dataCadastro) : new Date();
        const hoje = new Date();
        const diffMs = hoje - dataCadastro;
        const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        let tempoDecorrido = 'Hoje';
        if (diffDias === 1) tempoDecorrido = 'Ontem';
        else if (diffDias > 1 && diffDias < 7) tempoDecorrido = `${diffDias} dias atrás`;
        else if (diffDias >= 7) tempoDecorrido = `${Math.floor(diffDias / 7)} semanas atrás`;

        const activityHTML = `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="activity-content">
                    <p class="activity-title">Conta criada</p>
                    <p class="activity-time">${tempoDecorrido}</p>
                </div>
            </div>
        `;

        activityList.innerHTML = activityHTML;
    }


    if (btnEditarPerfil) {
        btnEditarPerfil.addEventListener('click', () => {
            const userData = Auth.getCurrentUser();
            if (!userData) return;

            editNome.value = userData.nome || '';
            editBio.value = userData.bio || '';
            editCidade.value = userData.cidade || '';
            editProfissao.value = userData.profissao || '';
            editWebsite.value = userData.website || '';

            atualizarHint(editNome, hintNome, 50);
            atualizarHint(editBio, hintBio, 160);

            modalEditar.classList.add('ativo');
        });
    }


    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', () => {
            modalEditar.classList.remove('ativo');
        });
    }

    if (btnCancelarEditar) {
        btnCancelarEditar.addEventListener('click', () => {
            modalEditar.classList.remove('ativo');
        });
    }

    modalEditar.addEventListener('click', (e) => {
        if (e.target === modalEditar) {
            modalEditar.classList.remove('ativo');
        }
    });


    function atualizarHint(input, hint, max) {
        hint.textContent = `${input.value.length}/${max}`;
    }

    if (editNome) {
        editNome.addEventListener('input', () => {
            atualizarHint(editNome, hintNome, 50);
        });
    }

    if (editBio) {
        editBio.addEventListener('input', () => {
            atualizarHint(editBio, hintBio, 160);
        });
    }


    if (formEditar) {
        formEditar.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!editNome.value.trim()) {
                Swal.fire('Erro', 'Nome é obrigatório.', 'error');
                return;
            }

            if (editNome.value.trim().length < 3) {
                Swal.fire('Erro', 'Nome deve ter no mínimo 3 caracteres.', 'error');
                return;
            }

            if (editWebsite.value && !validarURL(editWebsite.value)) {
                Swal.fire('Erro', 'Website deve ser uma URL válida.', 'error');
                return;
            }

            try {
                const result = Auth.updateProfile({
                    nome: editNome.value.trim(),
                    bio: editBio.value.trim(),
                    cidade: editCidade.value.trim(),
                    profissao: editProfissao.value.trim(),
                    website: editWebsite.value.trim()
                });

                if (result.success) {
                    Swal.fire('Sucesso', 'Perfil atualizado com sucesso!', 'success');
                    carregarDadosUsuario();
                    modalEditar.classList.remove('ativo');
                } else {
                    Swal.fire('Erro', result.message, 'error');
                }
            } catch (err) {
                console.error('Erro ao atualizar perfil:', err);
                Swal.fire('Erro', 'Falha ao atualizar perfil.', 'error');
            }
        });
    }


    function validarURL(url) {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    }



    if (btnEditarAvatar) {
        btnEditarAvatar.addEventListener('click', () => {
            if (modalCrop) {
                modalCrop.style.display = 'flex';
            }
        });
    }

    const btnSalvarCrop = document.getElementById('btn-salvar-crop');
    if (btnSalvarCrop) {
        btnSalvarCrop.addEventListener('click', function () {
            setTimeout(() => {
                carregarDadosUsuario();
            }, 500);
        });
    }

    carregarWallpaper();
    carregarDadosUsuario();

});