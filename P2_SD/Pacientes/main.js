var conexion = ""

var seccionActual = "loginPac"
function cambiarSeccion(seccion){ // cambia a la etiqueta <div> con el id introducido como seccion
    document.getElementById(seccionActual).classList.remove("activa");
    document.getElementById(seccion).classList.add("activa"); // Es lo mismo que hacer .remove() y .add()  comentado arriba !!
    seccionActual=seccion;
}

function salir(){
    cambiarSeccion("loginPac");
    var pintarmensajedelmedico = document.getElementById("mensaje_del_medico")
    pintarmensajedelmedico.innerHTML = ""
    conexion.close();
}

function menu_Principal_Paciente(){  // Por si se tiene que usar en el index directamente sin estar dentro de ninguna otra sección
    cambiarSeccion("menu-Principal-Paciente");
}

function datos_del_medico_paciente(){
    cambiarSeccion("menu-datos-medico");
}

function medicacion_del_paciente(){
    cambiarSeccion("menu-medicacion-paciente");
}


function tomas_del_Paciente(){
    cambiarSeccion("menu-tomas-paciente");
}
////////////////////////////////////////////////////////////////////////////

// Obtenemos una referencia a la aplicación RPC del servidor
var app = rpc("localhost", "AplicacionHector")

// Guardamos los procedimientos que importamos del servidor_rpc.js en variables para poder usarlas.
// Para usarlas debemos introducirles uno, dos, tres, etc. parámetros y un callback(=función)
var login = app.procedure("login");
var listadoMedicamentos = app.procedure("listadoMedicamentos");
var datosMedico = app.procedure("datosMedico");
var medicacion = app.procedure("medicacion");
var listadoTomas = app.procedure("listadoTomas");
var agregarToma =  app.procedure("agregarToma");
var eliminarToma = app.procedure("eliminarToma");


// Creamos variables globales para poder usar cuando sea necesario en la función que necesitemos.
var idPaciente = "";
var lista_Medicamentos = [];
var lista_Medicacion = "";
var datos_Paciente = [];
var lista_Medicos = []; // array todos los médicos
var datos_Medico = {}; // datos del médico según paciente
var lista_Tomas = [];
var listaEntera_de_tomas = [];
var idMedicamento = "";
var fechaTomaActual ="";
var fechaAntigua ="";
var codigoAcceso ="";
var fechasTomas = []
var frecuencia = "";
var fechaActual = "";
var tiempoPasado ="";
var diasPasados="";
var Apintar = "";
var fecha_ultima_Toma="";
var fecha_ultima_Toma_Date =""; // es igual qeu la fecha_ultima_toma pero se ha psadao por la función new Date()
// Creamos las funciones con las que realizacermos la asincronía.

// ******************** Datos Medico **************************************************
function datosDelMedico(){
    var listado_info_medico = document.getElementById("datos-medico");
    listado_info_medico.innerHTML = ""; //vaciamos por si hay algo
    // idMedico debe estar guardado  del login.
    datosMedico(idMedico, function(datosMedico){
        if (datosMedico != null){
            console.log("retorno Medico",datosMedico)
            datos_del_medico_paciente() // cambiamos la sección
            listado_info_medico.innerHTML += 
            "<dt> ID Médico:<b> " + datosMedico.ID + 
            "</b></dt><dd> Nombre: " + datosMedico.Nombre + 
            "</dd><dd> Apellido: " + datosMedico.Apellidos +
            "</dd>";       
        }else{
            alert("No existe el Médico indicado. Inroduce un ID de médico valido 1-5")
        }
    })
}

// ******************** AGREGAMOS LA TOMA **************************************************
function agregamosLaToma(idMedicamento){  
    agregarToma(idPaciente, idMedicamento, function(tomaAgregada){
        if(tomaAgregada != null){
            // fechaDeLaToma_Date = tomaAgregada.fecha_Asignacion;
            lista_Tomas.push(tomaAgregada)
            // console.log("fecha agregada", fechaDeLaToma_Date);
            // var Apintar = document.getElementById("medicamento"+idMedicamento)
            // Apintar.style.backgroundColor = "green"
            // console.log("lista_Tomas Agregadas --> ", lista_Tomas)
            verTomas(idMedicamento)
            pintar(idMedicamento)

            // console.log("fehca toma agregada",tomaAgregada.fecha_Asignacion)
        }
    })

}

// ******************** ELIMINAMOS LA TOMA **************************************************
function eliminamosLaToma(idToma){
    // console.log("La toma", idToma);
    var referencia = document.getElementById("toma"+idToma)
    var idMedicamento = referencia.firstChild.id;
    var fecha = referencia.childNodes[1].id
    // console.log("El paciente", idPaciente);
    // console.log("El medicamento", idMedicamento); // Devuelve IDm de la toma eliminada
    // console.log("La fecha: ", fecha); // Devuelve la fecha de la toma eliminada
    eliminarToma(idPaciente, idMedicamento, fecha, function(tomaEliminada){      
        for(var i in lista_Tomas){
            if(lista_Tomas[i].medicamento == idMedicamento && lista_Tomas[i].fecha_Asignacion == fecha){
                    
                    fechaUltimoElemento = lista_Tomas[lista_Tomas.length - 1].fecha_Asignacion;
                    // console.log("lista_Tomas ante Borrar -->",lista_Tomas)
                    // console.log("fecha_ultima_Toma en borrar",fechaUltimoElemento)
                    lista_Tomas.splice(i, 1); // eliminamos la toma en el local, si no aparece como que aun existe y no pinta bien por que coge una fecha diferente
                    // console.log("lista_Tomas Despues Borrar -->",lista_Tomas)
            }
        }
        verTomas(idMedicamento)
        pintar(idMedicamento) 
    })
}

// ******************** PINTAMOS **************************************************
function pintar(idMedicamento){

    var Apintar = document.getElementById("medicamento"+idMedicamento)
    // console.log("Lista_Tomas",lista_Tomas)
    var ultimoElemento = lista_Tomas[lista_Tomas.length-1]
    // console.log("ultimoElemtoPintar", ultimoElemento);
    var fechaUltimoElemento = ultimoElemento.fecha_Asignacion
    // console.log("fecha ultimoelementoPintar", fechaUltimoElemento);

    fecha_ultima_Toma_Date = new Date(fechaUltimoElemento)
    fechaActual = new Date();
    // console.log("Hoy",fechaActual);
    // console.log("Ultima",fecha_ultima_Toma_Date);
    tiempoPasado =  fechaActual - fecha_ultima_Toma_Date ; // Tiempo transcurrido en ms                   
    // console.log("Tiempo Pasado en ms",tiempoPasado);
    diasPasados = tiempoPasado / (24 * 60 * 60 * 1000); // en dias
    // console.log("Tiempo Pasado en Dias", diasPasados);
    Apintar = document.getElementById("medicamento"+ultimoElemento.medicamento)
    for(var j in lista_Medicacion){
        frecuencia = lista_Medicacion[j].frecuencia;
        if(frecuencia != 0){ 
            if(diasPasados < frecuencia){
                Apintar.style.background = "green"
            }else if(diasPasados >= frecuencia){
                Apintar.style.background = "red"
            }else{Apintar.style.background = "yellow"}
        }else if(frecuencia == 0){  // Frecuencia == 0 es una Toma Única, no se debería poder añadir más de una, por eso lo consideramos como que se la ha tomado ya cuando se le asigna
            Apintar.style.background = "green"
        }
    }
}

// ******************************** Listado Medicamentos *************************
function listadoDeMedicamentos(){
  var nombrePacienteLista = document.getElementById("nombre-Paciente-Medicamentos"); // para poner el texto en el html dinámicamente
  nombrePacienteLista.innerHTML = ""; // vaciamos si hay algo
  lista_Medicamentos = [];
    listadoMedicamentos( function(listadoMedicamentos) {
        // Array de todos los medicamentos.
        lista_Medicamentos = listadoMedicamentos;
        nombrePacienteLista.innerHTML = "Listado Medicamentos de " + datos_Paciente.nombre + " " + datos_Paciente.apellidos //mostramos el nombre del paciente 
    })
}
    
// ******************************** Listado Tomas *************************
var listadoDeTomas = ""
function verTomas(idMedicamento){
    cambiarSeccion("menu-tomas-paciente")
    var zona_Pintar = document.getElementById("tomas-paciente")
    zona_Pintar.innerHTML = ""

    listadoTomas(idPaciente, idMedicamento, (listadoDeTomas)=>{ //************************************************************* TOMAS
        lista_Tomas = listadoDeTomas;
        // console.log("Listado de Tomas en la función", listadoDeTomas);
        if(listadoDeTomas != null){
            if(frecuencia != 0){
                for(var i in listadoDeTomas){
                    zona_Pintar.innerHTML += 
                    "<dl id = toma"+i+">" +
                    "<dt id = "+listadoDeTomas[i].medicamento+">Medicamento: "+ listadoDeTomas[i].medicamento + 
                    "</dt><dd id = "+listadoDeTomas[i].fecha_Asignacion+">Fecha de Asignación: " + listadoDeTomas[i].fecha_Asignacion + 
                    "</dd><dd><button onclick = agregamosLaToma("+ listadoDeTomas[i].medicamento+") >Agregar Toma</button>" +
                    "</dd><dd><button onclick = eliminamosLaToma("+ i +")>Eliminar Toma</button></dd></dl></br>" 
                }
            }else if(frecuencia == 0){
                for(var i in listadoDeTomas){
                        zona_Pintar.innerHTML += 
                        "<dl id = toma"+i+">" +
                        "<dt id = "+listadoDeTomas[i].medicamento+">Medicamento: "+ listadoDeTomas[i].medicamento + 
                        "</dt><dd id = "+listadoDeTomas[i].fecha_Asignacion+">Fecha de Asignación: " + listadoDeTomas[i].fecha_Asignacion + 
                        "</dd></dl></br>" 
                }
                alert("Toma Única")
            }
        }
    })
}


// ********************     LOGIN    **************************************************
function login_Paciente(){
    // Cogemos el codigoAcceso del paciente directamente de los datos introducidos por el HTML
    codigoAcceso = document.getElementById("codigo-Acceso").value
    //console.log("codigoAcceso",codigoAcceso)
    // Los Procedimientos del servidor se deben poner con parametros si llevan y funcion(retorno); 
    // Si No tiene parámetros se pone solo la funcion(retorno) donde obtenemos los datos.
    login(codigoAcceso, function(paciente) { //******************************************************************** LOGIN
        // Actualizamos la sección y pasamos al menu_Principal_Paciente()
        if(paciente != null){
        // console.log("retorno login = datos_Paciente",retorno)
            
            // CREAMOS LA CONEXIÓN SOCKET
            conexion = new WebSocket('ws://localhost:4444', "clientes");

            // AQUÍ ENVIAMOS LOS MENSAJES AL SERVIDOR SOCKET
            conexion.addEventListener("open", function(event){
                console.log("El paciente esta conectado desde el main");
                //Enviamos la informacion al Servidor para poder identficar la conexion
                conexion.send(JSON.stringify({origen : "paciente", medicoDelPaciente : paciente.medico, idPaciente : paciente.id}));
            });

            // AQUÍ SE RECIBEN TODOS LOS MENSAJES
            conexion.addEventListener('message', function(event){
                //Convertimos el mensaje de texto a objeto
                var msg = JSON.parse(event.data);
                //Recibimos los Datos que ha enviado el Medico al Servidor Socket
                if (msg.contenido == "mensaje_del_medico"){
                    console.log("El mensaje del médico",msg);
                    var pintarmensajedelmedico = document.getElementById("mensaje_del_medico")
                    pintarmensajedelmedico.innerHTML = ""
                    pintarmensajedelmedico.innerHTML += "Tú medico te ha escrito lo siguiente:</br>"+msg.mensaje+""
                    // refListadoMensajes.innerHTML += "<dl><dt>Fecha:" + msg.fechaActual + "</dt><dd>Contenido del Mensaje: " + msg.contenido + "</dd></dl>" + "<br/><br/>";
                }

                if(msg.contenido == "mensajeError"){
                    alert(msg.mensaje)
                }
            });


            menu_Principal_Paciente();
            datos_Paciente = paciente;
            // console.log("datos_Paciente",datos_Paciente);

            idPaciente = paciente.id;
            idMedico = paciente.medico;
            // console.log("idPaciente, idMedico", idPaciente,idMedico);
        
            listadoMedicamentos(function(medicamentos){ //************************************************************** MEDICAMENTOS
                lista_Medicamentos = medicamentos
            })

            datosMedico(idMedico, function(medicoPaciente){ //********************************************************** DATOS MEDICO
                // console.log(medicoPaciente);
                datos_Medico = medicoPaciente;
                console.log("Observaciones Bienvenida", paciente.observaciones);
                var mensaje_bienvenida = document.getElementById("mensaje-bienvenida");
                mensaje_bienvenida.innerHTML = "";
                if(paciente.observacioens == "Escribe aquí tu comentario..."){
                    mensaje_bienvenida.innerHTML = "Bienvenido Paciente: " + paciente.nombre + ", " + paciente.apellidos +
                    "<br/>Su médico es: " + datos_Medico.Nombre + 
                    "<br/>Tiene Observaciones de su Médico: " + paciente.observaciones;
                }else{
                    mensaje_bienvenida.innerHTML = "Bienvenido Paciente: " + paciente.nombre + ", " + paciente.apellidos +
                    "<br/>Su médico es: " + datos_Medico.Nombre + 
                    "<br/>No tiene Observaciones pendientes."}
            })

            medicacion(idPaciente, medicacion =>{  //******************************************************************** MEDICACION
                var lista_medicacion_paciente = document.getElementById("listado-medicamentos-paciente")
                lista_medicacion_paciente.innerHTML = "";
                
                var nombreMedicamento = "" ;         

                for(var i in medicacion){
                    for(var j in lista_Medicamentos){
                        if(lista_Medicamentos[j].id == medicacion[i].medicamento){
                            nombreMedicamento = lista_Medicamentos[j].nombre;
                            // console.log("NombreMEdicamento",nombreMedicamento);
                            lista_medicacion_paciente.innerHTML += 
                            "<div id=medicamento"+medicacion[i].medicamento+">" +
                            "<dt> Medicamento:<b> " + nombreMedicamento +  //deberia aparecer el nombre
                            "</b></dt><dd> IDm: " + medicacion[i].medicamento + 
                            "</dd><dd> Paciente: " + paciente.nombre + //deberia aparecer el nombre
                            "</dd><dd> Fecha Asignación: " + medicacion[i].fecha_Asignacion + 
                            "</dd><dd> Dosis: " + medicacion[i].dosis + 
                            "</dd><dd> Tomas: " + medicacion[i].tomas + 
                            "</dd><dd> Frecuencia: " + medicacion[i].frecuencia + 
                            "</dd><dd> Observación: " + medicacion[i].observaciones + 
                            "</dd><dd><button onclick='verTomas("+ medicacion[i].medicamento +")'> Ver las Tomas</button> " +
                            "</dd><dd><button onclick = 'pedirMedicacion("+ medicacion[i].medicamento +")'>No tengo más medicación</button></dd>"+
                            "</dd><dd><button onclick = 'revientaaaa("+ medicacion[i].medicamento +")'>Me sienta mal</button></dd>"+ 
                            "</div><br/>"  // cambiar la funcion por la que mira las tomas y poner estaa de cambio de sección dentro de esa.   
                        }
                    }
                }

                lista_Medicacion = medicacion
                // Para pintar dependiendo de la frecuencia y la fecha de las tomas del paciente
                for(var i in lista_Medicacion){
                    verListadoTomas(lista_Medicacion[i].medicamento);
                }
            })
        }
    })
}

function pedirMedicacion(idMedicamento){
    conexion.send(JSON.stringify({origen : "paciente", contenido: "pedirMedicación" , medico_del_paciente: datos_Medico.ID , paciente: idPaciente, idMedicamento:idMedicamento}));
}

function revientaaaa(idMedicamento){
    conexion.send(JSON.stringify({origen : "paciente", contenido: "sientaMal" , medico_del_paciente: datos_Medico.ID , paciente: idPaciente, idMedicamento:idMedicamento}));
}

function pedirCita(){
    var fecha = document.getElementById("fecha_cita").value
    conexion.send(JSON.stringify({origen : "paciente", contenido: "pedirCita" , medico_del_paciente: datos_Medico.ID , paciente: idPaciente, fecha:fecha}));
}

function verListadoTomas(idMedicamento) {   //************************************************************** LISTADO MEDICAMENTO 2
    // En este es el que usamos para pintar y que no actualice la sección.
    // console.log("El id del medicamento", idMedicamento);
    // console.log("lista_Medicacion", lista_Medicacion)
    listadoTomas(idPaciente, idMedicamento, listaTomas =>{
        lista_Tomas = listaTomas;
        pintar(idMedicamento)
    })  
}