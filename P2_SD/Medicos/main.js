
// variable global
var conexion = ""
var id_Medico = "";
var nombre_Medico= "";
var apellido_Medico ="";
var id_Paciente = "";
var paciente_Actual = "";
var idm_Tomas = "";
var nombre_Paciente ="";


var seccionActual = "login1"
function cambiarSeccion(seccion){ // cambia a la etiqueta <div> con el id introducido como seccion
    document.getElementById(seccionActual).classList.remove("activa");
    document.getElementById(seccion).classList.add("activa"); // Es lo mismo que hacer .remove() y .add()  comentado arriba !!
    seccionActual=seccion;
}


// function menu_principal(){ // igual que el de entrar pero pasa hacia atrás, para aclarme mejor con los botones
//     var login = document.getElementById("login").value;
//     cambiarSeccion("menu-principal");
// ---> --> esto se cambia a cambiarSeccion("menu-principal"); directamente.

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
    conexion.close();

}

function limpiarFormulario(){
    document.getElementById("formulario_Paciente").reset();
    document.getElementById("formulario_Paciente_Editado").reset(); // vaciamos tambien el formulario de editar datos paciente

}

function pagina_Tomas(){
    cambiarSeccion("pagina-Tomas");
}

function pagina_info_Paciente(){
    cambiarSeccion("pagina-info-Paciente");
}

function pagina_Nueva_Medicacion(){
    cambiarSeccion("pagina-nueva-Medicacion");
    var boton_anyadir_medicacion = document.getElementById("boton_anyadir_medicacion");
    boton_anyadir_medicacion.innerHTML="";
    boton_anyadir_medicacion.innerHTML = "<button onclick='anyadir_Medicacion(" + id_Paciente + ")'>Añadir Medicación</button>";
    //console.log("JOJO", id_Paciente)
}



// rest.get(url, callback)
// rest.post(url, body, callback)
// rest.put(url, body, callback)
// rest.delete(url, callback)
// function callback(estado, respuesta) {...}


// ******************** Funcion Recargar PAGINA ***********************
function enviarMensajeAlPaciente(idPaciente_a_enviar) {
    var mensaje = document.getElementById("mensaje_del_medico").value;
    conexion.send(JSON.stringify({origen : "medico", contenido: "mensajeAlPaciente" , idMedico: id_Medico , mensaje: mensaje, paciente: idPaciente_a_enviar}));
}

// objeto con todos los pacientes del medico
var pacientesDelMedico = [];

// Función para refrescar la página una vez el médico actualice los datos del paciente.
function refrescarPagina() {
    // Se cambia al menu-principal del médico --> La interfaz principal.
    cambiarSeccion("menu-principal");
    // Obtenemos la referencia del html donde vamos a pintar la lista de pacientes.
    var listado_Paciente_principal = document.getElementById("listado-Paciente"); // listado visto en la sección "menu-principal"
    var listado_Paciente2 = document.getElementById("listado-Paciente2"); // listado visto en la sección "datos-paciente-nuevo"
    listado_Paciente_principal.innerHTML = ""; // Se pone vacío primero para cada vez que entre no vaya sumando
    listado_Paciente2.innerHTML = "";
    
    // Función 5 del servidor.
    rest.get('/api/medico/' + id_Medico + '/pacientes', (estado, res) => {
        if (estado == 200) {
            // En este caso, la respuesta es una lista de pacientes.
            // Lo guardamos en una variable externa.
            pacientesDelMedico = res;
            

            for (i in pacientesDelMedico) { //O también for(var i = 0; i< pacientesDelMedico.length; i++{...})
                listado_Paciente_principal.innerHTML += 
                "<dt>ID: " + pacientesDelMedico[i].id + 
                "</dt><dd>Nombre: " + pacientesDelMedico[i].nombre + 
                "</dd><dd>Apellidos: " + pacientesDelMedico[i].apellidos + 
                //"</dd><dd>Fecha Nacimiento: " + pacientesDelMedico[i].fecha_Nacimiento + 
                //"</dd><dd>Género: " + pacientesDelMedico[i].genero + 
                "</dd><dd>Médico: " + pacientesDelMedico[i].medico +
                //"</dd><dd>Código Acceso: " + pacientesDelMedico[i].codigo_Acceso +
                "</dd><dd>Observaciones: " + pacientesDelMedico[i].observaciones +
                "</dd><dd><button onclick='info_Paciente(" + pacientesDelMedico[i].id + 
                ")'> Información del Paciente</button></dd>"+
                // "</dd><dd><button onclick='editar_Pacientes(" + pacientesDelMedico[i].id + 
                // ")'> Editar Paciente 11 </button></dd>"+
                // "</dd><dd><button onclick='medicamentos_Del_Paciente(" + pacientesDelMedico[i].id +
                // ")'> Medicamentos del Paciente 1</button></dd>"+
                "<br/><br/><p><textarea type='text' id ='mensaje_del_medico' placeholder='Escribe aquí tu mensaje para este paciente'></textarea></p><p><button onclick='enviarMensajeAlPaciente("+ pacientesDelMedico[i].id +")'>Enviar</button></p>"
                

                // igual para el listado paciente que esta en la sección crear pacientes
                listado_Paciente2.innerHTML += 
                "<dt>ID: " + pacientesDelMedico[i].id + 
                "</dt><dd>Nombre: " + pacientesDelMedico[i].nombre + 
                "</dt><dd>Apellidos: " + pacientesDelMedico[i].apellidos + 
                // "</dt><dt>Fecha Nacimiento: " + pacientesDelMedico[i].fecha_Nacimiento + 
                // "</dt><dt>Género: " + pacientesDelMedico[i].genero + 
                "</dd><dd>Médico: " + pacientesDelMedico[i].medico +
                // "</dt><dt>Código Acceso: " + pacientesDelMedico[i].codigo_Acceso +
                "</dt><dt>Observaciones: " + pacientesDelMedico[i].observaciones +
                "</dd><dd><button onclick='info_Paciente(" + pacientesDelMedico[i].id + 
                ")'> Información del Paciente </button></dd>"+
                // "</dt><dd><button onclick='editar_Pacientes(" + pacientesDelMedico[i].id + ")'> Editar Paciente 22</button></dd>"+
                // "</dd><dd><button onclick='medicamentos_Del_Paciente(" + pacientesDelMedico[i].id +
                // ")'> Medicamentos del Paciente 2</button></dd>"+
                "<br/><br/>"
               
            }
        } else {

            alert(res); //Si se borran todos los pacientes, salta la alerta que este médico no tiene asignado ningún paciente o si el médico no tiene pacientes como en este caso, Paula, que salga la alerta.
        }
    })
}


var paciente_Modificar = ""; //Se le guardan los datos originales del paciente el cuál vamos a modificar

function editar_Pacientes(idPaciente){ // Cuando se llame la función se debe introducir el id del paciente el cuál se quiere editar. En el botón Editar Paciente de la función refrescar página le pasamos el id cogido de la lista 
    datos_Paciente(); // Se cambia la sección a la seccion datos-paciente.
    var paciente_Editado = document.getElementById("paciente-Editado");
    paciente_Editado.innerHTML = "";

    // guardamos el idPaciente en la variable Global para poder usarla en otro momento.
    id_Paciente = idPaciente;
    // Función GET /api/paciente/:id  del servidor.
    rest.get('/api/paciente/' + idPaciente, (estado, res) => {
        if (estado == 200) {
            // En este caso, la respuesta es el paciente con el id introducido.
            // Lo guardamos en una variable externa.
            paciente_Modificar = res
            if(res.codigo_Acceso == ""){ // Muestra 'No asignado' a los codigos_Acceso que están vacíos, o sea, los de los pacientes iniciales del datos.js

                res.codigo_Acceso = "No asignado"
            }
            paciente_Editado.innerHTML += 
                "<dt>ID: " + paciente_Modificar.id +
                "</dt><dd>Nombre: " + paciente_Modificar.nombre + 
                "</dd><dd>Apellidos: " + paciente_Modificar.apellidos + 
                // SIGUIENTES  lineas salen undefined si las descomentamos debigo a que en el get(/api/paciente/:id) solo cogemos los otros datos.
                "</dd><dd>Fecha Nacimiento: " + paciente_Modificar.fecha_Nacimiento + 
                "</dd><dd>Género: " + paciente_Modificar.genero + 
                "</dd><dd>Código Acceso 50: " + paciente_Modificar.codigo_Acceso +
                "</dd><dd>Medico: " + paciente_Modificar.medico +
                "</dd><dd>Observaciones: " + paciente_Modificar.observaciones +
                "<br/><br/>"
                    
        } else {
            alert(res)
            
        }
    })
}


//************************************* */
function listado_Medicamentos(){

    var listado_Medicamentos = document.getElementById("listado-Medicamentos");

    rest.get("/api/medicamento",(estado, res) =>{

        datos_Medicamentos();

        if (estado == 200){
            //console.log("Estado",estado, "Res",res)
            lista_Medicamentos = res;
            //console.log("L",listado_Medicamentos)

            //listado_Medicamentos.innerHTML = "";
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
        }else{
            alert(res)
        }
    });
}

var lista_Medicamentos_Paciente = [];
function medicamentos_Del_Paciente(idPaciente){
    console.log("ID", idPaciente)
    var id_Paciente = idPaciente;
    var nombre_Paciente = ""; 

    rest.get("/api/paciente/"+ id_Paciente,(estado, res) =>{
        if (estado == 200){
            datos_Paciente = res;
            console.log("datos_Paciente",datos_Paciente.nombre) 
            nombre_Paciente = datos_Paciente.nombre;
        }
    });

    // Cogemos el array para poder usar el nombre del medicamento
    rest.get("/api/medicamento",(estado, res) =>{
        if (estado == 200){
            lista_Medicamentos = res;
            //console.log("Lista_Medicamentos",lista_Medicamentos) // Sacamos la lista de los medicamentos donde aparece el nombre, no solamente el indice como en el siguiente     rest.get('/api/paciente/'+ id_Paciente + '/medicacion',function(estado,res){
        }
    });

    medicamentos_Paciente(); // cambiamos de sección a la sección con el listado de medicamentos que existen.
    var listado_Medicamento = document.getElementById('listado-Paciente-Medicamento');
    listado_Medicamento.innerHTML = [];

    var paciente_medicamento = document.getElementById('paciente-medicamento');

    rest.get('/api/paciente/'+ id_Paciente + '/medicacion',function(estado,res){

        //console.log("ID", id_Paciente)
        if(estado==200){
           
            // var f1 = new Date(2023,2,26,18,0,0);
            // console.log("F1",f1) // --> Obtenemos el siguiente REsultado : //F1 Sun Mar 26 2023 18:00:00 GMT+0200 (hora de verano de Europa central)                 
            lista_Medicamentos_Paciente = res;
            //console.log("lista_Medicamentos_Paciente",lista_Medicamentos_Paciente)
            paciente_medicamento.innerHTML = "Medicamentos de: " + nombre_Paciente;  // ME sale el nombre del primer paciente que entro.
         // ¿¿ COMO PODRÍA PONER EL NOMBRE ??? cogiendo la lista con in rest.get del paciente??¿?¿?
            // No hace falta un if para comparar el id que coincida YA que el id introducido por parámetro en la función es el ID del paciente que queremos.
            for (i in lista_Medicamentos_Paciente){
                for (i in lista_Medicamentos){
                    console.log("nombre Medicamento", lista_Medicamentos[i].nombre)
                        listado_Medicamento.innerHTML +=
                        "<dt>Medicamento: " + lista_Medicamentos[i].nombre + // Al coger el nombre del array este, al imprimir por pantalla sale el nombre del medicamento y no el id como está en el array lista_Medicamentos_Paciente
                        "</dt><dd>Fecha Asignación: " + lista_Medicamentos_Paciente[i].fecha_Asignacion + // Error con la  fecha asignación !!!!!!!!!!!!
                        "</dd><dd>Dosis: " + lista_Medicamentos_Paciente[i].dosis + 
                        "</dd><dd>Tomas: " + lista_Medicamentos_Paciente[i].tomas + 
                        "</dd><dd>Frecuencia: " + lista_Medicamentos_Paciente[i].frecuencia +
                        "</dd><dd>Observaciones: " + lista_Medicamentos_Paciente[i].observaciones +
                        // "</dd><dd><button onclick='tomas_Del_Paciente(" + lista_Medicamentos_Paciente[i].medicamento + //Pasamos por parámetro el id del medicamento para la función. !!!
                        // ")'> Tomar Medicación</button>"+
                        "</dd><dd><button onclick='tomas_Del_Paciente(" + lista_Medicamentos_Paciente[i].medicamento + //Pasamos por parámetro el id del medicamento para la función. !!!
                        ")'> Tomas del paciente 1</button></dd>"+
                        "<br/><br/>"                    
                }
            }
        }else {
            paciente_medicamento.innerHTML = "Medicamentos de: " + nombre_Paciente + "   Vacío, ningún medicamento asignado !!"; //Para que aun que de el error se actualice el nombre 
            alert(res)
         }
    });
};


// Tomas paciente solamente debe de ver la información, en el Paciente deberá de haber botones donde poder poner si se ha tomado o no la medicación.
function tomas_Del_Paciente(idm){ //BOTÓN QUE INDICA CUANDO SE HA TOMADO LA PASTILLA, CUANDO CLICA SE GUARDA EL IDM, EL PACIENTE Y LA FECHA EN QUE CLICA

    var listado_Tomas = document.getElementById("listado-Tomas"); // texto de la etiqueta <dl>
    var tomas_paciente = document.getElementById("tomas-Paciente"); // Texto para que aparezca información en el HTML

    // id_Paciente se Coge de antes 
    // console.log("ID OK", id_Paciente)
    // console.log("Idm OK", idm_Tomas)

    rest.get('/api/paciente/' + id_Paciente + '/medicacion/' + idm, (estado, res) => {

         tomas_paciente.innerHTML = nombre_Paciente + ' ha tomado la siguiente medicación:';//*************** */ COMO PONER LA IDm ?¿?¿?¿?
    
     //LA RESPUESTA DEBERÍA SER EL ARRAY DE TOMAS Y ME LLEGA ARRAY DE MEDICACIÓN (lista_Medicacion)
        if (estado == 200) {
            pagina_Tomas();

            tomas_Paciente = res
            //console.log("respuesta-->",tomas_Paciente)
            console.log("tomas_Paciente", tomas_Paciente)
            switch (tomas_Paciente.medicamento) {
                case 1:
                    tomas_Paciente.medicamento = 'Ibuprofeno';
                  break;
                case 2:
                    tomas_Paciente.medicamento = 'Ibuprofeno +';          
                    break;
                case 3:
                    tomas_Paciente.medicamento = 'Paracetamol';          
                    break;
                case 4:
                    tomas_Paciente.medicamento = 'Morfina ++';          
                    break;
                  case 5:
                    tomas_Paciente.medicamento = 'Pastilla azul';
                    break;
                default:    
              }

            listado_Tomas.innerHTML = ""; // vaciamos la lista cada vez que busquemos, si no salen las tomas anteriormente visitadas
                for(i in tomas_Paciente){

                        // console.log("Id_P", id_Paciente)
                        // console.log("res id",tomas_Paciente[i].paciente)
                        listado_Tomas.innerHTML += 
                        "<dt>IDm:" + tomas_Paciente[i].medicamento +  // Podría guardar en vriables globales los nombres para que aparezca el nombre en vez del ID
                        "</dt><dd>Paciente:" + tomas_Paciente[i].paciente +
                        "</dd><dd>Fecha Toma:" + tomas_Paciente[i].fecha_Asignacion +
                        "<br/><br/>"
            }             
        } else {
           alert(res)   
        }
    });
};

function info_Paciente(idPaciente){
    id_Paciente = idPaciente;

    var informa_Paciente = document.getElementById("info-Paciente")

    rest.get("/api/paciente/" + id_Paciente, function(estado,res){
        
        if (estado == 200){
            pagina_info_Paciente(); // CAMBIA SECCION
            // console.log("OOOOOOOOOW",res)
            // console.log("EEEEEEEEEw", id_Paciente)
            informa_Paciente.innerHTML ="";

            nombre_Paciente = res.nombre;
            if(res.codigo_Acceso == ""){ // Muestra 'No asignado' a los codigos_Acceso que están vacíos, o sea, los de los pacientes iniciales del datos.js

                res.codigo_Acceso = "No asignado"
            }

            informa_Paciente.innerHTML +=
                "<dt>ID:" + res.id +  // Podría guardar en vriables globales los nombres para que aparezca el nombre en vez del ID
                "</dt><dd>Nombre:" + res.nombre +
                "</dd><dd>Apellidos:" + res.apellidos +
                "</dd><dd>Fecha Nacimiento:" + res.fecha_Nacimiento +
                "</dd><dd>Genero:" + res.genero +
                "</dd><dd>Medico:" + res.medico +
                "</dd><dd>Código Acceso 80:" + res.codigo_Acceso +
                "</dd><dd>Observaciones:" + res.observaciones +
                "</dd><dd><button onclick='editar_Pacientes(" + id_Paciente + 
                ")'> Editar Paciente 11 </button></dd>"+
                "</dd><dd><button onclick='medicamentos_Del_Paciente(" + id_Paciente +
                ")'> Medicamentos del Paciente 1</button></dd>"+
                "</dd><dd><button onclick='pagina_Nueva_Medicacion()'> Añadir Nueva medicación</button></dd>"+
                "<br/><br/>"
        }else{
            alert(res);
        }
    });
};


//************************** SE DEBE EJECUTAR EN: http://localhost:3000/medico/      ************************************************************************************** */ 


// ************** POST LOGIN MEDICO ***********************



function login_Medico(){

    var medico = {
        // Cogemos los datos del Html
        login: document.getElementById("login").value,
        password: document.getElementById("password").value
    }
    

    // console.log(medico);
    // POST y GET Asincrono se ejecutan a la vez si esta identado al mismo nivel // ----- refrescarPagina() sincrono, se ejecuta él y luego lo uqe haya detrás. 
    // Esta URL Debe ser la misma que la del app.post del servidor_Rest.js que implemente
    // medio aqui en el rest.post es el medico del body
    rest.post("/api/medico/login", medico, (estado,respuesta) => { // lo mismo que poner rest.post("/api/medico/login", medico, function (estado,respuesta){ ...}
        //console.log("Visualizamos", estado,respuesta);
        if (estado == 201){
            //console.log("Autentificación ok")

            conexion = new WebSocket('ws://localhost:4444', "clientes");

            conexion.addEventListener("open", function(event){
                console.log("El paciente esta conectado desde el main");
                //Enviamos la informacion al Servidor para poder identficar la conexion
                conexion.send(JSON.stringify({origen : "medico", idMedico : respuesta}));
            });

            conexion.addEventListener('message', function(event){
                //Convertimos el mensaje de texto a objeto
                var msg = JSON.parse(event.data);
                //Recibimos los Datos que ha enviado el Medico al Servidor Socket
                if (msg.contenido == "pedirMedicación"){
                    var pintarContenido = document.getElementById("mensaje_del_paciente")
                    pintarContenido.innerHTML = ""
                    pintarContenido.innerHTML += "El paciente "+ msg.idPaciente + " necesita pedir una nueva medicación del medicamento "+ msg.idMedicamento + ", mandado a fecha de: "+ msg.fecha
                    // console.log(msg);
                }
                if (msg.contenido == "sientaMal"){
                    var pintarContenido = document.getElementById("mensaje_del_paciente")
                    pintarContenido.innerHTML = ""
                    pintarContenido.innerHTML += "El paciente "+ msg.idPaciente + " le sienta mal el medicamento "+ msg.idMedicamento + ", mandado a fecha de: "+ msg.fecha
                    // console.log(msg);
                }
                if (msg.contenido == "pedircita"){
                    var pintarContenido = document.getElementById("mensaje_del_paciente")
                    pintarContenido.innerHTML = ""
                    pintarContenido.innerHTML += "El paciente "+ msg.idPaciente + " quiere una cita para el día "+ msg.fecha + ", mandado a fecha de: "+ msg.fecha_mensaje
                    // console.log(msg);
                }


                if(msg.contenido == "mensajeError"){
                    alert(msg.mensaje)
                }
            });


            id_Medico = respuesta;
            refrescarPagina(); // nos refresca la página pasando al menú principal
            

            // AQUI DEBERIA DE ESTAR LA FUNCION QUE CARGA EL LISTADO DE PACIENTES QUE TIENE EL MÉDICO

            // En el servidor.js pasamos como respuesta lista_Medico[i].id, por eso obtenemos el id del medico que hace login
            
            var bienvenido = document.getElementById("bienvenido")
            var creando_Paciente = document.getElementById("creando_Paciente")
            rest.get("/api/medico/" + id_Medico, function(est,res){     

// ESTO TAL VEZ PUEDA PONERSE CON VARIABLES GLOBALES EN VEZ DE LLAMAR AL GET PARA VOLVER A SACAR LA INFORMACIÓN.

                // console.log("Prueba",est,res); // obtenemos est = 200 y res={id: 2, nombre: 'Ende', apellido: 'Sun', login: 'ende'}
                //console.log("Prueba2", res.nombre);
                nombre_Medico = res.nombre;
                apellido_Medico = res.apellido;
                //console.log("Apellido", res);

                bienvenido.innerHTML = ""; // vaciamos el html por si hay algo
                // Creamos el contenido nuevo
                bienvenido.innerHTML += "¡Médico: " + nombre_Medico + ", "+ apellido_Medico + "; Con ID: " + id_Medico + " !";  

                // creando_Paciente --> Solamente es donde se crea el botón html
                creando_Paciente.innerHTML = ""; // vaciamos el html por si hay algo
                creando_Paciente.innerHTML += '<button type="text" id ="nuevo_Paciente" onclick="crear_Paciente()"> Crear Paciente </button>';  // Boton creado Dinámicamente
                                                                                                                                // Formulario puesto en el Index
            });                                                                                                 
        }else if(estado == 401){
            //console.log("Autentificación Erronea")
            alert(respuesta);
        }
    })
};



// // ******************* POST CREAR PACIENTE *************************

// variable global id_Medico esta al principio de los POSTS
function crear_Paciente(){
        // Cogemos los datos del HTML 
        var name = document.getElementById("nombre_Paciente").value;
        // console.log("Name",name) 
        var apellidos = document.getElementById("apellidos_Paciente").value;
        var fecha_Nacimiento = document.getElementById("fecha_Nacimiento_Paciente").value; // tipo DATE ?¿?
        var genero = document.getElementById("genero_Paciente").value;
        var codigo_Acceso = document.getElementById("codigo_Acceso_Paciente").value; 
        var observaciones = document.getElementById("observaciones_Paciente").value; // Input cuadro texto grande
    
    // guardamos los datos del HTML de arriba y lo metemos en el body_Paciente, BODY que pasamos con el rest.post( URL, BODY, function(estado,resp))
    var body_Paciente = {

        nombre: name,
        apellidos: apellidos,
        fecha_Nacimiento: new Date(fecha_Nacimiento),
        genero: genero,
        codigo_Acceso: codigo_Acceso,
        observaciones: observaciones

    };
    //console.log ("Nuevo", nuevo_Paciente);
    //console.log("Fecha Formatoooo", fecha_Nacimiento)

    // POST y GET Asincrono se ejecutan a la vez si esta identado al mismo nivel // ----- refrescarPagina() sincrono, se ejecuta él y luego lo uqe haya detrás. 
    // Esta URL Debe ser la misma que la del app.post del servidor_Rest.js que implemente
    // paciente aqui en el rest.post es el paciente del body o el de la variable var json ?¿?¿?¿?
    rest.post("/api/medico/" + id_Medico + "/pacientes", body_Paciente, (estado,respuesta) => { // lo mismo que poner rest.post("/api/medico/login", medico, function (estado,respuesta){ ...}
        // id_Medico se ha definido en el get del LOGIN, si no se tendría que coger para poder usarlo aquí 
        //console.log("Visualizamos", estado, respuesta);
        if (estado == 201){
            
            refrescarPagina();
            
            name.value = "";
            apellidos.value ="";
            fecha_Nacimiento.value = "";
            genero.value ="";
            codigo_Acceso.value ="";
            observaciones.value ="";

            limpiarFormulario(); // Vaciamos los valores introducidos en el formulario para ingresar datos nuevamente.
           

        }else{
            alert(respuesta);
        }
    })
};


// ************ Añadir medicación *************
var lista_Medicamentos ="";
function anyadir_Medicacion(idPaciente){

    var medicamento = document.getElementById("medicamento-paciente").value;
    
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
    //console.log("observ",observaciones)


    // id_Paciente = idPaciente;
    var body_Medicacion = {

        medicamento: medicamento,
        paciente: id_Paciente,
        fecha_Asignacion: new Date(), // SE ASIGNA UNA MEDICACIÓN CON LA FECHA DEL MOMENTO EN QUE SE CLICA
        dosis: dosis,
        tomas: tomas,
        frecuencia: frecuencia,
        observaciones: observaciones
    }
    rest.post("/api/paciente/" + idPaciente + "/medicacion", body_Medicacion, (estado,res)=>{

        if (estado == 201){ 
            // res = lista_Medicacion entera de todos los medicamentos que estén asignados a los pacientes.
            console.log("RESPUESTA",res)
                refrescarPagina();
                
                limpiarFormulario(); // Vaciamos los valores introducidos en el formulario para ingresar datos nuevamente.
                 
            
        }else{
            // refrescarPagina();
                
            // limpiarFormulario(); // Vaciamos los valores introducidos en el formulario para ingresar datos nuevamente.
            
            alert(res);
        }

    });
};



// *************************    PUT Actualizar Paciente ******************************


//var id_Paciente esta al principio de las funcinoes POST

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
            
            refrescarPagina();
            

            nombre_Paciente_Editado.value = "";
            apellidos_Paciente_Editado.value ="";
            fecha_Nacimiento_Paciente_Editado.value = "";
            genero_Paciente_Editado.value ="";
            codigo_Acceso_Paciente_Editado.value ="";
            observaciones_Paciente_Editado.value ="";
            
            limpiarFormulario();

        }else{
            alert(respuesta)
        }

    });

}





















