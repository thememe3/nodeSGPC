const express = require('express');
const router = express.Router();
var query;
var profesor = [];
const mysqlConnection = require ('../database');

jsonVacio = (datos, res) =>{
    var count = Object.keys(datos).length;
    if(count == 0){
        res.json('Datos vacios, intente de nuevo');
}else{
    res.json(datos);
}

};



router.route('/eje')
.get((req,res) => {
const {codigoProfesor} = req.body;
    query = `SELECT p.codigoProfesor,pm.grado,pm.profesorEje FROM Profesor_Materia pm JOIN
Profesor p ON p.codigoProfesor = pm.codigoProfesor WHERE p.codigoProfesor = ?;`;
mysqlConnection.query(query ,[codigoProfesor], (err,rows,fields) => {
   if(!err){
       profesor=rows;
       jsonVacio(profesor,res);
        
   } else{
    console.log(err);
   }
    });
});

router.route('/grupos')
.get((req,res) => {
    const {codigoProfesor} = req.body;
    query = `SELECT DISTINCT ga.grado FROM Grupo_Alumno ga INNER JOIN Profesor_Materia pm
    INNER JOIN Profesor p ON ga.grado = pm.grado AND pm.codigoProfesor = p.codigoProfesor 
    WHERE p.codigoProfesor = ?`;
        mysqlConnection.query(query, [codigoProfesor] , (err, rows, fields) =>{
            if(!err){
                profesor = rows;
                jsonVacio(profesor,res);
            } else{
                console.log(err);
            }
        });
});

router.route('/grados')
.get((req,res) => {
    const {codigoProfesor, profesorEje} = req.body;
    query = `SELECT pm.grado FROM Profesor_Materia pm JOIN Profesor p ON p.codigoProfesor = 
    pm.codigoProfesor WHERE p.codigoProfesor = ? AND  pm.profesorEje = ? ;`;
    mysqlConnection.query(query , [codigoProfesor, profesorEje], (err, rows, fields) =>{
        if(!err){
            profesor = rows;
            jsonVacio(profesor,res);
        }else{
            console.log(err);
        }
    });
});

router.route('/calificacion')
.get((req,res) => {
    const {grado} = req.body;
    query = `SELECT DISTINCT p.IdProyecto,p.numEquipo,p.nombreEquipo,p.problematica 
    FROM Proyecto p INNER JOIN Alumno_Proyecto ap INNER JOIN Grupo_Alumno ga ON ga.matricula=ap.matricula 
    AND p.IdProyecto=ap.IdProyecto WHERE ga.grado=?`;
    mysqlConnection.query(query, [grado], (err,rows, fields) =>{
            if(!err){
                profesor = rows;
                jsonVacio(profesor,res);
            }else{
                console.log(err);
            }
    });
});


router.route('/infoAlumno')
.get((req,res) => {
    const {codigoProfesor} = req.body;
    query = `SELECT a.matricula,a.nombres,a.apellidos,ga.grado from Alumno a join Grupo_Alumno ga join
    Profesor_Materia pm on a.matricula = ga.matricula AND ga.grado = pm.grado WHERE pm.codigoProfesor = ?
     AND pm.profesorEje = 1`;
     mysqlConnection.query(query, [codigoProfesor], (err, rows, fields) =>{
        if(!err){
            profesor=rows;
            jsonVacio(profesor,res);
        }else{
            console.log(err);
        }
     });
});

router.route('/alumnoCal')
.get((req,res) => {
    const {grado} = req.body;
    query = `SELECT a.matricula,a.nombres,a.apellidos,pc.calificacionFinal FROM Alumno a JOIN
    Alumno_Proyecto ap JOIN Grupo_Alumno ga JOIN Fecha_Proyecto fp JOIN Proyecto_Calificacion pc ON ga.grado = fp.grado
    AND a.matricula = ga.matricula AND ap.matricula = a.matricula AND ap.IdProyecto = pc.IdProyecto 
    WHERE ga.grado = ?;`;
    mysqlConnection.query(query , [grado], (err, rows, fields) =>{
        if(!err){
            profesor = rows;
            jsonVacio(profesor,res);
        }else{
            console.log(err);
        }
    });
});

router.route('/evaluEqui')
.get((req,res) => {
    const {codigoProfesor} = req.body;
        query = `SELECT pm.grado FROM Profesor_Materia pm JOIN Profesor p ON 
        p.codigoProfesor = pm.codigoProfesor WHERE p.codigoProfesor ='".$_SESSION['nombreUsu']."'
        AND pm.profesorEje = 1;`;
        mysqlConnection(query, [codigoProfesor], (err, rows, fields) =>{
            if(!err){
                profesor = rows;
                jsonVacio(profesor,res);
            }else{
                console.log(err);
            }
        });
});

router.route('/nombreEquipo')
.get((req,res) => {
    const {grado} = req.body;
    query = `SELECT DISTINCT p.IdProyecto,p.numEquipo,p.nombreEquipo,p.problematica FROM
    Proyecto p INNER JOIN Alumno_Proyecto ap INNER JOIN Grupo_Alumno ga ON ga.matricula = ap.matricula AND
     p.IdProyecto = ap.IdProyecto WHERE ga.grado =?;`;
     mysqlConnection.query(query, [grado], (err, rows, fields) =>{
        if(!err){
            profesor=rows;
            jsonVacio(profesor,res);
        }else{
            console.log(err);
        }
     });
});

router.route('/califiProf')
.get((req,res) => {
    const {codigoProfesor} = req.body;
    query = `SELECT DISTINCT p.IdProyecto,p.numEquipo,p.nombreEquipo,p.problematica FROM
    Proyecto p INNER JOIN Alumno_Proyecto ap INNER JOIN Grupo_Alumno ga INNER JOIN Profesor_Materia pm ON
    ga.matricula = ap.matricula AND p.IdProyecto = ap.IdProyecto AND ga.grado = pm.grado WHERE 
    pm.codigoProfesor = ? AND pm.profesorEje = 1;`;
    mysqlConnection.query(query, [codigoProfesor], (err, rows, fields) =>{
        if(!err){
            profesor = rows;
            jsonVacio(profesor,res);
        }else{
            console.log(err);
        }
    });
});


router.route('/consultaCalif')
.get((req,res) => {
    const {proyecto} = req.body;
    query = `SELECT p.nombresProfesor,p.apellidosProfesor,c.puntualidad,c.presentacionPersonal,
    c.expresionOral,c.organizacionEquipo,c.apoyosVisuales,c.contenidoTematico,c.dominioTema,c.recomendaciones FROM
    Calificacion c INNER JOIN Profesor p ON c.codigoProfesor = p.codigoProfesor WHERE c.IdProyecto =?`;
    mysqlConnection.query(query, [proyecto], (err, rows, fields) =>{
        if(!err){
            profesor = rows;
            jsonVacio(profesor,res);
        }else{
            console.log(err);
        }
    });
});

module.exports = router;