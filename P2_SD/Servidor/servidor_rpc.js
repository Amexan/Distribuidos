// Enlazamos el servidor_rpc.js con el archivo rpc.js de la esta misma carpeta Servidor.
var rpc = require("./rpc.js");
// Enlazamos con archivo datos.js para poder importar los arrays y contadores. En datos.js deben exportarse las variables para poder usarlas aquí.
var datos = require("./datos.js");

// guardamos las variables importadas de datos.js en unas variables nuevas.
var lista_Medico = datos.lista_Medico;
var contador_Medico = datos.contador_Medico;
var lista_Pacientes = datos.lista_Paciente;
var contador_Pacientes = datos.contador_Paciente;
var lista_Medicamento = datos.lista_Medicamento;
var contador_Medicamento = datos.contador_Medicamento;
var lista_Medicacion = datos.lista_Medicacion;
var contador_Medicacion = datos.contador_Medicacion;
var lista_Tomas = datos.lista_Tomas;
var contador_Tomas = datos.contador_Tomas;

// **************** Procedimientos *****************

// ********************     LOGIN    **************************************************
// Usado
function login(codigoAcceso){
    for(var i in lista_Pacientes){
        if(lista_Pacientes[i].codigo_Acceso == codigoAcceso && codigoAcceso != ""){
            // Devolvemos array del paciente con ese código de acceso
            // console.log("lista_Pacientes[i]",lista_Pacientes[i])
            return (lista_Pacientes[i]); 
        }
    } 
    // Nos indica por Terminal si se ha realizado el login erroneo.
    console.log("Acceso Denegado") 
    // Podemos ver en el main si el retorno es "null" igualmente. 
    return (null)
}

// *********************    LISTADO MEDICAMENTOS **************************************
// Usado
function listadoMedicamentos(){
    // Pasamos el array de los medicamentos
    return (lista_Medicamento)

}

// *********************    DATOS MEDICO   ********************************************
// Usado
function datosMedico(idMed){
    // Creamos el objeto con los datos del médico
    var datosMedicoPaciente = {};
    for(var i in lista_Medico){
        // Recorremos el array medicos y el que coincida con el idMedico del paciente que hace el login es el que cogemos los datos.
        if(lista_Medico[i].id == idMed){ 
            // Creamos los datos del Objeto
            datosMedicoPaciente["ID"] = lista_Medico[i].id;
            datosMedicoPaciente["Nombre"] = lista_Medico[i].nombre;
            datosMedicoPaciente["Apellidos"] = lista_Medico[i].apellidos;
            //console.log("datosMedicoPaciente",datosMedicoPaciente)
            // Devolvemos el Objeto
            return(datosMedicoPaciente)
        }
    }
    // Si no existe el Médico se manda null
    console.log("Médico no Existe")
    return (null)
}
// *********************    MEDICACIÓN     *******************************************
// Usado
function medicacion(idPaciente){
    // Creamos una array para guardar los datos de el paciente 
    var lista_Medicacion_Ese_Paciente = [];
    for(var i in lista_Medicacion){
        // Recorremos array medicacion y cogemos los valores que coindican con el del idPaciente
        if(lista_Medicacion[i].paciente == idPaciente){
            // Añadimos los datos de la medicación del paciente
            lista_Medicacion_Ese_Paciente.push(lista_Medicacion[i]);
            //console.log("lista_Medicacion_Ese_Paciente",lista_Medicacion_Ese_Paciente)
        }
    }
    // si " lista_Medicacion_Ese_Paciente " está vacía devulve null
    // Debe estar fuera del bucle por que return() cierra el bucle y solo hace las iteraciones hasta que se ejecuta
    if(lista_Medicacion_Ese_Paciente.length == 0){
        console.log("medicacion NULL")
        return(null)
    }else{
        return(lista_Medicacion_Ese_Paciente);
    }
}

// *********************    LISTADO TOMAS  ********************************************

function listadoTomas(idPaciente, idMedicamento){
    // Creamos array de las tomas del paciente seleccionado
    var lista_Tomas_Ese_Paciente = []; 
    // Igual que en medicacion pero con las tomas.
    // console.log("ENTRA EN listadoTomas")
    for(var i in lista_Tomas){

        if((lista_Tomas[i].paciente == idPaciente) && (lista_Tomas[i].medicamento == idMedicamento)){  
            // console.log("ENTRA condicion listadoTomas")

            lista_Tomas_Ese_Paciente.push(lista_Tomas[i]);
            // console.log("ListadoTomas Solo esas", lista_Tomas_Ese_Paciente)
        }        
    }
    if(lista_Tomas_Ese_Paciente.length == 0){
        console.log("ListadoTomas NULL")
        return(null)
    }else{
        return(lista_Tomas_Ese_Paciente)
    }
}


// *********************    AGREGAR TOMA   ********************************************

function agregarToma(idPaciente, idMedicamento){     
    for (var i in lista_Tomas){
        if((lista_Tomas[i].paciente == idPaciente)&&(lista_Tomas[i].medicamento == idMedicamento)){
    
// *** !!! Como cogemos un objeto, si lo guardamos en una variable y lo editamos se edita el objeto principal 
// ya que lo que editamos es una REFERENCIA al objeto no el objeto en sí.
        // actualizamos la fecha al momento que pulsamos el botón.
            //console.log("nuevaFechaToma",nuevaFechaToma);
            // Como no podemos copiar y cambiar solo el dato de la fecha por lo de la Referencia
            // Creamos una nuevaToma con los datos Nuevos
            var nuevaToma = {
                medicamento: idMedicamento,
                paciente:idPaciente,
                //Es la fecha en el momento de pulsar el botón pasado en String
                fecha_Asignacion: new Date() 
            }
            //console.log("nuevaToma",nuevaToma);
            // Añadimos la nuevaToma en el array de tomas.
            lista_Tomas.push(nuevaToma)   
            return (nuevaToma) 
        }
    }
    return (null)
}
// // *********************    ELIMINAR TOMA  ********************************************

//var FechaAntigua = "";
function eliminarToma(idPaciente, idMedicamento, fecha_Asignacion){
    console.log(idPaciente);
    console.log(idMedicamento);
    console.log(fecha_Asignacion);
    console.log("lista",lista_Tomas);
    // console.log("Fecha antigua", FechaAntigua)
    for (var i in lista_Tomas){
        
        //Cambiamos tipo Stringa a Date para poder comparar
        // console.log("Fecha original", fecha_Asignacion);
        // var fecha_Asignacion_Date = new Date(fecha_Asignacion)
        // console.log("Fecha data", fecha_Asignacion_Date);
        // var fecha_Asignacion_Correcto = fecha_Asignacion_Date.toISOString()
        // console.log("Fecha correcta", fecha_Asignacion_Correcto);

        var fecha_en_string = lista_Tomas[i].fecha_Asignacion.toISOString()
        console.log("Fecha de la lista", fecha_en_string);

        console.log("Compruebo", fecha_en_string == fecha_Asignacion);

        if((lista_Tomas[i].paciente == idPaciente) && (lista_Tomas[i].medicamento == idMedicamento) && (fecha_en_string == fecha_Asignacion)){
            
            console.log("lista_Tomas[i].fecha_Asignacion 'Date'",lista_Tomas[i].fecha_Asignacion);
            console.log("lista_Tomas[i].fecha_Asignacion 'String'",fecha_en_string);
            console.log("fecha_Asignacion", fecha_Asignacion)
            // Eliminamos la toma en la iteración i que cumpla la condición, y 1 representa el número de objetos que borra.
            //console.log("Sin Eliminar la toma marcada", lista_Tomas)
            lista_Tomas.splice(i, 1);
            
            // console.log("Eliminada la toma marcada", lista_Tomas) //Tendremos una menos
            //Devolvemos true
            return (true)
        }
    }
    //Devolvemos False si no se elimina la Toma
    console.log("Toma No Eliminada")
    return (false)
}





// ******************************************************************************
// Crea el servidor RPC
var servidor = rpc.server();
// Se crea una aplicación RPC en el servidor con un identificador determinado, el nombre de la aplicación se usará
// para cuando se cree la app en el main poder tener una referencia a cuál se enlaza.
var app = servidor.createApp("AplicacionHector");


// Creamos las app de cada Procedimiento para poder usarlo en el main.js del paciente.
app.register(login);
app.register(listadoMedicamentos);
app.register(datosMedico);
app.register(medicacion);
app.register(listadoTomas);
app.register(agregarToma);
app.register(eliminarToma);

// app.register();
// app.register();


