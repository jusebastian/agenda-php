<?php

  function peticion_ajax() {
      return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
   }


    $id = htmlspecialchars($_GET['id']);

    try {
      require_once "includes/funciones/db_conexion.php";
      $sql = "DELETE FROM datos WHERE id_contacto IN ($id)"; //se coloca IN para poder seleccionar no solo un id sino varios
      $respuesta = $con->query($sql);

      //Creando un json
       if( peticion_ajax() ){
         echo json_encode(array(
           'respuesta' => $respuesta,
           'borrado' => $con->affected_rows
       ));
       }else{
         exit;
       }

    } catch (Exception $e) {
      $error = $con->getMessage();
    }


 ?>
