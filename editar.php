<?php

  if(isset($_GET['id'])){
    $id = $_GET['id'];

    try {
      require_once "includes/funciones/db_conexion.php";
      $sql = "SELECT * FROM datos WHERE id_contacto = $id";
      $respuesta = $con->query($sql);

    } catch (Exception $e) {
      $error = $e->getMessage();
    }


  }

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale = 1.0">
    <link rel="stylesheet" href="css/main.css">
    <link href="https://fonts.googleapis.com/css?family=Asap|Martel|Piedra" rel="stylesheet">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <title>Agenda PHP</title>
  </head>
  <body>
    <div class="contenedor">
      <h2>Agenda de Contactos</h2>
      <div class="contenido">
        <h3>Editar contacto</h3>


          <form class="agenda  clearfix" action="actualizar_registro.php" method="get" >
            <?php while ($datos = $respuesta->fetch_assoc() ) { ?>
            <div class="campo">
              <label for="nombre">Nombre:
              <input type="text" name="nombre" id="nombre" value="<?php echo $datos['nombre']?>">
              </label>
            </div>
            <div class="campo">
              <label for="numero">Número:
              <input type="tel" name="numero" id="numero" value="<?php echo $datos['numero']?>">
              </label>
            </div>

            <input type="hidden" name="id" value="<?php echo $datos['id_contacto']?>">
            <input type="submit" class="button" id="submit" value="Actualizar">
            <?php } ?>
          </form>


      </div>


    </div>



  </body>
</html>
