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
    <title>Relatórios | Projeto Victoria</title>

    <link rel="stylesheet" href="../CSS/Geral.css">
    <link rel="stylesheet" href="../CSS/Relatorio.css">
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

<body>
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
                                <a href="Dashboard.php" class="rich-link-item">
                                    <span class="item-title">Dashboard Analítico</span>
                                    <span class="item-desc">Monitoramento de fluxo em tempo real.</span>
                                </a>
                                <a href="Relatórios.php" class="rich-link-item">
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
                    <a href="Login.php" class="nav-btn-access" id="btn-login-nav">
                        <i class="fa-solid fa-key"></i> Fazer Login
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
                <span class="hero-subtitle">Inteligência de Dados</span>
                <h1>Relatórios Estatísticos</h1>
                <p>Analise padrões de consumo e gere documentos oficiais do seu sistema Victoria.</p>
            </div>
            </section> <br> <br> <br> <br><br> <br><br> <br>
    
        <div class="dashboard-main-wrapper">
            <div class="dashboard-container">
    
                <header class="dash-internal-header">
                    <div class="dash-title-group">
                        <h2>Central de Análise</h2>
                        <p>Filtre, visualize e exporte seus dados de telemetria.</p>
                    </div>
                    <div class="report-controls">
                        <button class="btn-export" onclick="window.print()">
                            <i class="fa-solid fa-file-pdf"></i> Exportar PDF
                        </button>
                    </div>
                </header>
    
                <section class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-card-content">
                            <div class="stat-icon"><i class="fas fa-chart-area"></i></div>
                            <h4>Média Diária</h4>
                            <div class="stat-value" id="mediaConsumo">0.00 <small>m³</small></div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-content">
                            <div class="stat-icon"><i class="fas fa-arrow-up-wide-short"></i></div>
                            <h4>Pico de Consumo</h4>
                            <div class="stat-value" id="picoConsumo">0.00 <small>m³</small></div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-content">
                            <div class="stat-icon"><i class="fas fa-bullseye"></i></div>
                            <h4>Meta de Economia</h4>
                            <div class="stat-value" id="metaStatus">92<small>%</small></div>
                        </div>
                    </div>
                </section>
    
                <div class="report-content-grid">
                    <section class="glass-inner-panel">
                        <div class="panel-title">
                            <i class="fas fa-chart-bar"></i>
                            <h3>Consumo por Período</h3>
                        </div>
                        <div class="chart-container" style="height: 300px;">
                            <canvas id="chartRelatorioMensal"></canvas>
                        </div>
                    </section>
    
                    <section class="glass-inner-panel">
                        <div class="panel-title">
                            <i class="fas fa-list-check"></i>
                            <h3>Log de Atividades</h3>
                        </div>
                        <div class="table-responsive">
                            <table class="victoria-table">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Leitura</th>
                                        <th>Consumo</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="tabelaRegistros">
                                    <tr>
                                        <td>10/03/2026</td>
                                        <td>142 m³</td>
                                        <td>1.2 m³</td>
                                        <td><span class="badge-ok">Normal</span></td>
                                    </tr>
                                </tbody>
                            </table>
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

    <script src="../JS/Auth.js"></script>
    <script src="../JS/Relatorio.js"></script>
    <script src="../JS/Geral.js"></script>

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