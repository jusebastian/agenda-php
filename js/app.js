var agregarContacto = document.getElementById('agregar'); //se obtiene del input submit por medio del id
var formulario = document.getElementById('formulario_crear_usuario'); //se obtiene del forumalario que contiene diferesnte inputs
var action = formulario.getAttribute('action');// se obtiene del atributo action del formulario que enlaza a crear el usuario php con la setencia sql
var divCrear = document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkboxes = document.getElementsByClassName('borrar_contacto');
var botonBorrar = document.getElementById('btn_borrar');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('Existentes');
var inputBuscador = document.getElementById('buscador');
var totalRegistros = document.getElementById('total');
var checkTodo = document.getElementById('borrarTodo');




agregarContacto.addEventListener('click', function(event){ //creando Evento
  event.preventDefault(); //evento cargue antes
  crearUsuario()   //instanciando funcion
});


function crearUsuario(){
  var form_datos = new FormData(formulario);
  for([key, value] of form_datos.entries()) {
    console.log(key + ": "+ value); //imprime los valores que hemos creado para agregar a la base de datos y mostralo en la lista
  }
  var xhr = new XMLHttpRequest(); //creamdo el objeto
  xhr.open('POST', action, true);  //abriendo conexion al servidor
  xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');  //Trabaja con FormData por lo tanto se debe colocar setRequestHeader
  xhr.onreadystatechange = function (){
    if(xhr.readyState == 4 && xhr.status == 200){
       var resultado = xhr.responseText;
       console.log(resultado);
       var json = JSON.parse(resultado); //utilizamos json. parse para leer lo que nos devuelve como respuesta del archivo crear .php
       if(json.respuesta == true){//acedemos a cada una de las variables que tiene dentro del
          //json como una array por medio de un json.varaviable
         //instanciando funcion
         registroExitoso(json.nombre); //accedemos a otras funcion si la repuesta de conexion o sentencia que hacemos en  la base de datos es verdadera
         construirTemplate(json.nombre,json.numero,json.id);
         var totalActualizado = parseInt(totalRegistros.textContent) + 1;
         totalRegistros.innerHTML = totalActualizado;

       }
    }
  }
  xhr.send(form_datos);
}


/**
 * Funcion: Verifica que el registro se ha creado he imprime un mensaje de verificaciòn
 *@Autor:Sebstian Ramirez
 */
 function registroExitoso(nombre){ //recibe como argumento el json que le ingresamos en la funcion crear usuarip

   var divMensaje = document.createElement('DIV'); //Creando dentro del documento un elemento div con su respectivo atributo id
   divMensaje.setAttribute('id',"mensaje");


   var texto = document.createTextNode('Creado:' + " "+ nombre);
   divMensaje.appendChild(texto); //le insertamos el texto con appendChild

   divCrear.insertBefore(divMensaje,divCrear.childNodes[4]);//Agregando el campo de personas creada
   divMensaje.classList.add('mostrar');//mostrar el mensaje de creacion

   setTimeout(function(){
     divMensaje.classList.add('ocultar');
     setTimeout(function(){
       var divPadreMensaje = divMensaje.parentNode;
       divPadreMensaje.removeChild(divMensaje);
     }, 500);
   }, 3000);
   /*setTimeout: se ejecuta en cierta cantidad de tiempo*/
 }

 /**
  * Funcion: Para crear una template donde va a mostrar los datos que se ha almacenado en la BD
  * datos como nombre telefono y id o insertarlos dinamicamente se recarga sola la pagina
  *sin recargar e ir a otra
  *@Autor:Sebstian Ramirez
  */

  function construirTemplate(nombre, numero, registro_id){


    //MANIPULANDO EL DOM para crear un formulario sin necesidad de etiquetas html
    //crear Nombre de contacto
    var tdNombre = document.createElement('TD');
    var textoNombre = document.createTextNode(nombre);
    var parrafoNombre = document.createElement('P');
    parrafoNombre.appendChild(textoNombre);
    tdNombre.appendChild(parrafoNombre);

    //crear Teléfono de contacto
    var tdNumero = document.createElement('TD');
    var textoNumero = document.createTextNode(numero);
    var parrafoNumero = document.createElement('P');
    parrafoNumero.appendChild(textoNumero);
    tdNumero.appendChild(parrafoNumero);

    //Crear campo editar
    var nodoBtn = document.createElement('A');
    var textoEnlace = document.createTextNode('Editar');
    nodoBtn.appendChild(textoEnlace);
    nodoBtn.href = '#';
    nodoBtn.classList.add('editarBtn');

    //Crear Campo guardar
    var guardarBTN = document.createElement('A');
    var EnlaceGuardar = document.createTextNode('Guardar');
    guardarBTN.appendChild(EnlaceGuardar);
    guardarBTN.href = "#";
    guardarBTN.classList.add('guardarBtn');

    //agregar el boton al td
    var nodotdEditar = document.createElement('TD');
    nodotdEditar.appendChild(nodoBtn);
    nodotdEditar.appendChild(guardarBTN);

    //Creando Checkbox Borrar
    var checkBorrar = document.createElement('INPUT');
    checkBorrar.type = 'checkbox';
    checkBorrar.name = registro_id;
    checkBorrar.classList.add('borrar_contacto');

    //creando td para que contiene checkbox
    var tdCheckbox = document.createElement('TD');
    tdCheckbox.classList.add('borrar');
    tdCheckbox.appendChild(checkBorrar);

    //Creando input Nombre que toma el ultimo valor
    var inputNombre = document.createElement('INPUT');
    inputNombre.type = 'text';
    inputNombre.name = 'contacto_' + registro_id;
    inputNombre.value = nombre;
    inputNombre.classList.add('nombre_contacto');
    tdNombre.appendChild(inputNombre);//agregando al td nombre


    //Creando input Nùmero que toma el ultimo valor
    var inputNumero = document.createElement('INPUT');
    inputNumero.type = "text";
    inputNumero.name = "contacto_" + registro_id;
    inputNumero.value = numero;
    inputNumero.classList.add('numero_contacto');
    tdNumero.appendChild(inputNumero);


    //Creando el tr del contacto donde sotiene todos los demas
    var trContacto = document.createElement('TR');
    trContacto.appendChild(tdNombre);
    trContacto.appendChild(tdNumero);
    trContacto.appendChild(nodotdEditar);
    trContacto.appendChild(tdCheckbox);



    //le pasamos todos los campos a la tabla
    tablaRegistrados.childNodes[3].append(trContacto);

    //llamamos al los metodos cuando se agrega un nuevo usuario incrementa,
    //cuando se va editar un contacto lo edite y guardar lo guarde teniendo una ventaja que no se necesita
    //recagar la página

    actualizarNumero();
    botonEditarContacto();
    botonGuardarContacto(registro_id);
  }



  /**
   * Funcion: Crea el usuario que se inserta dentro de los campos por medio del formulario
   *toma las credenciales que se le da dentro de los campos seleccionados y lo envia al archivo
   *crear para insertarlos dentro de la base de datos
   *@Autor:Sebstian Ramirez
   */

 for(var i = 0 ; i < checkboxes.length; i++){
   checkboxes[i].addEventListener('change', function(){
     if(this.checked){ //establece el estado marcado de una casilla de verificación
       this.parentNode.parentNode.classList.add('activo'); //selecciona el tr que contiene cada uno de los tds
     }else{
       this.parentNode.parentNode.classList.remove('activo');
     }
   });
 }



//===================================================================================================================
// 1.

botonBorrar.addEventListener('click', function(){ //evento boton borrar al selecionar una ciertas checkbox
  checkboxSeleccionados();
});

// 2.
//selecciona los checkboxes seleccionado y se guardar en el arreglo
function checkboxSeleccionados(){
  var contactos = [];
  for(var i = 0; i < checkboxes.length; i++){//for para rellenar el array
    if(checkboxes[i].checked == true){ //establece el estado marcado de una casilla de verificación
      //agregando los check seleccionados con su respectivo id al array
      contactos.push(checkboxes[i].name);
    }
  }
  //creamos funcion para eliminar el contenido seleccionado por un check y un id en este caso contactos que
  //contiene un nùmero de id en el array
  contactosEliminar(contactos);
}

// 3.
//Creando la funcion contactos eliminar con un repectivo parametro u argumento de entrada en este caso son
//los contactos a eliminar
// creando encabezados por metod httprequest  o post o get
function contactosEliminar(contactos){
  //creando el DOM o AJAx
  var xhr = new XMLHttpRequest();
  xhr.open('GET','eliminar.php?id=' + contactos, true);
  console.log('eliminar.php?id=' + contactos);
  xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){ //de acuerdo a este resultado se envia a un responseText
        var resultadoBorrar = xhr.responseText;
        var json = JSON.parse(resultadoBorrar);
        console.log(json);
        if(json.respuesta == false) {
          alert("Seleccione un elemento");
        }else{
          console.log("Resultado:" + resultadoBorrar);
          eliminarHTML(contactos);
          mostrarEliminado();
          //actualizando campo de registrados para saber la cantidad de registro quedan despues de un borrado
          var totalActualizado = parseInt(totalRegistros.textContent) - json.borrado;
          totalRegistros.innerHTML = totalActualizado;
        }
    }
  };
  xhr.send();
}

//Eliminando html del registro sin recargar la pagína
function eliminarHTML(ids_borrados) {
    for(i = 0; i <  ids_borrados.length;i++) {
        var elementoBorrar = document.getElementById(ids_borrados[i]);
        tableBody[0].removeChild(elementoBorrar);
    }
}

function mostrarEliminado() {
  // crear div y agregar id
  var divEliminado = document.createElement('DIV');
  divEliminado.setAttribute('id', 'borrado');

  // agregar texto
  var texto = document.createTextNode('Eliminado de lista de contactos');
  divEliminado.appendChild(texto);

  divExistentes[0].insertBefore(divEliminado, divExistentes[0].childNodes[0]);

  //agregar clase de CSS
  divEliminado.classList.add('mostrar');

  //ocultar el mensaje de creación
  setTimeout(function() {
      divEliminado.classList.add('ocultar');
      setTimeout(function() {
          var divPadreMensaje = divEliminado.parentNode;
          divPadreMensaje.removeChild(divEliminado);
      }, 500 );
  }, 3000);
}

//===========================================================================================================
//Creando evento buscador de contactos
inputBuscador.addEventListener('input', function(){
  ocultarRegistro(this.value); //le pasamos argumentos o parametros haciendo referencia al input donde escribimo lo que se va abuscar
});


//creando funcion ocultarRegistro
function ocultarRegistro(nombre_buscar){

    var registros = tableBody[0].getElementsByTagName('tr');

    //creando objeto de la clase RegExp
    var expresion = new RegExp(nombre_buscar, 'i');//deja que los datos se puedan buscar minuscula y mayuscula

    for(var i = 0; i < registros.length; i++){

      registros[i].style.display = 'none'; //oculta los estilos que se aplicaron al tr
      //no me muestra nada siempre y cuando este buscando ese index

       if(registros[i].childNodes[1].textContent.search(expresion) != -1){
         registros[i].style.display = 'table-row';
       }else if(nombre_buscar == ''){
         registros[i].style.display = 'table-row';
       }

    }

    actualizarNumero();//en el mismo input va a llamar esta funcion entonces a la hora de solicitar el registro se va a actulizar el registro que estoy buscando
/*replace(/\s/g,"")*/

}

//creando funcion para actualizar numero de personas registradas

function actualizarNumero(){
  var registros = tableBody[0].getElementsByTagName('tr');

  var cantidad = 0;
  var ocultar = 0;

  for (var i = 0; i < registros.length; i++) {
    var elementos = registros[i];
    if (elementos.style.display == 'table-row') {
      cantidad++;
      totalRegistros.innerHTML = cantidad;
      //en el caso de escribir un elemento y no contenga
      //un table row me va a restar la canidad de registros por la cantidad de elemento sin encontrar
    }else{

      if(elementos.style.display == 'none'){// se al realizar una consulta no se encuentra en unestilo
        ocultar++;
        if (ocultar == registros.length) {
          ocultar -= registros.length;
          totalRegistros.innerHTML = ocultar;
        }
      }
    }
  }
}
//===========================================================================================================
//Evento seleccionar todo -- Borrar todos los registros
checkTodo.addEventListener('change', function(){
    if(this.checked){
      var todosRegistros = tableBody[0].getElementsByTagName('tr');
      for (var i = 0; i < checkboxes.length; i++) {
       checkboxes[i].checked = true; //selecciona todo los check del input al eliminar
       todosRegistros[i].classList.add('activo'); //les da color
     }
    }else{
      if(this.checked != true){
        var todosRegistros = tableBody[0].getElementsByTagName('tr');
        for (var i = 0; i < checkboxes.length; i++) {
         checkboxes[i].checked = false;
         todosRegistros[i].classList.remove('activo');
        }
      }

  }
});


//===================================================================================================================
document.addEventListener('DOMContentLoaded', function(event){
  botonEditarContacto();
});


//Creando Funcion editar contactos
//recorriendo botones con clases editarBtn
function botonEditarContacto(){
  var btn_editar = tableBody[0].querySelectorAll('.editarBtn');
  for (var i = 0; i < btn_editar.length; i++) {
    btn_editar[i].addEventListener('click', function(){

      //desabilitar los demas campos cuando se requiera de editar uno
      desabilitarEdicion();

      //ir de un hijo a un padre
      var registroActivo = this.parentNode.parentNode;
      registroActivo.classList.add('modo_edicion');
      registroActivo.classList.remove('desactivado');

      //actualizar registro en especifico
      actualizarRegistro(registroActivo.id);

    });
  }
  console.log(btn_editar);
}
//Boton guardar contacto cuando se agrega un nuevo contacto

function botonGuardarContacto(id){
  var btn_guardar = tableBody[0].querySelectorAll('.guardarBtn');
  for(i = 0 ; i < btn_guardar.length; i++){
    btn_guardar[i].addEventListener('click' , function(){
      actualizarRegistro(id);
    });
  }
}



function desabilitarEdicion(){

  var registrosTr = document.querySelectorAll('#registrados tbody tr');
  for(var i = 0; i < registrosTr.length; i++){
    registrosTr[i].classList.add('desactivado');

  }


}


//Actualizar registro
function actualizarRegistro(idRegistroActivo){
  //seleccionar boton guardar por un id en especifico
  var btnGuardar = document.getElementById(idRegistroActivo).getElementsByClassName('guardarBtn');

  btnGuardar[0].addEventListener('click', function(event){
      event.preventDefault();
      //obteniendo el ultimo valor que se le ingrese dentro del input a Nombre
      var inputNuevoNombre = document.getElementById(idRegistroActivo).getElementsByClassName('nombre_contacto');
      var nuevoNombre = inputNuevoNombre[0].value;
      //Obteniendo el utlimo valor que se le ingrese dentro del input a numero
      var inputNuevoNumero = document.getElementById(idRegistroActivo).getElementsByClassName('numero_contacto');
      var nuevoNumero = inputNuevoNumero[0].value;

      //creando objeto
      var contacto = {
        nombre: nuevoNombre,
        numero: nuevoNumero,
        id: idRegistroActivo,
      }

      actualizar_ajax(contacto );
  });
}



function actualizar_ajax(datosContacto){
  //realizando ejecucion ajax
  var jsonContacto = JSON.stringify(datosContacto);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'actualizar_registro.php?datos=' + jsonContacto, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        var resultadoActualizar = xhr.responseText;
        var jsonActualizar = JSON.parse(resultadoActualizar);
        if (jsonActualizar.respuesta == true) {
          var registroActivo = document.getElementById(datosContacto.id);
          //Inserta dinamicamente el nombre
          registroActivo.getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML = jsonActualizar.nombre;
          //Inserta dinamicamente el télefono
          registroActivo.getElementsByTagName('td')[1].getElementsByTagName('p')[0].innerHTML = jsonActualizar.numero;

          console.dir(registroActivo);
          //eliminando boton guardar para mostar el de editar
          registroActivo.classList.remove('modo_edicion');
          habilitarEdicion();
        }else{

        }
    }
  };

  xhr.send();
}


function habilitarEdicion(){

  var registrosTr = document.querySelectorAll('#registrados tbody tr');
  for(var i = 0; i < registrosTr.length; i++){
    registrosTr[i].classList.remove('desactivado');

  }


}
