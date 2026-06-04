<?php
  include 'conexao.php';

	var_dump($_POST);

	if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (!empty($_POST['nome']) && !empty($_POST['email']) && !empty($_POST['password'])) {

			$nome = $_POST['nome'];
			$email = $_POST['email'];
			//$senha = md5(md5($_POST['password']));
			$senha = password_hash($_POST['password'], PASSWORD_DEFAULT);


			$query = "INSERT INTO usuario(nome,email,senha)
			VALUES('$nome','$email','$senha')";

			$result = mysqli_query($con,$query);

			if($result)
			{
				header("Location: ../HTML/Login.php?cadastro=sucesso");
    		exit;
			}
			else
			{
				header("Location: ../HTML/Cadastro.html?erro=1");
			}
		} else {
			echo "Dados vazios - Cadastro ignorado!!";
		}
	} else {
		echo "Acesso Inválido";
	}

?>