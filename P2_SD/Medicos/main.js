// Variables globales
var conexion = "" // websocket

var id_Paciente = "";
var pacientesDelMedico = []; // refrescar página
var paciente_Modificar = "";  //editar_Pacientes() guarda los datos del paciene con ese id
var lista_Medicamentos =""; // listado_Medicamentos() Guarda array de todos los medicamentos
var nombre_Medicamento="";
var lista_Medicacion_Paciente = [];
var tomas_Del_Paciente ="";
var id_Medicamento = "";
var id_Medico = "";
var nombre_Medico= "";
var apellido_Medico ="";
var nombre_Paciente ="";


// var paciente_Actual = "";
// var idm_Tomas = "";

var seccionActual = "login1"
function cambiarSeccion(seccion){ // cambia a la etiqueta <div> con el id introducido como seccion
    document.getElementById(seccionActual).classList.remove("activa");
    document.getElementById(seccion).classList.add("activa"); // Es lo mismo que hacer .remove() y .add()  comentado arriba !!
    seccionActual=seccion;
}
function menu_principal(){  // Por si se tiene que usar en el index directamente sin estar dentro de ninguna otra sección
    cambiarSeccion("menu-principal");
}
function datos_Paciente_Nuevo(){
    cambiarSeccion("datos-paciente-nuevo");
}
function datos_Paciente(){
    cambiarSeccion("datos-paciente");
}
function datos_Medicamentos(){
    cambiarSeccion("datos-medicamentos");
}
function medicamentos_Paciente(){
    cambiarSeccion("medicamentos-paciente");
}
function salir(){
    cambiarSeccion("login1");
    conexion.close(); // cerramos WebSocket
}
function limpiarFormulario(){
    document.getElementById("formulario_Paciente").reset();
    document.getElementById("formulario_Paciente_Editado").reset(); // vaciamos tambien el formulario de editar datos paciente
    // document.getElementById("").reset();
}
function pagina_Tomas(){
    cambiarSeccion("pagina-Tomas");
}
function pagina_info_Paciente(){
    cambiarSeccion("pagina-info-Paciente");
}
function pagina_Nueva_Medicacion(){
     var boton_anyadir_medicacion = document.getElementById("boton_anyadir_medicacion");
    boton_anyadir_medicacion.innerHTML="";
    boton_anyadir_medicacion.innerHTML += "<button onclick='anyadir_Medicacion(" + id_Paciente + ")'>Añadir Medicación</button>";
    console.log("id_Paciente", id_Paciente)
    cambiarSeccion("pagina-nueva-Medicacion");
    
}

// ******************** ENVIAMOS MENSAJE AL PACIENTE (WEBSOCKET) ***********************
function enviarMensajeAlPaciente(idPaciente_a_enviar) {
    var mensaje = document.getElementById("mensaje_del_medico").value;
    conexion.send(JSON.stringify({origen : "medico", contenido: "mensajeAlPaciente" , idMedico: id_Medico , mensaje: mensaje, paciente: idPaciente_a_enviar}));
}

function refrescarPagina(){
    cambiarSeccion("menu-principal");
    var listado_Paciente_principal = document.getElementById("listado-Paciente"); // listado visto en la sección "menu-principal"
    var listado_Paciente_nuevo = document.getElementById("listado-Paciente-nuevo"); // listado visto en la sección "datos-paciente-nuevo"
    listado_Paciente_principal.innerHTML = ""; // Se pone vacío primero para cada vez que entre no vaya sumando
    listado_Paciente_nuevo.innerHTML = "";


    rest.get('/api/medico/' + id_Medico + '/pacientes', (estado, res) => {
        if (estado == 200) {
            pacientesDelMedico = res;
            // console.log("Array pacientes de ese médico",res) //OK
            for (i in pacientesDelMedico) { 
                listado_Paciente_principal.innerHTML += 
                "<dt>ID: " + pacientesDelMedico[i].id + 
                "</dt><dd>Nombre: " + pacientesDelMedico[i].nombre + 
                "</dd><dd>Apellidos: " + pacientesDelMedico[i].apellidos + 
                "</dd><dd>Médico: " + pacientesDelMedico[i].medico +
                "</dd><dd>Observaciones: " + pacientesDelMedico[i].observaciones +
                "</dd><dd><button onclick='info_Paciente(" + pacientesDelMedico[i].id + 
                ")'> Información del Paciente</button></dd>"+
                "<br/><br/><p><textarea type='text' id ='mensaje_del_medico' placeholder='Escribe aquí tu mensaje para este paciente'></textarea></p>"+
                "<p><button onclick='enviarMensajeAlPaciente("+ pacientesDelMedico[i].id +")'>Enviar</button></p>"
                

                listado_Paciente_nuevo.innerHTML += 
                "<dt>ID: " + pacientesDelMedico[i].id + 
                "</dt><dd>Nombre: " + pacientesDelMedico[i].nombre + 
                "</dt><dd>Apellidos: " + pacientesDelMedico[i].apellidos + 
                "</dd><dd>Médico: " + pacientesDelMedico[i].medico +
                "</dt><dt>Observaciones: " + pacientesDelMedico[i].observaciones +
                "</dd><dd><button onclick='info_Paciente(" + pacientesDelMedico[i].id + 
                ")'> Información del Paciente </button></dd>"+
                "<br/><br/>"
            }
        } else {     
            alert(res); }
    })
}
// *********************** Algo raro editar pacientes pero coge el paciente viejo
// creo que solo es para imprimir en la sección de editar paciente la info del paciente viejo
function editar_Pacientes(idPaciente){ 
    var paciente_Editado = document.getElementById("paciente-Editado");
    paciente_Editado.innerHTML = "";
    
    id_Paciente = idPaciente;
    rest.get('/api/paciente/' + idPaciente, (estado, res) => {
        if (estado == 200) {
            nombre_Paciente = "";
            nombre_Paciente = res.nombre
            paciente_Modificar = res
            console.log("Datos del paciente con ese ID", res)
            if(paciente_Modificar.codigo_Acceso == ""){
                paciente_Modificar.codigo_Acceso = "No asignado"
            }
            paciente_Editado.innerHTML += 
            "<dt>ID: " + paciente_Modificar.id +
            "</dt><dd>Nombre: " + paciente_Modificar.nombre + 
            "</dd><dd>Apellidos: " + paciente_Modificar.apellidos + 
            // SIGUIENTES  lineas salen undefined si las descomentamos debigo a que en el get(/api/paciente/:id) solo cogemos los otros datos.
            "</dd><dd>Fecha Nacimiento: " + paciente_Modificar.fecha_Nacimiento + 
            "</dd><dd>Género: " + paciente_Modificar.genero + 
            "</dd><dd>Código Acceso: " + paciente_Modificar.codigo_Acceso +
            "</dd><dd>Medico: " + paciente_Modificar.medico +
            "</dd><dd>Observaciones: " + paciente_Modificar.observaciones +
            "<br/><br/>"         
            datos_Paciente(); // cambio sección
        } else {
            alert(res)
        }
    })
}
// listado de todos los medicamentos.
function listado_Medicamentos(){
    var listado_Medicamentos = document.getElementById("listado-Medicamentos");
    rest.get("/api/medicamento",(estado, res) =>{
        if (estado == 200){
            nombre_Medicamento = res.nombre;
            // console.log("Listado todos Medicamentos",res) //OK
            listado_Medicamentos.innerHTML = ""; //donde se imprime
            lista_Medicamentos = res; //variable global
            for (i in lista_Medicamentos) {

                listado_Medicamentos.innerHTML +=

                "<dt>IDm:" + lista_Medicamentos[i].id +  // Podría guardar en vriables globales los nombres para que aparezca el nombre en vez del ID
                "</dt><dd>Medicamento:" + lista_Medicamentos[i].nombre +
                "</dd><dd>Descripción:" + lista_Medicamentos[i].descripcion +
                "</dd><dd>Nº Dosis:" + lista_Medicamentos[i].num_dosis +
                "</dd><dd>Importe:" + lista_Medicamentos[i].importe +
                "</dd><dd>Importe Subvencionado:" + lista_Medicamentos[i].importe_subvencionado +
                "<br/><br/>"
            }
            datos_Medicamentos(); // cambia seccion
        }else{
            alert(res)
        }
    });
}
// medicamentos del paciente con el id
function medicacion_Del_Paciente(idPaciente){
    id_Paciente = idPaciente;
    //********** Sacamos el nombre del paciente y del medicamento para dejarlo mas bonito
    var nombre_Paciente_Actual =""
    rest.get("/api/paciente/"+ id_Paciente,(estado, res) =>{
        if (estado == 200){
            datos_Paciente = res;
            nombre_Paciente = datos_Paciente.nombre;
        }
    });
    rest.get("/api/medicamento",(estado, res) =>{
        if (estado == 200){
            lista_Medicamentos = res;
        }
    });
                
    var listado_Medicamento = document.getElementById('listado-Paciente-Medicamento');
    listado_Medicamento.innerHTML = "";
    var paciente_medicamento = document.getElementById('paciente-medicamento');

    
    rest.get('/api/paciente/'+ id_Paciente + '/medicacion',function(estado,res){
        if(estado==200){
            lista_Medicacion_Paciente = res;
            console.log("lista_Medicacion_Paciente", lista_Medicacion_Paciente)
            console.log("lista_Medicamentos", lista_Medicamentos);
            paciente_medicamento.innerHTML = "Medicamentos de: " + nombre_Paciente; // OK
            for (i in lista_Medicacion_Paciente){
                for (j in lista_Medicamentos){ 
                    if(lista_Medicacion_Paciente[i].medicamento == lista_Medicamentos[j].id){  
                        listado_Medicamento.innerHTML +=
                        "<dt>Medicamento: " + lista_Medicamentos[j].nombre + 
                        "</dt><dd>Fecha Asignación: " + lista_Medicacion_Paciente[i].fecha_Asignacion + 
                        "</dd><dd>Dosis: " + lista_Medicacion_Paciente[i].dosis + 
                        "</dd><dd>Tomas: " + lista_Medicacion_Paciente[i].tomas + 
                        "</dd><dd>Frecuencia: " + lista_Medicacion_Paciente[i].frecuencia +
                        "</dd><dd>Observaciones: " + lista_Medicacion_Paciente[i].observaciones +
                        "</dd><dd><button onclick='tomasPaciente(" + lista_Medicacion_Paciente[i].medicamento + //Pasamos por parámetro el id del medicamento para la función. !!!
                        ")'> Tomas del paciente 1</button></dd>"+
                        "<br/><br/>" 
                    }                   
                }
            }
            medicamentos_Paciente(); // cambiamos de sección a la sección con el listado de medicamentos solo si.
        }else {
            paciente_medicamento.innerHTML = "Medicamentos de: " + nombre_Paciente + "   Vacío, ningún medicamento asignado !!"; //Para que aun que de el error se actualice el nombre 
            alert(res)
         }
    });
};

// Tomas del paciente
function tomasPaciente(idm){ 

    var listado_Tomas = document.getElementById("listado-Tomas"); 
    var tomas_paciente = document.getElementById("tomas-Paciente"); 
    
    rest.get('/api/paciente/' + id_Paciente + '/medicacion/' + idm, (estado, res) => {
        if (estado == 200) {
            pagina_Tomas();
            tomas_paciente.innerHTML = nombre_Paciente + ', ha realizado las siguientes tomas del medicamento:' ;    
            id_Medicamento = idm;
            var tomas_Del_Paciente = "";
            console.log("tomas_Del_Paciente",res)
            tomas_Del_Paciente = res;
            console.log("lista_Tomas del paciente", tomas_Del_Paciente);
            
            listado_Tomas.innerHTML = ""; 
            for(i in tomas_Del_Paciente){
              
                listado_Tomas.innerHTML += 
                "<dt>IDm:" + tomas_Del_Paciente[i].medicamento +  // Podría guardar en vriables globales los nombres para que aparezca el nombre en vez del ID
                "</dt><dd>Paciente:" + tomas_Del_Paciente[i].paciente +
                "</dd><dd>Fecha Toma:" + tomas_Del_Paciente[i].fecha_Asignacion +
                "<br/><br/>"
            }             
        } else {
           alert(res)   
        }
    });
};

// Información del paciente
function info_Paciente(idPaciente){
    id_Paciente = idPaciente;

    var informa_Paciente = document.getElementById("info-Paciente")

    rest.get("/api/paciente/" + id_Paciente, function(estado,res){
        if (estado == 200){
            // console.log("infor del paciente con ese id", res)
            informa_Paciente.innerHTML ="";
            // nombre_Paciente = res.nombre;

            if(res.codigo_Acceso == ""){ 
                res.codigo_Acceso = "No asignado"
            }
            
            informa_Paciente.innerHTML +=
            "<dt>ID:" + res.id +  // Podría guardar en vriables globales los nombres para que aparezca el nombre en vez del ID
            "</dt><dd>Nombre:" + res.nombre +
            "</dd><dd>Apellidos:" + res.apellidos +
                "</dd><dd>Fecha Nacimiento:" + res.fecha_Nacimiento +
                "</dd><dd>Genero:" + res.genero +
                "</dd><dd>Medico:" + res.medico +
                "</dd><dd>Código Acceso:" + res.codigo_Acceso +
                "</dd><dd>Observaciones:" + res.observaciones +
                "</dd><dd><button onclick='editar_Pacientes(" + id_Paciente + 
                ")'> Editar Paciente</button></dd>"+
                "</dd><dd><button onclick='medicacion_Del_Paciente(" + id_Paciente +
                ")'> Medicamentos del Paciente</button></dd>"+
                "</dd><dd><button onclick='pagina_Nueva_Medicacion()'> Añadir Nueva medicación</button></dd>"+
                "<br/><br/>"

            pagina_info_Paciente(); // CAMBIA SECCION
            }else{
                alert(res);
            }
        });
};

//************************** SE DEBE EJECUTAR EN: http://localhost:3000/medico/      ******************************************************************************
// ************** POST LOGIN MEDICO ***********************
var id_Medico = ""
console.log("Id Medico Login", id_Medico)
function login_Medico(){

    var medico = {
        // Cogemos los datos del Html
        login: document.getElementById("login").value,
        password: document.getElementById("password").value
    }
    
    rest.post("/api/medico/login", medico, (estado, respuesta) => { // lo mismo que poner rest.post("/api/medico/login", medico, function (estado,respuesta){ ...}
        //respuesta es el id del médico
        if (estado == 201){
            id_Medico = respuesta
            // console.log("entra")
            // id_Medico = respuesta;
            // console.log("IDMedico", respuesta)

    // ******************************* CREAMOS CONEXIÓN WEBSOCKET **************************************
            conexion = new WebSocket('ws://localhost:4444', "clientes");

    // ******************************* ABRE LA CONEXIÓN Y ENVÍA MENSAJES CON WEBSOCKET ****************************************
            // cerrar con conexion.close() con la función salir()
            conexion.addEventListener("open", function(event){
                console.log("El paciente esta conectado desde el main");
                //Enviamos la informacion al Servidor para poder identficar la conexion
                conexion.send(JSON.stringify({origen : "medico", idMedico : respuesta}));
            });

    // ******************************* RECIBIMOS LOS MENSAJES ****************************************
            conexion.addEventListener('message', function(event){
                //Convertimos el mensaje de texto a objeto
                var msg = JSON.parse(event.data);
                //Recibimos los Datos que ha enviado el Medico al Servidor Socket
    // *********** Repetir cada if con cada mensaje que tenga que recibir el médico, cambiando los if y los valores de msg. ****************
                if (msg.contenido == "pedirMedicación"){
                    var pintarContenido = document.getElementById("mensaje_del_paciente")
                    pintarContenido.innerHTML = "";
                    pintarContenido.innerHTML += 
                        "El paciente "+ msg.idPaciente + 
                        " necesita pedir una nueva medicación del medicamento "+ msg.idMedicamento + 
                        ", mandado a fecha de: "+ msg.fecha
                    // console.log(msg);
                }
                if (msg.contenido == "sientaMal"){
                    var pintarContenido = document.getElementById("mensaje_del_paciente")
                    pintarContenido.innerHTML = "";
                    pintarContenido.innerHTML += 
                        "El paciente "+ msg.idPaciente + " le sienta mal el medicamento "+ msg.idMedicamento + 
                        ", mandado a fecha de: "+ msg.fecha
                        // console.log(msg);
                }
                if (msg.contenido == "pedircita"){
                    var pintarContenido = document.getElementById("mensaje_del_paciente")
                    pintarContenido.innerHTML = ""
                    pintarContenido.innerHTML += 
                        "El paciente "+ msg.idPaciente + " quiere una cita para el día "+ msg.fecha + 
                        ", mandado a fecha de: "+ msg.fecha_mensaje
                    // console.log(msg);
                }
                // si recibimos como contenido "mensajeError" nos saltará la arerta con el value del mensaje.
                if(msg.contenido == "mensajeError"){
                    alert(msg.mensaje)
                }
            });

//*********************** salimos de websockets ****************************
            
            var bienvenido = document.getElementById("bienvenido")
            var creando_Paciente = document.getElementById("creando_Paciente")
            rest.get("/api/medico/" + id_Medico, function(est,res){     
            // console.log("entra al get")
            
                nombre_Medico = res.nombre;
                apellido_Medico = res.apellido;

                bienvenido.innerHTML = ""; 
                bienvenido.innerHTML += 
                "¡Médico: " + nombre_Medico + ", "+ apellido_Medico + "; Con ID: " + id_Medico + " !";  
                // creando_Paciente --> Solamente es donde se crea el botón html
                creando_Paciente.innerHTML = ""; // vaciamos el html por si hay algo
                creando_Paciente.innerHTML += 
                '<button type="text" id ="nuevo_Paciente" onclick="crear_Paciente()"> Crear Paciente </button>';  
            });                                                                                                 
        }else if(estado == 401){
            alert(respuesta);
        }
    refrescarPagina(); 
    })
};


// ******************* POST CREAR PACIENTE *************************
function crear_Paciente(){
    var name = document.getElementById("nombre_Paciente").value;
    var apellidos = document.getElementById("apellidos_Paciente").value;
    var fecha_Nacimiento = document.getElementById("fecha_Nacimiento_Paciente").value; 
    var genero = document.getElementById("genero_Paciente").value;
    var codigo_Acceso = document.getElementById("codigo_Acceso_Paciente").value; 
    var observaciones = document.getElementById("observaciones_Paciente").value; 

    var body_Paciente = {
        nombre: name,
        apellidos: apellidos,
        fecha_Nacimiento: new Date(fecha_Nacimiento), 
        genero: genero,     
        codigo_Acceso: codigo_Acceso,
        observaciones: observaciones
    };

    rest.post("/api/medico/" + id_Medico + "/pacientes", body_Paciente, (estado,respuesta) => { 
        if (estado == 201){
            
            refrescarPagina();
            name.value = "";
            apellidos.value ="";
            fecha_Nacimiento.value = "";
            genero.value ="";
            codigo_Acceso.value ="";
            observaciones.value ="";
            
            limpiarFormulario(); 
        }else{
            alert(respuesta);
        }
    })
};

// ************ Añadir medicación *************
function anyadir_Medicacion(idPaciente){
   
    var medicamento = document.getElementById("medicamento-paciente").value;
    // Cambiamos el valor para tener los id 
    switch (medicamento) {
        case 'Ibuprofeno':
          medicamento = 1;
          break;
        case 'Ibuprofeno +':
            medicamento = 2;          
            break;
        case 'Paracetamol':
            medicamento = 3;          
            break;
        case 'Morfina ++':
            medicamento = 4;          
            break;
          case 'Pastilla azul':
            medicamento = 5;
            break;
        default:      
      }

    var dosis = document.getElementById("dosis-paciente").value;
    //console.log("dosis",dosis)
    var tomas = document.getElementById("tomas-paciente").value;
    //console.log("tomas",tomas)
    var frecuencia = document.getElementById("frecuencia-paciente").value; 
    //console.log("frec",frecuencia)
    switch (frecuencia) {
        case 'frecuencia_0':
            frecuencia = 0;
          break;
        case 'frecuencia_025':
            frecuencia = 0.25;          
            break;
        case 'frecuencia_05':
            frecuencia = 0.5;          
            break;
        case 'frecuencia_1':
            frecuencia = 1;          
            break;
          case 'frecuencia_2':
            frecuencia = 2;
            break;
        default:
      }
    var observaciones = document.getElementById("observaciones_medicacion").value;

    var body_Medicacion = {
        medicamento: medicamento,
        paciente: id_Paciente,
        fecha_Asignacion: new Date(),
        dosis: dosis,
        tomas: tomas,
        frecuencia: frecuencia,
        observaciones: observaciones
    }
    console.log("Entra estaksjgkl")
    rest.post("/api/paciente/" + idPaciente + "/medicacion", body_Medicacion, (estado,res)=>{
        if (estado == 201){ 

            console.log("Última Toma añadida", res) 
            console.log("Lista Medicacion Paciente antes añadir", lista_Medicacion_Paciente)
            // NO POSEMOS USARLO// lista_Medicacion.push(res) // POR QUE LA LISTA DE MEDICACIONES QUE OBTENEMOS ANTES ES LA DE EL PROPIO PACIENTE
            for(var i in lista_Medicacion_Paciente){ //se añade solo al paciente su nueva
                if(lista_Medicacion_Paciente[i].paciente == res.paciente && lista_Medicacion_Paciente[i].medicamento == res.medicamento){
                    // Se recibe la lista_Medicacion actualizada tras añadir el medicamento nuevo
                    lista_Medicacion_Paciente[i].push(res) //actualizamos la lista del paciente en local
                }
            }
            console.log("Lista Medicacion Paciente Despues de añadir", lista_Medicacion_Paciente)
            // refrescarPagina();    
        }else{
            alert(res);
        }
    });
    
    // limpiarFormulario();
};

// Actualizamos el pacinete
function actualizar_Paciente(){
   
    var nombre_Paciente_Editado = document.getElementById("nombre_Paciente_Editado").value;
    var apellidos_Paciente_Editado = document.getElementById("apellidos_Paciente_Editado").value;
    var fecha_Nacimiento_Paciente_Editado = document.getElementById("fecha_Nacimiento_Paciente_Editado").value;
    var genero_Paciente_Editado = document.getElementById("genero_Paciente_Editado").value;
    var medico_Paciente_Editado = document.getElementById("medico_Paciente_Editado").value;
    var codigo_Acceso_Paciente_Editado = document.getElementById("codigo_Acceso_Paciente_Editado").value;
    var observaciones_Paciente_Editado = document.getElementById("observaciones_Paciente_Editado").value;

    var body_Paciente_Actualizado ={
        nombre: nombre_Paciente_Editado,
        apellidos: apellidos_Paciente_Editado,
        fecha_Nacimiento: new Date(fecha_Nacimiento_Paciente_Editado),
        genero: genero_Paciente_Editado,
        medico: medico_Paciente_Editado,
        codigo_Acceso: codigo_Acceso_Paciente_Editado,
        observaciones: observaciones_Paciente_Editado
    }

    rest.put("/api/paciente/" + id_Paciente, body_Paciente_Actualizado, function (estado, respuesta){
        if(estado == 200){
            nombre_Paciente_Editado.value = "";
            apellidos_Paciente_Editado.value ="";
            fecha_Nacimiento_Paciente_Editado.value = "";
            genero_Paciente_Editado.value ="";
            codigo_Acceso_Paciente_Editado.value ="";
            observaciones_Paciente_Editado.value ="";

            refrescarPagina();
            limpiarFormulario();
        }else{
            alert(respuesta)
        }
    });
}


