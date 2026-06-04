<?php
if (isset($_POST['botao'])) {
  $Senha = $_POST['senha'];
  
  echo "<h3>", "</h3><br><h3>", $Senha, "</h3>";

  echo $Senha;

  $Senha = md5($Senha);



  echo "<br>SEGUNDA PARTE<br>";

    $Verificar = md5($_POST['verificar']);

    if ($Senha == $Verificar){
    echo "Igual<br>";
    echo $Verificar,"<br>", $Senha;
  } else {
    echo "Não é igual<br>";
    echo $Verificar,"<br>", $Senha;
  }
  
}


?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
 
 	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

</head>

<body>

  <div class="container">
    <form action="" method="POST" enctype="multipart/form-data">

      <input type="text" placeholder="verificar" name="verificar">
      <input type="password" placeholder="senha" name="senha">

      <button type="submit" class="btn btn-primary" name="botao">Enviar</button>
      <button type="submit" class="btn btn-primary" name="botao2">Verificar</button>

    </form>

  </div>

</body>
</html>