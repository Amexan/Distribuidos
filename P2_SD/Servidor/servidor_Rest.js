// prueba ejemplo 2, este archivo está modificado

// CÓDIGOS DE RESPUESTA REST
// 200 OK (GET, PUT, DELETE)
// 201 CREATED (PUT, POST)
// 204 NO CONTENT (no hay contenidos)
// 400 BAD REQUEST
// 401 UNAUTHORIZED
// 403 FORBIDDEN (no hay permiso para entrar)
// 404 NOT FOUND
// 406 NOT ACCEPTABLE (no se permite el formato de los datos)


//res.status(404).json(paciente_escogido == "") // Funciona un poco como el console.log muestra para comprobar lo que sale

// req.params. ... para GET y ??
// req.body. .... para POST ??

var express = require("express"); // carga el express
var app = express(); // Llama al método express



// Cargamos las variables de datos del archivo datos.js donde se encuentran los arrays.
let datos = require('./datos.js'); 

// Obteniendo las variables de la carpeta datos.js
var lista_Medico = datos.lista_Medico;
var contador_Medico= datos.contador_Medico;
var lista_Paciente = datos.lista_Paciente;
var contador_Paciente= datos.contador_Paciente;
var lista_Medicamento = datos.lista_Medicamento;
var contador_Medicamento= datos.contador_Medicamento;
var lista_Medicacion = datos.lista_Medicacion;
var contador_Medicacion= datos.contador_Medicacion;
var lista_Tomas = datos.lista_Tomas;
var contador_Tomas= datos.contador_Tomas;



// utiliza el /medico para guardarla como url de la carpeta /Medicos
app.use("/medico", express.static("../Medicos"));  
app.use("/paciente", express.static("../Pacientes"))

// json spaces Sirve para separar los datos y verlos visualmente mejor en la página web, 
// de este modo no salen todos los datos seguidos, si no sale cada dato en una línea
app.set('json spaces', 1)
app.use(express.json()); 



// Empieza aquí
// Variable globales
var lista_Medicacion_Segun_Paciente = [];

// *****************   Funciones GET  *****************

// ***************** GET MEDICAMENTO ***************************

app.get("/api/medicamento",function(req,res){

    // creamos un if para que mande un error si la lista está vacía
    if (lista_Medicamento.length != 0 ){
        return res.status(200).json(lista_Medicamento) // Solo se manda un res.status en cada apartado. si se manda uno el siguiente ya no va a mandarse.

    }else{
        return res.status(204).json("La lista de medicamentos esta vacía!!") // si esta vacia es que no hay medicamentos en la lista_Medicamentos del archivo datos.js
    }
});


app.get("/api/medicamento/:idm",function(req,res){
    var idm = req.params.idm;
    var medicamento_Escogido = {};
    var concuerda_Medicamento = false;
   // console.log("idm: ", idm);
    if (lista_Medicamento.length != 0 ){
        for(var i=0; i<lista_Medicamento.length; i++){
            if(lista_Medicamento[i].id == idm){
                concuerda_Medicamento = true;
                medicamento_Escogido["ID:"] = lista_Medicamento[i].id;
                medicamento_Escogido["Nombre:"] = lista_Medicamento[i].nombre;
                medicamento_Escogido["Descripción:"] = lista_Medicamento[i].descripcion;
                // SI NO PONEMOS ALGUN VALOR NO APARECERÁ CUANDO SE REPRESENTE AL UTILIZAR EL GET aunque lo pongamos en el main !!
                //medicamento_Escogido["Nº Dosis:"] = lista_Medicamento[i].num_dosis;
                medicamento_Escogido["Importe:"] = lista_Medicamento[i].importe;
                medicamento_Escogido["Importe Subvencionado:"] = lista_Medicamento[i].importe_subvencionado;
            //console.log("entra al bucle")
                return res.status(200).json(medicamento_Escogido);
            }
        }
        if(concuerda_Medicamento == false){ 
            return res.status(404).json("No se Encuentra el Medicamento Seleccionado!");
        }
    }else{
        return res.status(204).json("La lista de medicamentos esta vacía!!") // si esta vacia es que no hay medicamentos en la lista_Medicamentos del archivo datos.js
    }
});

// ***************** GET PACIENTE POR ID ***************************

// app.get("/api/paciente/:id",function(req,res){
//     // coge el valor del parametro id que se introduce en la url del localhost:3000/api/paciente/:id (de este :id)
//     var id = req.params.id;
//     var paciente_escogido = {}; // Elemento vacío para usar como elemento json.
//     // Creo booleano para el if, ya que si no encunetra el id == id entonces ejecuta el else y para debido a que se manda un res.status, los cuales solo se pueden mandar una vez.
//     var concuerda_Paciente = false;
//     if (lista_Paciente.length != 0 ){ // si la lista no está vacía, entonces entra
//         // res.status(200).json("entra") // comprobamos que netra
//         for(var i=0; i<lista_Paciente.length; i++){
//             // cogemos el valor del id de cada paciente, id paciente 0, id paciente 1 , id paciente n y lo comparamos con 
//             // el id que introducimos en el navegador (:id)
//             if(lista_Paciente[i].id == id){
//                 concuerda_Paciente = true;
//               
//                 // Para que salga todo debemos de hacerlo en formato json.
//                 paciente_escogido["id"] = lista_Paciente[i].id; // indicamos el texto para guardar la variable en el elemento vacío y le guardamos el valor escogido 
//                 paciente_escogido["nombre"] = lista_Paciente[i].nombre;
//                 paciente_escogido["apellidos"] = lista_Paciente[i].apellidos;
//                 paciente_escogido["medico"] = lista_Paciente[i].medico;
//                 paciente_escogido["observaciones"] =lista_Paciente[i].observaciones;
                    
//                 //console.log("paciente_escogido",paciente_escogido);
//                 return res.status(200).json(paciente_escogido);
//             } 
//         }
//             // fuera bucle
//         if(concuerda_Paciente == false){
            
//             return res.status(404).json("No se Encuentra el Paciente Seleccionado!");
//             //res.status(404).json(paciente_escogido == "") // Funciona un poco como el console.log muestra para comprobar lo que sale
//         }
//     }else{
//         return res.status(204).json("La lista de Pacientes esta vacía!!") 
//     }
// });

// MISMO QUE EL DE ARRIBA PERO MANDA LA LISTA ENTERA NO UN JSON !!!

app.get("/api/paciente/:id",function(req,res){
    // coge el valor del parametro id que se introduce en la url del localhost:3000/api/paciente/:id (de este :id)
    var id = req.params.id;
    var paciente_escogido = []; // Elemento vacío para usar como elemento json.
    // Creo booleano para el if, ya que si no encunetra el id == id entonces ejecuta el else y para debido a que se manda un res.status, los cuales solo se pueden mandar una vez.
    var concuerda_Paciente = false;
    if (lista_Paciente.length != 0 ){ // si la lista no está vacía, entonces entra
        // res.status(200).json("entra") // comprobamos que netra
        for(var i=0; i<lista_Paciente.length; i++){
            // cogemos el valor del id de cada paciente, id paciente 0, id paciente 1 , id paciente n y lo comparamos con 
            // el id que introducimos en el navegador (:id)
            if(lista_Paciente[i].id == id){

                concuerda_Paciente = true;
                //console.log("EEEEEEEEEEEEE", lista_Paciente[i])
                return res.status(200).json(lista_Paciente[i]);
            } 
        }
            // fuera bucle
        if(concuerda_Paciente == false){
            
            return res.status(404).json("No se Encuentra el Paciente Seleccionado!");
            //res.status(404).json(paciente_escogido == "") // Funciona un poco como el console.log muestra para comprobar lo que sale
        }
    }else{
        return res.status(204).json("La lista de Pacientes esta vacía!!") 
    }
});





// ***************** GET MEDICO POR ID ***************************
app.get("/api/medico/:id", function(req, res){

    var id = req.params.id;
    var medico_escogido = {};
    var concuerda_Medico = false;
    if(lista_Medico.length != 0){
        for(var i=0; i<lista_Medico.length; i++){
            if(lista_Medico[i].id == id){

                concuerda_Medico = true;
                medico_escogido["id"] = lista_Medico[i].id;
                medico_escogido["nombre"] = lista_Medico[i].nombre;
                medico_escogido["apellido"] = lista_Medico[i].apellidos;
                medico_escogido["login"] = lista_Medico[i].login;

                res.status(200).json(medico_escogido);
            }
        }
        if(concuerda_Medico == false){
            res.status(404).json("No se Encuentra el Medico Seleccionado!");
        }
    }else{
        res.status(204).json("La Lista de Medicos esta vacía!!");
    }
});

// ***************** GET PACIENTES SEGÚN MEDICO  ***************************

app.get("/api/medico/:id/pacientes", function(req, res){

    var id = req.params.id;
    var lista_Paciente_Segun_Medico = [];
    if(lista_Medico.length != 0){
        if(lista_Paciente.length !=0){
            for(var i=0; i<lista_Paciente.length; i++){
                // Buscamos en la lista pacientes los medicos (id) que sean igual que el introducido en el navegador (:id)
                if(lista_Paciente[i].medico == id){ 
                    //console.log(lista_Paciente[i])
                    lista_Paciente_Segun_Medico.push(lista_Paciente[i]);
                    //console.log(lista_Paciente_Segun_Medico); 
                }
            }
            if(lista_Paciente_Segun_Medico.length != 0){
                return res.status(200).json(lista_Paciente_Segun_Medico);
                // fuera para que introduzca todos yy luego haga el res.status , si no al hacer el primer res.status se cancela
                // si esta fuera saca el último 
            }
            else{
                return res.status(404).json("Ningún paciente asignado a dicho Médico!!");
            }
        }
        else{
            res.status(204).json("La lista de Pacientes esta vacía!!") 
        }
    }else{
        res.status(204).json("La Lista de Medicos esta vacía!!");
    }
});


// ***************** GET MEDICACIÓN SEGÚN PACIENTES  ***************************
app.get("/api/paciente/:id/medicacion", function(req, res){
    var id = req.params.id; 
    if(lista_Paciente.length != 0){
        
        if(lista_Medicacion.length !=0){
            var lista_Medicacion_Segun_Paciente = [];
            for(var i=0; i<lista_Medicacion.length; i++){

                // Buscamos en la lista pacientes los medicos (id) que sean igual que el introducido en el navegador (:id)
                if(lista_Medicacion[i].paciente == id){
                    
                    console.log(lista_Medicacion[i])
                    lista_Medicacion_Segun_Paciente.push(lista_Medicacion[i]);
                    //console.log(lista_Medicacion_Segun_Paciente); 
                }
            }
                // console.log("Medicacion según paciente", lista_Medicacion_Segun_Paciente);
                res.status(200).json(lista_Medicacion_Segun_Paciente);
                // fuera bucle para que introduzca todos yy luego haga el res.status , si no al hacer el primer res.status se cancela
        }
        else{
            res.status(204).json("La lista de Pacientes esta vacía!!") 
        }
    }else{
        res.status(204).json("La Lista de Medicos esta vacía!!");
    }
});

// ***************** GET TOMAS SEGÚN MEDICAMENTO DEL PACIENTE  ***************************
app.get("/api/paciente/:id/medicacion/:idm", function(req, res){

    var id = req.params.id;
    var idm = req.params.idm;
    var lista_Tomas_Segun_Medicamento_Paciente = [];

    if(lista_Paciente.length != 0){
        if(lista_Medicacion.length != 0){
            if(lista_Tomas.length !=0){
                for(var i=0; i<lista_Tomas.length; i++){
                    // Como medicacion y paciente es igual en lista_Medicacion y lista_Tomas da lo mismo don de comparemos.
                    // comparamos que id paciente sea igual a :id y que id medicamento sea igual a :idm
                    if(lista_Tomas[i].paciente == id && lista_Tomas[i].medicamento == idm)
                    lista_Tomas_Segun_Medicamento_Paciente.push(lista_Tomas[i]);
                    //console.log("lista_Tomas",lista_Tomas[i])
                }
                    res.status(200).json(lista_Tomas_Segun_Medicamento_Paciente);       
            }
            else{
                res.status(204).json("La lista de Tomas esta vacía!!") 
            }
        }else{
            res.status(204).json("La Lista de Medicamentos esta vacía!!");
        }
    }else{
        res.status(204).json("La Lista de Pacientes esta vacía!!");
    }
});


// ********************** Funciones POST *********************************
// Sirven para crear

// URL igual que en el main-> rest.post("/api/medico/login", medico, (estado,res) => 
app.post("/api/medico/login", function(req, res){

    // Creamos json medico donde recibira la información del 
    // medico = {login: document.getElementById("login").value, password: document.getElementById("password").value}
    // situado en el main.js
   var medico = { //body_Medico
        login: req.body.login, // Cogemos el login del id="login" del body html
        password: req.body.password // Cogemos el password del id="password" del body del html
   };

   // recorremos la lista medicos para comprobar que el login y password sean iguales a los del medico y verificar la identidad, de lo contrario no dejamos acceder
   for(var i = 0; i < lista_Medico.length; i++){
    if(lista_Medico[i].password == medico.password && lista_Medico[i].login == medico.login){
        // Status(200) es el estado del main.js
        // Ponemos return como break lista_Medico[i].id es la respuesta en el main.js
        return res.status(201).json(lista_Medico[i].id); 
    }
   }

   return res.status(401).json("Identificación errónea");
    
});



// ***************** Creamos un nuevo Paciente ******************************
app.post("/api/medico/:id/pacientes", function(req, res) {

    var id_Medico = req.params.id; // cogemos el id del médico pasado por la URL pero en este caso no lo ponemos va directamente
    // se pasa con el app.post(/api/medico/login) como respuesta del status(200).json(lista_Medico[i].id) al URL del rest.post(/api/medico/" + id_Medico + "/pacientes", body_Paciente, function)
    // la cual utiliza la URL donde se inserta el id para cogerlo con req.params.id.
    //console.log("id_Medico", id_Medico);
    for(var i=0; i<lista_Medico.length; i++) {
    
        // Comprobamos que el id del médico sea igual al insertado por la URL
        if(lista_Medico[i].id == id_Medico) {
            
            var paciente = { // body_Paciente
                // la cabecera id, nombre, apellidos,... , hace referencia a la variable que guarda los datos en el archivo datos.js
                id: contador_Paciente,  // contador_Paciente -->variable guardada en datos.js, se coje automáticamente de allí, no hay que ponerlo en el HTML
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                fecha_Nacimiento: req.body.fecha_Nacimiento,
                genero: req.body.genero, 
                medico: id_Medico, // Paciente asignado al médico que lo crea, la variable se coje mediante req.params (URL) 
                codigo_Acceso: req.body.codigo_Acceso, 
                observaciones: req.body.observaciones
            };
        }
    }
    //console.log("PACiente", paciente.nombre);
        if(paciente.nombre == "" || paciente.apellidos == "" || paciente.fecha_Nacimiento == "" || paciente.genero == "" || paciente.codigo_Acceso == ""){
              
            return res.status(401).json("ERROR Introduce datos");
        }else if(paciente.genero != "M" && paciente.genero!= "H"){
            console.log("Genero",paciente.genero)
            return res.status(401).json("Intoduce Genero Correcto: M/H");              
        }else{
            for (i in lista_Paciente){
                
                if((paciente.codigo_Acceso == lista_Paciente[i].codigo_Acceso) && (paciente.id != lista_Paciente[i].id)){
            
                    return res.status(401).json("Codigo acceso inválido, utilice otro.(ya esta puesto en otro paciente)");
                }else{   
                    lista_Paciente.push(paciente);
                    //console.log("Lista Paciente", lista_Paciente); 
                    contador_Paciente ++;
                    //console.log("Contador", contador_Paciente);
                    return res.status(201).json(paciente); // mostramos el paciente que se acaba de crear y añadido al Array del archivo datos.js 
                }
            }
        }    
});



// *********** Asigna una nueva medicación a ese paciente.
app.post("/api/paciente/:id/medicacion", function(req,res){
    var id_Paciente = req.params.id;
    if(lista_Medicacion != 0){
        if(lista_Paciente.length != 0){
                // console.log("AQUI SI")
                    var body_Medicacion = {
                        medicamento: req.body.medicamento,
                        paciente: id_Paciente,
                        fecha_Asignacion: new Date(), // SE ASIGNA UNA MEDICACIÓN CON LA FECHA DEL MOMENTO EN QUE SE CLICA
                        dosis: req.body.dosis,
                        tomas: req.body.tomas,
                        frecuencia: req.body.frecuencia,
                        observaciones: req.body.observaciones
                    };
                    var body_Tomas = {
                        medicamento: req.body.medicamento,
                        paciente: id_Paciente,
                        fecha_Asignacion: new Date() // SE ASIGNA UNA MEDICACIÓN CON LA FECHA DEL MOMENTO EN QUE SE CLICA
                    };
                    // console.log("ENTRA 1")

                    if(body_Medicacion.medicamento != "" &&  body_Medicacion.dosis != "" && body_Medicacion.tomas != "" && body_Medicacion.fecha != "" && body_Medicacion.frecuencia != "" && body_Medicacion.frecuencia != ""){
                    //    console.log("ENTRA 2")
                        if(body_Medicacion.medicamento> 0 && body_Medicacion.medicamento<=contador_Medicacion){
                        // console.log("ENTRA 3")
                        // console.log("ENTRA 4")
                            for(var i in lista_Medicacion){
                                if(lista_Medicacion[i].paciente == body_Medicacion.paciente && lista_Medicacion[i].medicamento != body_Medicacion.medicamento){
                                    // console.log("lista_Medicacion_Segun_Paciente Antes",lista_Medicacion);
                                    lista_Medicacion.push(body_Medicacion); // añade la medicación que está asignada a un pacientes
                                    // console.log("lista_Medicacion_Segun_Paciente",lista_Medicacion);
                                    
                                    lista_Tomas.push(body_Tomas);
                                    // contador_Medicacion ++; // ***** NO ES un medicamento nuevo en sí, si no que se le asigna un medicamento nuevo al paciente, por lo que el id del medicamento no aumenta, solo hay 5 Medicamentos 
                                    // mandar la toma añadida mandar lista_Medicacion[lista_Medicacion.length-1]
                                    //console.log("Toma añadida", lista_Medicacion[lista_Medicacion.length-1])
                                    return res.status(201).json(lista_Medicacion[lista_Medicacion.length-1]);

                                }else{return res.status(401).json("Medicamento duplicado")}
                            }
                        }else{  return res.status(404).json("Medicamento No Existe")}
                    }else{  return res.status(401).json("ERROR! Introduce datos")}
        }else{  return res.status(204).json("Lista Pacientes vacía")}
    }else{  return res.status(204).json("Lista Medicación vacía")}
});


//*********************************** Funciones PUT ***************************************/

app.put("/api/paciente/:id", function(req,res){

    var id_Paciente = req.params.id;

    var body_Paciente_Actualizado = {

        id: id_Paciente, 
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        fecha_Nacimiento: req.body.fecha_Nacimiento,
        genero: req.body.genero,
        medico: req.body.medico,
        codigo_Acceso: req.body.codigo_Acceso,
        observaciones: req.body.observaciones
    };
    if(lista_Paciente.length != 0){
        for(var i=0; i<lista_Paciente.length; i++) {
        
            // Comprobamos que el id del médico sea igual al insertado por la URL
            if(lista_Paciente[i].id == id_Paciente) {
                if(body_Paciente_Actualizado.medico > 0 && body_Paciente_Actualizado.medico < 6) {
                // el paciente de la lista que coincida con el id que se iguale a los datos nuevos.

                    lista_Paciente[i] = body_Paciente_Actualizado; //AQUI PODRIAMOS PONER QUE AL ACTUALIZAR SI UN ELEMENTO QUEDA VACÍO QUE NO SE EDITE, SI SOBRA TIEMPO INTENTO IMPLEMENTARLO!
                    if( body_Paciente_Actualizado.nombre== "" || body_Paciente_Actualizado.apellidos == "" || body_Paciente_Actualizado.fecha_Nacimiento == "" || body_Paciente_Actualizado.genero== "" || body_Paciente_Actualizado.medico== "" || body_Paciente_Actualizado.codigo_Acceso == ""){
                        
                        return res.status(401).json("Rellena todos los campos")

                    }else if(body_Paciente_Actualizado.genero != "M" && body_Paciente_Actualizado.genero != "H"){

                        return res.status(401).json("Introduzca Genero Correcto: M/H");        

                    }else{
                        return res.status(200).json(lista_Paciente);

                    }
                }else{
                    return res.status(404).json("No existe dicho Médico por favor introduzca un médico válido!");
                }
            }; // sin else por que si le ponemos 
        
        };
        
        return res.status(404).json("Error, paciente no existe o faltan datos");

    }else{
        return res.status(204).json("Lista Pacientes vacía")
    }
});




// app.delete("/api/hospital/:idHospital", function (req, res) {
//     var id = req.params.idHospital;
//     for (var i = 0 ; i<hospitales.length ; i++) {
//         if (hospitales[i].id == id) {
//             hospitales.splice(i, 1);
//             res.status(200).json("Hospital borrado");
//             return;
//         }
//     }
//     res.status(404).json("No se ha encontrado el hospital a borrar");
// });



app.listen(3000);
