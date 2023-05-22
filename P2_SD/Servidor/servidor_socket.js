var datos = require("./datos.js");
var http = require("http");
const { log } = require("console");
var httpServer = http.createServer();

var WebSocketServer = require("websocket").server;
var wsServer = new WebSocketServer({
    httpServer : httpServer
});

var puerto = 4444;
/*------------------------------------------------------------------------------------------------------------------------------------------------*/
//Ponemos el Servidor a la Escucha en ese Puerto
httpServer.listen(puerto, function(){
    console.log("Servidor escuchando en el puerto " + puerto);
});

var clientes = [];

wsServer.on("request", function(request){
    //Aceptamos la Conexion del Cliente (pacientes es un Protocolo)
    var conexion = request.accept("clientes", request.origin);
    var cliente = {conexion : conexion};//Guardamos al Cliente que se ha conectado
    //Guardamos la Conexion del Cliente
    clientes.push(cliente);
    console.log("El cliente esta conectado. En total hay " + clientes.length);
    /*------------------------------------------------------------------------------------------------------------------------------------------------*/
    //En esta Parte se recibiran todos los Mensajes
    conexion.on("message", function(message){
        if(message.type === "utf8"){
            //Convertir de Texto a Objeto
            var msg = JSON.parse(message.utf8Data); 

            //Si el origen coincide identificamos al medico 
            if (msg.origen == "medico"){
                //Guardamos el id del Medico cuando se conecta
                var idMedico = msg.idMedico;
                //Identificar las conexiones (id + origen)
                cliente.id = idMedico;
                cliente.origen = "medico";
                // console.log(cliente);
            }

            //Si el origen coincide identificamos al paciente 
            if (msg.origen == "paciente"){
                //Guardamos el id del Paciente
                var idPac = msg.idPaciente;
                //Identificar las conexiones (id + origen)
                cliente.id = idPac;
                cliente.origen = "paciente";
                // console.log(cliente);
            }

            if (msg.contenido == "mensajeAlPaciente"){
                var idPaciente = msg.paciente
                var mensaje = msg.mensaje
                

                // console.log("este mensaje viene del medico al paciente", msg);
                var check = false
                for(var i in clientes){
                    if (clientes[i].id == idPaciente && clientes[i].origen == "paciente"){
                        check = true
                        clientes[i].conexion.sendUTF(JSON.stringify({contenido: "mensaje_del_medico", mensaje: mensaje}));
                    }
                }
                if(check == false){
                    conexion.sendUTF(JSON.stringify({contenido: "mensajeError", mensaje: "El paciente no está conectado"}));
                }
            }

            if (msg.contenido == "pedirMedicación"){
                var medico_a_enviar = msg.medico_del_paciente
                var idPaciente = msg.paciente
                var idMedicamento = msg.idMedicamento
                var fecha_actual = new Date()

                var check = false;
                for(var i in clientes){
                    if (clientes[i].id == medico_a_enviar && clientes[i].origen == "medico"){
                        check = true
                        clientes[i].conexion.sendUTF(JSON.stringify({contenido: "pedirMedicación", idPaciente: idPaciente, idMedicamento: idMedicamento, fecha:fecha_actual}));
                    }
                }
                if(check == false){
                    conexion.sendUTF(JSON.stringify({contenido: "mensajeError", mensaje: "El medico no está conectado"}));
                }

            }
            if (msg.contenido == "sientaMal"){
                var medico_a_enviar = msg.medico_del_paciente
                var idPaciente = msg.paciente
                var idMedicamento = msg.idMedicamento
                var fecha_actual = new Date()
                var check = false;
                for(var i in clientes){
                    if (clientes[i].id == medico_a_enviar && clientes[i].origen == "medico"){
                        check = true
                        clientes[i].conexion.sendUTF(JSON.stringify({contenido: "sientaMal", idPaciente: idPaciente, idMedicamento: idMedicamento, fecha:fecha_actual}));
                    }
                }
                if(check == false){
                    conexion.sendUTF(JSON.stringify({contenido: "mensajeError", mensaje: "El medico no está conectado"}));
                }
                // console.log(msg);
            }
            if (msg.contenido == "pedirCita"){
                // console.log("Aquí",msg);

                var medico_a_enviar = msg.medico_del_paciente
                var idPaciente = msg.paciente
                var fecha = msg.fecha
                var fecha_actual = new Date()
                var check = false;

                for(var i in clientes){
                    if (clientes[i].id == medico_a_enviar && clientes[i].origen == "medico"){
                        // console.log("Entra hasta aquí");
                        check = true
                        clientes[i].conexion.sendUTF(JSON.stringify({contenido: "pedircita", idPaciente: idPaciente, fecha: fecha, fecha_mensaje: fecha_actual}));
                    }
                }
                if(check == false){
                    conexion.sendUTF(JSON.stringify({contenido: "mensajeError", mensaje: "El medico no está conectado"}));
                }
                // console.log(msg);
            }
        }
    });
    /*------------------------------------------------------------------------------------------------------------------------------------------------*/
    //En esta Parte se Cortara la Conexion del Cliente cuando se Desconecta
    conexion.on('close', function(){
        for (var i = 0; i < clientes.length; i++){
            //Comprobamos que es el mismo cliente antes de cortarle la conexion
            if (clientes[i] == cliente){
                clientes.splice(i, 1);
            }
        }
        console.log("Un cliente se ha desconectado ahora hay " + clientes.length);
    });
});