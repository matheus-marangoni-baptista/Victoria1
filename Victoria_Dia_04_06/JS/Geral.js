function mostrarAlerta(titulo, texto, icone = 'info') {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: icone,
            iconColor: icone === 'success' ? '#598392' : (icone === 'error' ? '#e63946' : '#ff9800'),
            confirmButtonColor: '#124559',
            background: 'rgba(255, 255, 255, 0.95)',
            backdrop: 'rgba(0, 0, 0, 0.5)',
            customClass: {
                container: 'swal-container-custom',
                popup: 'swal-popup-custom',
                title: 'swal-title-custom'
            },
            didOpen: (popup) => {
                popup.style.zIndex = '10000';
            }
        });
    } else {
        alert(texto);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const navItems = document.querySelectorAll('.nav-item.has-dropdown');
    const btnLoginNav = document.getElementById('btn-login-nav');
    const wrapperUsuario = document.getElementById('wrapper-usuario-logado');
    const btnAvatar = document.getElementById('btn-avatar-nav');
    const dropdownPerfil = document.getElementById('dropdown-perfil');
    const btnLogout = document.getElementById('btn-logout');
    const btnFecharDropdown = document.getElementById('fechar-dropdown');

    const modalCrop = document.getElementById('modal-crop-foto');
    const dropzone = document.getElementById('dropzone-avatar');
    const inputFoto = document.getElementById('input-foto-oculto');
    const imagemParaCortar = document.getElementById('imagem-para-cortar');
    const cropperContainer = document.querySelector('.cropper-container');
    const btnSalvarCrop = document.getElementById('btn-salvar-crop');

    const btnCancelarModal = document.getElementById('btn-cancelar-crop');
    const btnFecharModalX = document.getElementById('btn-fechar-modal-crop');

    let cropperInstance = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.container-box, .section-header, .spec-card, .reveal').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    navItems.forEach(item => {
        const menu = item.querySelector('.mega-menu-wrapper');
        let timeout;

        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 992) {
                clearTimeout(timeout);
                if (menu) {
                    menu.style.display = 'block';
                    void menu.offsetWidth;
                    menu.classList.add('is-visible');
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 992 && menu) {
                timeout = setTimeout(() => {
                    menu.classList.remove('is-visible');
                    setTimeout(() => {
                        if (!menu.classList.contains('is-visible')) menu.style.display = 'none';
                    }, 300);
                }, 200);
            }
        });
    });

    function gerarCorAvatarSegura(email) {
        let hash = 0;
        const str = email || "default";
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = Math.abs(hash % 360);
        return `hsl(${h}, 65%, 40%)`;
    }

    function configurarDadosUsuario() {
        const userData = Auth.getCurrentUser();
        if (!userData) return;

        const inicial = userData.nome ? userData.nome.charAt(0).toUpperCase() : '?';
        const emailEl = document.querySelector('.user-email');
        const saudacaoEl = document.querySelector('.saudacao-usuario');

        if (emailEl) {
            emailEl.textContent = userData.email;
            emailEl.style.textAlign = 'center';
            emailEl.style.display = 'block';
            emailEl.style.width = '100%';
        }
        if (saudacaoEl) {
            saudacaoEl.textContent = `Olá, ${userData.nome.split(' ')[0]}!`;
            saudacaoEl.style.textAlign = 'center';
            saudacaoEl.style.width = '100%';
        }

        const corFundo = gerarCorAvatarSegura(userData.email);
        const temFoto = userData.avatar && userData.avatar.length > 50;

        const htmlAvatar = temFoto
            ? `<img src="${userData.avatar}" alt="Perfil" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`
            : `<div style="background:${corFundo}; color:white; width:100%; height:100%; display:flex; align-items:center; justify-content:center; border-radius:50%; font-weight:bold;">${inicial}</div>`;

        if (btnAvatar) btnAvatar.innerHTML = htmlAvatar;

        const containerGrande = document.querySelector('.avatar-grande-container');
        if (containerGrande) {
            containerGrande.innerHTML = htmlAvatar + `<button class="btn-editar-foto" title="Alterar foto"><i class="fas fa-camera"></i></button>`;
        }
    }

    if (dropzone && inputFoto) {
        dropzone.addEventListener('click', () => {
            inputFoto.click();
        });

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.backgroundColor = 'rgba(89, 131, 146, 0.15)';
            dropzone.style.borderColor = 'var(--soft-periwinkle)';
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.style.backgroundColor = '';
            dropzone.style.borderColor = '';
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.backgroundColor = '';
            dropzone.style.borderColor = '';

            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                processarArquivoComCropper(files[0]);
            } else {
                mostrarAlerta('Erro', 'Por favor, arraste uma imagem válida.', 'error');
            }
        });

        inputFoto.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                processarArquivoComCropper(e.target.files[0]);
            }
        });
    }

    document.addEventListener('paste', (e) => {
        if (modalCrop && modalCrop.style.display !== 'none') {
            const items = e.clipboardData?.items;
            if (items) {
                for (let item of items) {
                    if (item.type.startsWith('image/')) {
                        const blob = item.getAsFile();
                        processarArquivoComCropper(blob);
                        break;
                    }
                }
            }
        }
    });

    function inicializarCropper(imagemSrc) {
        if (cropperInstance) {
            cropperInstance.destroy();
            cropperInstance = null;
        }

        if (dropzone) dropzone.style.display = 'none';

        if (cropperContainer) cropperContainer.style.display = 'block';
        if (imagemParaCortar) {
            imagemParaCortar.src = imagemSrc;

            cropperInstance = new Cropper(imagemParaCortar, {
                aspectRatio: 1,
                viewMode: 1,
                autoCropArea: 0.8,
                responsive: true,
                restore: true,
                guides: true,
                center: true,
                highlight: true,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: true,
                background: true,
                modal: true,

                crop(e) {
                }
            });
        }

        if (btnSalvarCrop) {
            btnSalvarCrop.style.display = 'inline-block';
        }
    }

    function processarArquivoComCropper(file) {
        if (!file.type.startsWith('image/')) {
            mostrarAlerta('Erro', 'Por favor, selecione um arquivo de imagem.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (modalCrop) modalCrop.style.display = 'flex';
            inicializarCropper(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    if (btnSalvarCrop) {
        btnSalvarCrop.addEventListener('click', async () => {
            if (!cropperInstance) {
                Swal.fire('Erro', 'Nenhuma imagem para salvar.', 'error');
                return;
            }

            const textoOriginal = btnSalvarCrop.innerHTML;
            btnSalvarCrop.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
            btnSalvarCrop.disabled = true;

            try {
                const canvas = cropperInstance.getCroppedCanvas({
                    width: 600,
                    height: 600,
                    fillColor: '#fff',
                    imageSmoothingEnabled: true,
                    imageSmoothingQuality: 'high',
                });

                const avatarData = canvas.toDataURL('image/jpeg', 0.7);

                const result = Auth.updateAvatar(avatarData);
                if (result.success) {
                    if (typeof carregarDadosUsuario === 'function') {
                        carregarDadosUsuario();
                    } else if (typeof configurarDadosUsuario === 'function') {
                        configurarDadosUsuario();
                    }

                    Swal.fire('Sucesso', 'Foto atualizada com sucesso!', 'success');
                    fecharModalCrop();
                } else {
                    Swal.fire('Erro', result.message, 'error');
                }
            } catch (err) {
                console.error('Erro ao salvar foto:', err);
                Swal.fire('Erro', 'Não foi possível salvar a imagem.', 'error');
            } finally {
                btnSalvarCrop.innerHTML = textoOriginal;
                btnSalvarCrop.disabled = false;
            }
        });
    }

    if (btnCancelarModal) {
        btnCancelarModal.addEventListener('click', () => {
            fecharModalCrop();
        });
    }

    function fecharModalCrop() {
        if (modalCrop) modalCrop.style.display = 'none';

        if (cropperInstance) {
            cropperInstance.destroy();
            cropperInstance = null;
        }

        if (dropzone) {
            dropzone.style.setProperty('display', 'flex', 'important');
            dropzone.style.setProperty('flex-direction', 'column', 'important');
        }

        if (cropperContainer) cropperContainer.style.display = 'none';
        if (inputFoto) inputFoto.value = '';
        if (btnSalvarCrop) btnSalvarCrop.style.display = 'none';
    }

    if (btnFecharModalX) {
        btnFecharModalX.addEventListener('click', () => {
            fecharModalCrop();
        });
    }

    if (btnAvatar) {
        btnAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdownPerfil) dropdownPerfil.classList.toggle('ativo');
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();

            Swal.fire({
                title: 'Sessão Encerrada',
                html: '<p style="color: #333; margin-top: 10px;">Você deslogou da sua conta.  Até a próxima!</p> ',
                icon: 'success',
                iconColor: '#598392',
                background: 'rgba(255, 255, 255, 0.95)',
                backdrop: 'rgba(0, 0, 0, 0.5)',
                confirmButtonColor: '#124559',
                showConfirmButton: true,
                confirmButtonText: 'Até logo',
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                popup: 'swal-popup-custom',
                title: 'swal-title-custom'
            },
                willClose: () => {
                    window.location.href = 'Inicial.html';
                }
            });
        });
    }

    if (btnFecharDropdown) {
        btnFecharDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdownPerfil) dropdownPerfil.classList.remove('ativo');
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-editar-foto')) {
            if (modalCrop) modalCrop.style.display = 'flex';
        }

        if (dropdownPerfil && dropdownPerfil.classList.contains('ativo')) {
            const clickedInsideDropdown = dropdownPerfil.contains(e.target);
            const clickedAvatar = btnAvatar ? btnAvatar.contains(e.target) : false;

            if (!clickedInsideDropdown && !clickedAvatar) {
                dropdownPerfil.classList.remove('ativo');
            }
        }

        if (e.target.classList.contains('toggle-password')) {
            const input = e.target.previousElementSibling;
            if (input && input.type === 'password') {
                input.type = 'text';
                e.target.classList.remove('fa-eye');
                e.target.classList.add('fa-eye-slash');
            } else if (input && input.type === 'text') {
                input.type = 'password';
                e.target.classList.remove('fa-eye-slash');
                e.target.classList.add('fa-eye');
            }
        }
    });

    if (Auth.isAuthenticated()) {
        if (btnLoginNav) btnLoginNav.style.display = 'none';
        if (wrapperUsuario) wrapperUsuario.style.display = 'flex';
        configurarDadosUsuario();
    } else {
        if (btnLoginNav) btnLoginNav.style.display = 'flex';
        if (wrapperUsuario) wrapperUsuario.style.display = 'none';
    }

});