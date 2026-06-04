<?php
$con = mysqli_connect("sql108.infinityfree.com", "if0_42098659", "gzBqg2hzPEq", "if0_42098659_VictoriaTestDB");
//$con = mysqli_connect("sql108.infinityfree.com", "if0_42098659", "gzBqg2hzPEq", "usuario");

//host name, user name, password, DataBase name

if(!$con){
    die("Erro ao conectar, comece a rezar..");
    echo "erro";
}
?>