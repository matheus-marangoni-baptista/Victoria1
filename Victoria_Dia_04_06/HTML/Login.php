<?php

include ("../PHP/conexao.php");

session_start();

$erro = array();

if (isset($_POST['email']) && strlen($_POST['email']) > 0){
    $_SESSION['email'] = $con->escape_string($_POST['email']);
    $_SESSION['senha'] = $_POST['senha']; //Verificar aqui depois rapaz

    $sql_code = "SELECT senha, id FROM usuario WHERE email = '$_SESSION[email]'";
    $sql_query = $con->query($sql_code) or die($con->error);
    $dado = $sql_query->fetch_assoc(); //koko ni
    $total = $sql_query->num_rows;

    if($total == 0){
        $erro[] = "Este email não existe no banco de dados";
    } else {
        if (password_verify($_SESSION['senha'], $dado['senha']) ){
            $_SESSION['usuario'] = $dado['id'];
        } else {
            $erro[] = "Senha incorreta";
        }
    }

    if(count($erro) == 0){
        echo "<script>alert('Login efetuado com sucesso');location.href='Inicial.html';</script>";
    }
}
?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Victoria - Login e Acesso ao Sistema">
    <title>Login | Projeto Victoria</title>

    <link rel="stylesheet" href="../CSS/Geral.css">
    <link rel="stylesheet" href="../CSS/Login.css">
    <link rel="stylesheet" href="../CSS/Responsividade.css">

    <link rel="icon" type="image/x-icon" href="../Imagens/Ícones/Victoria.ico">

    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>


    <main class="container-login-centralizado">
        <div class="card-login-split-flutuante">

            <div class="split-coluna-visual-card">
                <div class="bloco-testemunho">
                    <i class="fas fa-quote-left"></i>
                    <h3>"A navegação autônoma transformou a forma como compreendemos a tecnologia."</h3>
                    <p class="autor-testemunho">Projeto Victoria • Engenharia Inovadora</p>
                </div>
            </div>

            <div class="split-coluna-formulario-card">
                <a href="Inicial.html" class="link-voltar"><i class="fas fa-arrow-left"></i> Voltar</a>

                <div class="header-login">
                    <div class="logo-container">
                        <img src="../Imagens/Geral/Victoria.png" alt="Logo Victoria" class="logo-pequena">
                    </div>
                    <h2>Bem-vindo(a) de volta!</h2>
                </div>

                <?php 
                if (count($erro) > 0) {
                    foreach ($erro as $e) {
                        echo "<p style='color:red;'>$e</p>";
                    }
                }
                ?>

                <form class="formulario-login" id="loginForm" method="POST" enctype="multipart/form-data">

                    <div class="campo-form-agrupado">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="seu@email.com" required>
                    </div>

                    <div class="campo-form-agrupado">
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="senha" placeholder="Sua senha" required>
                        <i class="fas fa-eye toggle-password" title="Mostrar senha"></i>
                    </div>

                    <div class="opcoes-adicionais-central">
                        <a href="#" class="link-opcoes">Esqueci minha senha</a>
                        <a href="Cadastro.html" class="link-opcoes">Não tem uma conta? Crie uma agora!</a>
                    </div>

                    <button type="submit" class="botao-submit-card">Entrar no Victoria</button>

                    <div class="separador-card">ou</div>

                    <div class="botao-social-card google desativado">
                        <i class="fab fa-google"></i> Continuar com Google
                        <span class="badge-em-breve">Em breve</span>
                    </div>

                    <div class="botao-social-card microsoft desativado">
                        <i class="fab fa-microsoft"></i> Continuar com Microsoft 365
                        <span class="badge-em-breve">Em breve</span>
                    </div>

                </form>

                <div class="rodape-login-card">
                    <p>&copy; 2026 Projeto Victoria.</p>
                </div>
            </div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../JS/Logins.js"></script>
  <!--  <script src="../JS/Auth.js"></script>
    <script src="../JS/Geral.js"></script>
    <script src="../JS/LoginG.js"></script> -->
</body>

</html>