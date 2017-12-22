<?php

    try {
      require_once('includes/funciones/db_conexion.php');

      $sql = "SELECT * FROM datos";
      $resultado = $con->query($sql);

    } catch (Exception $e) {
      $error = $e->getMessage();
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
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet">
    <title>Agenda PHP</title>
  </head>
  <body>
    <div class="contenedor">
      <h2>Agenda de Contactos</h2>


      <div class="contenido">
        <div id="crear_contacto" class="crear">
          <h3>Nuevo Contacto</h3>
          <form class="agenda  clearfix" action="crear.php" method="post" id="formulario_crear_usuario" >
            <div class="campo">
              <label for="nombre">Nombre:
              <input type="text" name="nombre" id="nombre" placeholder="Nombre..">
              </label>
            </div>
            <div class="campo">
              <label for="numero">Número:
              <input type="tel" name="numero" id="numero" placeholder="Número..">
              </label>
            </div>
              <input type="submit" name="submit" class="button" id="agregar" value="Agregar">
          </form><!--Formulario-->

        </div><!--crear_contacto-->
      </div><!--Contenido-->


      <div class="table-info  Existentes" >
        <h3>Contactos Existentes</h3>
        <div class="buscar">
          <input type="text" name="buscador" id="buscador" class="buscador" placeholder="Buscar contacto">
          <!--<i class="fa fa-search" aria-hidden="true"></i>-->
        </div>
        <p>Registrados: <span id="total"><?php echo $resultado->num_rows; ?></span></p>
        <div >
            <table id="registrados">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Editar</th>
                  <th>
                    <button class="borrar" type="button" name="borrar" id="btn_borrar">Borrar</button>
                    <input type="checkbox" name="borrarTodo" id="borrarTodo" class="borrarTodo">
                  </th>
                </tr>
              </thead>
              <tbody>
                  <?php while($datos = $resultado->fetch_assoc()) {?>
                    <tr id="<?php echo $datos['id_contacto'] ?> ">
                      <td>
                        <p><?php echo $datos['nombre']?></p>
                        <input type="text" class="nombre_contacto" name="contacto_<?php echo $datos['id_contacto']; ?>" value="<?php echo $datos['nombre']; ?>" id="nombre_contacto" >
                      </td>
                      <td>
                        <p><?php echo $datos['numero']?></p>
                        <input type="text" class="numero_contacto" name="contacto_<?php echo $datos['id_contacto']; ?>" value="<?php echo $datos['numero']; ?>" id="numero_contacto" >
                      </td>
                      <td >
                        <a href="#" class="editarBtn"  id="editar"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                        <a href="#" class="guardarBtn" id="guardar"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>
                      </td>
                      <td class="borrar">
                        <input type="checkbox" name="<?php echo $datos['id_contacto'] ?>" class="borrar_contacto"><!--<i class="fa fa-check-square-o" aria-hidden="true"></i>-->
                      </td>
                      <!--<td><a href="eliminar.php?id="><i class="fa fa-trash" aria-hidden="true"></i></a></td>-->
                    </tr>
                  <?php }?>
              </tbody><!---Tbody-->
            </table><!--Table-->
        </div><!--Div-->
      </div><!-- tabla-info-->
      <?php $con->close()?>
    </div><!--Contenedor-->

    <script src="js/app.js"></script>

  </body>
</html>
