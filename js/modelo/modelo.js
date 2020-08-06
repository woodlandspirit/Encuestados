/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  this.recuperar();

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.respuestaVotada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let maxId = -1;
    for(let i = 0; i < this.preguntas.length; ++i){
     if(this.preguntas[i].id > maxId)
       maxId = this.preguntas[i].id;
      }
      return maxId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  // se borra la pregunta seleccionada, dado su id
  borrarPregunta: function(idPregunta) {
    for (let i = 0; i < this.preguntas.length; i++){
      if (this.preguntas[i].id === idPregunta) {
        this.preguntas.splice(i, 1);
        this.guardar();
        this.preguntaEliminada.notificar();
      }
    }
  },

  // se borran todas las preguntas.
  borrarTodasPreguntas: function() {
    this.preguntas = [];
    this.ultimoId = 0;
    this.guardar();
    this.preguntasEliminadas.notificar();
  },

  // permite editar una pregunta concreta.
  editarPregunta: function(idPregunta, nuevaPregunta) {
    for (let i = 0; i < this.preguntas.length; ++i) {
      if (this.preguntas[i].id === idPregunta) {
        this.preguntas[i].textoPregunta = nuevaPregunta;
      };
    }
    this.guardar();
    this.preguntaEditada.notificar();
  },

  // permite sumar un voto a una pregunta concreta.
  agregarVoto: function(nombrePregunta, respuestaSeleccionada) {
    let preguntaVotada = this.preguntas.find(pregunta => pregunta.textoPregunta === nombrePregunta);
    let respuestaElegida = preguntaVotada.cantidadPorRespuesta.find(respuesta => respuesta.textoRespuesta === respuestaSeleccionada);
    respuestaElegida.cantidad++;
    this.guardar();
    this.respuestaVotada.notificar();
  },



  // se guardan localmente las preguntas de la encuesta.
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  // recupera la información almacenada en el navegador.
  recuperar: function() {
      const preguntas = localStorage.getItem('preguntas');
      if (preguntas) {
        this.preguntas = JSON.parse(preguntas);
      }
  }
};