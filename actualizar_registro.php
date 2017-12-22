<?php

  function peticion_ajax() {
      return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
   }

   $datos = $_GET['datos'];
   $datos = json_decode($datos, true); //le pasamos la variable a convertir y luego siquiere ser un array asosiativo
   $nombre = $datos['nombre'];
   $numero = $datos['numero'];
   $id = $datos['id'];


  if (peticion_ajax()){
      //pasando llave y valor
      try {
        require_once "includes/funciones/db_conexion.php";
        $sql = "UPDATE datos SET nombre = '$nombre', numero = '$numero' WHERE id_contacto = '$id'" ;
        $respuesta = $con->query($sql);

        //pasando de array a json
        echo json_encode(array(
            'respuesta'=> $respuesta,
            'nombre' => $nombre,
            'numero' => $numero,
            'id'=> $id
        ));

      } catch (Exception $e) {
        $error = $e->getMessage();
      }

      $con->close();
  }else{
    exit;
  }



 ?>
