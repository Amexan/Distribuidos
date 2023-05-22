var contador_Medico = 6;
var lista_Medico = [
    {id: 1 , nombre: "Pauli", apellidos: "Mas", login: "pauli", password: "1" },
    {id: 2 , nombre: "Ende", apellidos: "Sun", login: "ende", password: "2" },
    {id: 3 , nombre: "Hector", apellidos: "Llorens", login: "hector", password: "3" },
    {id: 4 , nombre: "IKat", apellidos: "Tp", login: "katy", password: "4" },
    {id: 5 , nombre: "Pedro", apellidos: "JT", login: "pedro", password: "5" }
    ];

var contador_Paciente = 13;
var lista_Paciente = [
    {id: 1 , nombre: "Carlos", apellidos: "Cozar", fecha_Nacimiento: new Date (2020,0,01,0,0,0), genero: "H", medico: 1, codigo_Acceso: "1", observaciones: "Paciente-1 ok" },
    {id: 2 , nombre: "Mauro", apellidos: "Belda", fecha_Nacimiento: new Date (2020,0,02,0,0,0), genero: "H", medico: 1, codigo_Acceso: "2", observaciones: "Paciente-2 ok"},
    {id: 3 , nombre: "Pablo", apellidos: "Verdú", fecha_Nacimiento: new Date (2020,0,03,0,0,0), genero: "H", medico: 1, codigo_Acceso: "3", observaciones: "Paciente-3 ok"},
    {id: 4 , nombre: "Paco", apellidos: "Llorens", fecha_Nacimiento: new Date (2020,0,04,0,0,0), genero: "H", medico: 1, codigo_Acceso: "4", observaciones: "Paciente-4 ok"},
    {id: 5 , nombre: "Maria", apellidos: "Magdalena", fecha_Nacimiento: new Date (2020,0,05,0,0,0), genero: "M", medico: 2, codigo_Acceso: "5", observaciones: "Paciente-5 ok"},
    {id: 6 , nombre: "Iris", apellidos: "Diez", fecha_Nacimiento: new Date (2020,0,06,0,0,0), genero: "M", medico: 2, codigo_Acceso: "6", observaciones: "Paciente-6 ok"},
    {id: 7 , nombre: "Arya", apellidos: "Dwinry", fecha_Nacimiento: new Date (2020,0,07,0,0,0), genero: "M", medico: 2, codigo_Acceso: "7", observaciones: "Paciente-7 ok"},
    {id: 8 , nombre: "Jordi", apellidos: "Np", fecha_Nacimiento: new Date (2020,0,08,0,0,0), genero: "H", medico: 2, codigo_Acceso: "8", observaciones: "Paciente-8 ok"},
    {id: 9 , nombre: "Iñaki", apellidos: "Llorens", fecha_Nacimiento: new Date (2020,0,09,0,0,0), genero: "H", medico: 3, codigo_Acceso: "9", observaciones: "Paciente-9 ok"},
    {id: 10 , nombre: "Qian", apellidos: "Gao", fecha_Nacimiento: new Date (2020,0,10,0,0,0), genero: "H", medico: 3, codigo_Acceso: "10", observaciones: "Paciente-10 ok"},
    {id: 11 , nombre: "Jorge", apellidos: "Mas", fecha_Nacimiento: new Date (2020,0,11,0,0,0), genero: "H", medico: 3, codigo_Acceso: "11", observaciones: "Paciente-11 ok"},
    {id: 12 , nombre: "Pedro", apellidos: "Torres", fecha_Nacimiento: new Date (2020,0,12,0,0,0), genero: "H", medico: 3, codigo_Acceso: "12", observaciones: "Paciente-12 ok"}
    ];

var contador_Medicamento = 5;
var lista_Medicamento = [
    {id:1, nombre: "Ibuprofeno", descripcion: "Para el dolor e inflamación", num_dosis: 25, importe:2.5, importe_subvencionado: 0.99},
    {id:2, nombre: "Ibuprofeno +", descripcion: "Para el dolor e inflamación, mayor cantidad", num_dosis: 50, importe:3.5, importe_subvencionado: 1.99},
    {id:3, nombre: "Paracetamol", descripcion: "Para el dolor", num_dosis: 20, importe:2.5, importe_subvencionado: 0.99},
    {id:4, nombre: "Morfina ++", descripcion: "Para el dolor, Mayor Potencia", num_dosis: 30, importe:3, importe_subvencionado: 1.3},
    {id:5, nombre: "Pastilla azul", descripcion: "Placebo", num_dosis: 50, importe:2.5, importe_subvencionado: 0.99},
];

var contador_Medicacion = 5;
var lista_Medicacion = [ // Un paciente NO puede tener el mismo medicamento 2 o más veces
    {medicamento: 5, paciente: 1, fecha_Asignacion: new Date (2022,1,1,0,0,0), dosis: 1, tomas: 4, frecuencia: 0.25, observaciones: "ok-1"},
    {medicamento: 4, paciente: 1, fecha_Asignacion: new Date (2023,4,18,15,0,0), dosis: 2, tomas: 2, frecuencia: 0.5, observaciones: "ok-2"},
    {medicamento: 3, paciente: 2, fecha_Asignacion: new Date (2022,1,03,0,0,0), dosis: 2, tomas: 1, frecuencia: 0, observaciones: "ok-3"}, // Toma única
    {medicamento: 4, paciente: 3, fecha_Asignacion: new Date (2023,4,18,01,15,0), dosis: 2, tomas: 8, frecuencia: 0.5, observaciones: "ok-4"},
    {medicamento: 5, paciente: 3, fecha_Asignacion: new Date (2022,1,05,0,0,0), dosis: 2, tomas: 10, frecuencia: 1, observaciones: "ok-5"}, // Enfermo Crónico
];

var contador_Tomas = 3;
var lista_Tomas = [
    {medicamento: 5, paciente: 1, fecha_Asignacion: new Date (2020,1,1,0,0,0)},
    {medicamento: 5, paciente: 1, fecha_Asignacion: new Date (2021,4,18,15,0,0)},
    {medicamento: 4, paciente: 1, fecha_Asignacion: new Date (2022,1,1,0,0,0)},
    {medicamento: 4, paciente: 1, fecha_Asignacion: new Date (2023,4,18,15,0,0)},
    {medicamento: 3, paciente: 2, fecha_Asignacion: new Date (2020,1,03,0,0,0)},
    {medicamento: 4, paciente: 3, fecha_Asignacion: new Date (2023,4,18,01,15,0)},
    {medicamento: 5, paciente: 3, fecha_Asignacion: new Date (2022,1,05,0,0,0)},
];


// Exportamos las vatiables para poder usarlas en el servidor_Rest.js
module.exports.lista_Medico = lista_Medico;
module.exports.contador_Medico = contador_Medico;
module.exports.lista_Paciente = lista_Paciente;
module.exports.contador_Paciente = contador_Paciente;
module.exports.lista_Medicamento = lista_Medicamento;
module.exports.contador_Medicamento = contador_Medicamento;
module.exports.lista_Medicacion=lista_Medicacion;
module.exports.contador_Medicacion = contador_Medicacion;
module.exports.lista_Tomas = lista_Tomas;
module.exports.contador_Tomas = contador_Tomas;
