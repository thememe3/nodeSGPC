const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const {}
var admins;
var query;

router.route('/alumnos')
.get((req,res) =>{
    query = `SELECT a.matricula, a.nombres,
    a.apellidos, a.statusAlumno, u.password FROM
    Alumno a INNER JOIN Usuario u on a.IdUsuario = u.IdUsuario 
    WHERE a.statusAlumno=1;`;
    mysqlConnection.query(query, (err,rows,fields) =>{
            if(!err){
                admins=rows;
                res.json(admins);
            }else{
                console.log(err);
            }
    });
}).put((req,res) =>{
    const {nombres} = req.body;
    query = `UPDATE Alumno SET statusAlumno=0 WHERE nombres=? ;`;
    mysqlConnection.query(query, [nombres], (err,rows,fields) =>{
        if(!err){
            admins = rows;
            res.json(alumno);
        }else{
            console.log(err);
        }
    });
});


router.route('/alumnosRes')
.put((res,req) =>{
    const {password, nombreUsuario} = req.body;
    query = `UPDATE Usuario SET password= ?
    WHERE nombreUsuario= ?;`;
    mysqlConnection( query , [password, nombreUsuario] , (err, rows, fields) => {
        if(!err){
            admins = rows;
            res.json(alumno);
        }else{
            console.log(err);
        }
    });
});

router.route('/profesores')
.get((res,req) =>{
    query = `SELECT p.nombresProfesor, "
    "p.apellidosProfesor, p.codigoProfesor, u.password "
    "FROM Profesor p INNER JOIN Usuario u ON p.IdUsuario=u.IdUsuario;`
    mysqlConnection.query(query , (err, rows, fields) =>{
        if(!err){
            admins = rows;
            res.json(admins);
        }else{
            console.log(err);
        }
    });
});

router.route('/statusProfesor')
.get((res,req) =>{
    const {nombresProfesor} = req.body;
    query = `SELECT statusProfesor FROM Profesor "
    + "WHERE nombresProfesor= ?;`;
    mysqlConnection.query(query, [nombresProfesor], (err, rows, fields) =>{
        if(!err){
            admins = rows;
            res.json(admins);
        }
        else{
            console.log(err);
        }
    });
});


