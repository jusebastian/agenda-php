<?php

  function peticion_ajax() {
         return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
   }

      

      $nombre = htmlspecialchars($_POST['nombre']);
      $numero = htmlspecialchars($_POST['numero']);

    try {
      require_once('includes/funciones/db_conexion.php');

      $sql = ( "INSERT INTO datos (nombre, numero) VALUES ('$nombre', '$numero')");
      $respuesta = $con->query($sql);

      if (peticion_ajax() ) {
          echo json_encode(array( //lo convierte en un json
          'respuesta'=> $respuesta,
          'nombre'=> $nombre,
          'numero' => $numero,
          'id' => $con->insert_id
        ));
      }else{
        exit;
      }

    } catch (Exception $e) {
      $error = $e->getMessage();
    }


  $con->close();

  ?>
