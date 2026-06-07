<?php
    include "../PHP/Protect.php";
    Protect();
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Victoria - Iluminando caminhos através da tecnologia e inovação.">
    <title>Dashboard | Projeto Victoria</title>

    <link rel="stylesheet" href="../CSS/Geral.css">
    <link rel="stylesheet" href="../CSS/Metodologia.css">
    <link rel="stylesheet" href="../CSS/Dashboard.css">
    <link rel="stylesheet" href="../CSS/Responsividade.css">

    <link rel="icon" type="image/x-icon" href="../Imagens/Ícones/Victoria.ico">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
</head>

<body class="dashboard-page">
    <div id="top"></div>

    <nav class="nav-wrapper">
        <div class="nav-content">
            <a href="Inicial.html" class="brand-logo">
                <img src="../Imagens/Geral/Victoria.png" alt="Logotipo Victoria" class="logo-icon">
            </a>

            <ul class="nav-list-center">
                <li class="nav-item has-dropdown">
                    <a href="#" class="nav-link">
                        <i class="fa-solid fa-droplet nav-icon"></i> Plataforma
                        <svg class="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </a>
                    <div class="mega-menu-wrapper">
                        <div class="mega-menu-inner">
                            <div class="menu-column">
                                <h3><i class="fa-solid fa-chart-line"></i> Telemetria</h3>
                                <a href="Dashboard.html" class="rich-link-item">
                                    <span class="item-title">Dashboard Analítico</span>
                                    <span class="item-desc">Monitoramento de fluxo em tempo real.</span>
                                </a>
                                <a href="Relatórios.html" class="rich-link-item">
                                    <span class="item-title">Relatórios Estatísticos</span>
                                    <span class="item-desc">Consumo médio e picos de vazão.</span>
                                </a>
                            </div>
                            <div class="menu-column">
                                <h3><i class="fa-solid fa-microchip"></i> Arquitetura</h3>
                                <a href="Hardware.html" class="rich-link-item">
                                    <span class="item-title">Especificação de Hardware</span>
                                    <span class="item-desc">Microcontroladores e sensores de precisão.</span>
                                </a>
                                <a href="Protocolos.html" class="rich-link-item">
                                    <span class="item-title">Protocolos IoT</span>
                                    <span class="item-desc">Comunicação e integridade de dados.</span>
                                </a>
                            </div>
                            <div class="menu-column">
                                <h3><i class="fa-solid fa-book"></i> Acadêmico</h3>
                                <a href="Documentação.html" class="rich-link-item">
                                    <span class="item-title">Documentação</span>
                                    <span class="item-desc">Documentação técnica integral do projeto.</span>
                                </a>
                                <a href="Referências.html" class="rich-link-item">
                                    <span class="item-title">Referencial Teórico</span>
                                    <span class="item-desc">Base científica do ecossistema Victoria.</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item"><a href="Metodologia.html" class="nav-link"><i
                            class="fa-solid fa-flask nav-icon"></i>
                        Metodologia</a>
                </li>
                <li class="nav-item"><a href="Sobre.html" class="nav-link"><i
                            class="fa-solid fa-circle-info nav-icon"></i>
                        Sobre o
                        TCC</a></li>
            </ul>

            <div class="nav-right">
                <div class="container-usuario-nav">
                    <a href="../PHP/Logout.php" onclick="return confirm('Deseja fazer logout?');" class="nav-btn-access" id="btn-login-nav">
                        <i class="fa-solid fa-key"></i>Desconectar
                    </a>

                    <div class="perfil-usuario-wrapper" id="wrapper-usuario-logado" style="display: none;">
                        <button class="avatar-trigger-nav" id="btn-avatar-nav">
                            <span class="inicial-avatar">?</span>
                        </button>

                        <div class="dropdown-perfil-glass" id="dropdown-perfil">
                            <div class="dropdown-header">
                                <span class="user-email"></span>
                                <button class="btn-fechar-dropdown" id="fechar-dropdown"><i
                                        class="fas fa-times"></i></button>
                            </div>

                            <div class="dropdown-body-central">
                                <div class="avatar-grande-container">
                                    <span class="inicial-avatar-grande">?</span>
                                    <button class="btn-editar-foto"><i class="fas fa-camera"></i></button>
                                </div>
                                <h3 class="saudacao-usuario"></h3>
                                <a href="Perfil.html" class="btn-gerir-conta">Configurações de Perfil</a>
                            </div>

                            <div class="dropdown-footer">
                                <button class="btn-logout" id="btn-logout">
                                    <i class="fas fa-sign-out-alt"></i> Encerrar Sessão
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

<main>
    <section class="static-hero">
        <img src="../Imagens/Sobre/Fundo.png" alt="Fundo Dashboard">
        <div class="hero-overlay"></div>
        <div class="hero-text reveal active">
            <span class="hero-subtitle">Economia e Sustentabilidade</span>
            <h1>Dashboard de Controle</h1>
            <p>Monitore seu consumo de água em tempo real com o ecossistema Victoria.</p>
        </div>
    </section> <br> <br> <br> <br><br> <br><br> <br>

    <div class="dashboard-main-wrapper">
        <div class="dashboard-container">

            <header class="dash-internal-header">
                <div class="dash-title-group">
                    <h2>Bem-vindo ao seu Dashboard</h2>
                    <p>Análise detalhada de vazão e tarifação.</p>
                </div>
                <div class="dash-date-badge">
                    <i class="fa-regular fa-calendar-check"></i>
                    <span id="dataAtual">-- de --- de ----</span>
                </div>
            </header>

            <section class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-content">
                        <div class="stat-icon">
                            <i class="fas fa-droplet"></i>
                        </div>
                        <h4>Consumo Mensal</h4>
                        <div class="stat-value" id="dashConsumo">0.00 <small>m³</small></div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-content">
                        <div class="stat-icon">
                            <i class="fas fa-hand-holding-dollar"></i>
                        </div>
                        <h4>Custo Estimado</h4>
                        <div class="stat-value" id="dashCusto">R$ 0,00</div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-content">
                        <div class="stat-icon">
                            <i class="fas fa-leaf"></i>
                        </div>
                        <h4>Sustentabilidade</h4>
                        <div class="stat-value" id="dashEconomia">0 <small>L</small></div>
                    </div>
                </div>
            </section>

            <div class="dash-content-grid">

                <aside class="glass-inner-panel">
                    <div class="panel-title">
                        <i class="fas fa-calculator"></i>
                        <h3>Registro Manual</h3>
                    </div>

                    <form id="formMedicao" class="dash-form">
                        <div class="input-group">
                            <label for="categoriaTarifa">Categoria da Tarifa</label>
                            <select id="categoriaTarifa" class="dash-field" required>
                                <option value="" disabled selected>Selecione a categoria...</option>
                                <option value="Vulneravel">Vulnerável</option>
                                <option value="Social1">Social 1</option>
                                <option value="Social2">Social 2</option>
                                <option value="Residencial">Residencial Comum</option>
                                <option value="Comercial">Comercial / Industrial</option>
                                <option value="Assistencia">Assistência Social</option>
                                <option value="Publica">Pública</option>
                                <option value="Rural">Rural</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label for="leituraAnterior">Leitura Anterior (m³)</label>
                            <input type="number" id="leituraAnterior" min="0" class="dash-field" placeholder="Ex: 120"
                                step="0.001" required>
                        </div>

                        <div class="input-group">
                            <label for="leituraAtual">Leitura Atual (m³)</label>
                            <input type="number" id="leituraAtual" class="dash-field" min="0" placeholder="Ex: 135" step="0.001"
                                required>
                        </div>

                        <button type="submit" class="btn-calculate" id="btnSalvarMedicao">
                            <span class="Texto">Calcular Consumo</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </form>

                    <div id="resultadoDisplay" class="result-box">
                        <div class="result-item">
                            <span class="result-label">Consumo:</span>
                            <span class="result-value" id="resConsumo">0.00 m³</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Água:</span>
                            <span class="result-value" id="resAgua">R$ 0,00</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Esgoto (100%):</span>
                            <span class="result-value" id="resEsgoto">R$ 0,00</span>
                        </div>
                        <div class="result-item total-row">
                            <span class="result-label">Total:</span>
                            <span class="result-value total-value" id="resTotal">R$ 0,00</span>
                        </div>
                        <p id="resInfoExtra" class="res-info-extra"
                            style="font-size: 0.8rem; margin-top: 15px; color: var(--dark-teal);"></p>
                    </div>
                </aside>

                <section class="glass-inner-panel">
                    <div class="panel-title" style="justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <i class="fas fa-chart-line"></i>
                            <h3>Análise de Consumo</h3>
                        </div>
                        <select id="filtroGrafico" class="dash-field" style="width: auto; padding: 8px 15px;">
                            <option value="7">7 dias</option>
                            <option value="30">30 dias</option>
                        </select>
                    </div>

                    <div class="chart-container" style="position: relative; height:350px; width:100%">
                        <canvas id="canvasConsumo"></canvas>
                    </div>
                </section>

            </div>
        </div>
    </div>
</main>

    <footer class="floating-footer">
        <div class="footer-content">
            <div class="footer-logo-area">
                <img src="../Imagens/Geral/Victoria.png" alt="Logo Victoria" class="footer-logo">
                <p>Transformando a forma como você monitora e economiza água com tecnologia inteligente. Desenvolvido
                    como projeto de conclusão de
                    curso.</p>
            </div>

            <div class="footer-links">
                <h4>Recursos</h4>
                <ul>
                    <li><a href="Documentação.html" style="text-decoration: none;">Documentação</a></li>
                    <li><a href="Performance.html" style="text-decoration: none;">Telemetria Real-time</a></li>
                    <li><a href="Status.html" style="text-decoration: none;">Status do Sistema</a></li>
                    <li><a href="Privacidade.html" style="text-decoration: none;">Termos e Ética</a></li>
                </ul>
            </div>

            <div class="footer-contact">
                <h4>Conexão Técnica</h4>
                <p><i class="fa-solid fa-envelope"></i> Qualqueremail@Gmail.com</p>
                <p><i class="fa-solid fa-location-dot"></i> Etec Lauro Gomes</p>
                <p><i class="fa-solid fa-code-branch"></i> Versão do Sistema: v0.0.3 Alpha</p>
            </div>

            <div class="footer-social">
                <h4>Presença Digital</h4>
                <div class="social-icons">
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>

        <a id="backtotop" href="#top" aria-label="Voltar ao topo">
            <i class="fas fa-chevron-up"></i>
        </a>

        <div class="footer-bottom">
            <p>&copy; 2026 Projeto Victoria. Todos os direitos reservados à equipe de desenvolvimento.</p>
        </div>
    </footer>

    <!-- <script src="../JS/Auth.js"></script>-->
    <script src="../JS/Geral.js"></script>
    <script src="../JS/Dashboard.js"></script>

    <div id="modal-crop-foto" class="modal-overlay" style="display: none;">
        <div class="modal-content crop-modal">
            <h2>Atualizar Foto de Perfil</h2>

            <div id="dropzone-avatar" class="dropzone">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <p>Arraste uma imagem, <strong>Cole (Ctrl+V)</strong> ou clique aqui</p>
                <input type="file" id="input-foto-oculto" accept="image/*" style="display: none;">
            </div>

            <div class="cropper-container" style="display: none; width: 100%; max-height: 400px; margin-top: 15px;">
                <img id="imagem-para-cortar" src="" style="max-width: 100%;">
            </div>

            <div class="modal-actions" style="margin-top: 20px;">
                <button id="btn-cancelar-crop" class="btn-secondary">Cancelar</button>
                <button id="btn-salvar-crop" class="btn-primary" style="display: none;">Salvar Foto</button>
            </div>
        </div>
    </div>
</body>

</html>