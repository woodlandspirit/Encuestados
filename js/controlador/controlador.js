/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    if(!pregunta) {swal('Por favor, ingresa una pregunta.'); return;} // Esto evitará que se agreguen preguntas si las mismas están vacías.
    else if(respuestas.every( (respuesta) => !respuesta.textoRespuesta)) {swal('Por favor, ingresa al menos una respuesta para tu pregunta.'); return;} // Esto evitará que se creen preguntas si no tienen respuesta.
    else { this.modelo.agregarPregunta(pregunta, respuestas)}
  },

  borrarPregunta: function() {
    var id = parseInt($('.list-group-item.active').attr('id'));
    if (isNaN(id)){ 
      swal('Debes seleccionar una pregunta para eliminarla.');
      return;
    }
    else if (id != -1) {
      this.modelo.borrarPregunta(id);
    }
  },

  borrarTodasPreguntas: function() {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminadas, no podrás recuperar tus encuestas.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.modelo.borrarTodasPreguntas();
      }
    });
  },

  editarPregunta: function () {
    var id = parseInt($('.list-group-item.active').attr('id'));
    if(isNaN(id)) { 
      swal('Debes seleccionar una pregunta para poder editarla.');
      return;
    } else if (id != -1) {
        swal('Modifica tu pregunta:', {
        content: "input",
        buttons: true
        })
        .then((nuevaPregunta) => {
          if (nuevaPregunta) {
            this.modelo.editarPregunta(id, nuevaPregunta);
          } else {
            swal("Debes declarar el contenido de la pregunta.", {
              icon: "error"
            });
          }
        });
      }
  },

  agregarVoto: function(nombreUsuario, nombrePregunta, respuestaSeleccionada) {
    if (!nombreUsuario) {
      swal('Debes ingresar tu nombre para poder votar.');
      return;
    }
    if (respuestaSeleccionada === undefined) {
      swal('Debes seleccionar una respuesta para poder votar.');
      return;
    }
    else if (nombreUsuario && respuestaSeleccionada) {
      this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
    }
  }
};