<?php

  if(!function_exists("Protect")){

    function Protect(){

    if(!isset($_SESSION))
      session_start();

    if(!isset($_SESSION['usuario']) || !is_numeric($_SESSION['usuario'])){
      /*header("Location: Login.php");
      exit;*/
      echo "<script>
              alert('Faça o login para continuar.');
              window.location.href = 'Login.php';
            </script>";
      exit;
    }
    }
  }

?>