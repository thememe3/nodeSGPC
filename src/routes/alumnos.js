const express = require('express');
const router = express.Router();


var alumnos=[];
var query;
const mysqlConnection = require('../database');



router.route('/reinicio')
.put((req, res) =>{
    if(req.session.tipoUsuario =='admin' && req.session.nombreUsuario){
        const {password, nombreUsuario} = req.body;
    query = `UPDATE Usuario SET password= ? WHERE nombreUsuario= ?;`;
        mysqlConnection.query(query, [nombreUsuario, password], (err, rows, fields) =>{
            if(!err){
                alumnos=rows;
            }else{
                console.log(err);
            }
        });
    }else{
        res.send('nada');
    }
    
})

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



router.route('/grupo')
.get((req,res) => {
    if(req.session.tipoUsuario =='admin' && req.session.nombreUsuario){
    const {codigoProfesor} = req.body;
    query = `SELECT DISTINCT a.matricula,a.nombres,a.apellidos FROM
    Grupo_Alumno ga INNER JOIN Alumno a INNER JOIN Profesor_Materia pm INNER JOIN
    Alumno_Proyecto ap ON ga.matricula = a.matricula AND ga.grado = pm.grado WHERE
    Not a.matricula In (Select matricula From Alumno_Proyecto ap) 
    AND pm.codigoProfesor = ?  AND pm.profesorEje = 1 `;
    mysqlConnection.query(query, [codigoProfesor],(err,rows,fields) =>{
        if(!err){
            alumnos=rows;
            var count = Object.keys(alumnos).length;
            if(count == 0){
                query= `SELECT DISTINCT a.matricula,a.nombres,a.apellidos FROM
                Alumno a INNER JOIN Profesor_Materia pm INNER JOIN Grupo_Alumno ga ON 
                ga.grado = pm.grado AND ga.matricula = a.matricula WHERE pm.codigoProfesor =?
                AND pm.profesorEje = 1`;
                mysqlConnection.query(query, [codigoProfesor], (err, rows, fields) =>{
                    alumnos=rows;
                    res.json(alumnos);
                });
            }else{
                res.json(alumnos);
            }
        } else{
            console.log(err);
        }
    });
}
else{
    res.send('no eres perra');
}
});

router.route('/fechaG')
.get((req,res) => {
    const {codigoProfesor} = req.body;
    query= `SELECT DISTINCT fp.IdFecha,fp.fecha,fp.grado FROM Fecha_Proyecto fp
    INNER JOIN Grupo_Alumno ga INNER JOIN Profesor_Materia pm INNER JOIN Profesor p ON
    fp.grado=ga.grado AND pm.codigoProfesor = p.codigoProfesor AND ga.grado = pm.grado 
    WHERE pm.codigoProfesor = ? and pm.profesorEje = 1`;
    mysqlConnection.query(query, [codigoProfesor], (err, rows, fields) =>{
        if(!err){
            alumnos=rows;
        }else{
            console.log(err);
        }
    });
});

router.route('/alumnoCal')
.get((req,res) => {
    const {matricula} = req.body;
    query= `SELECT DISTINCT a.nombres,a.apellidos,pr.numEquipo,pr.nombreEquipo,
    pr.problematica,pc.calificacionFinal FROM Alumno a JOIN Alumno_Proyecto ap JOIN 
    Proyecto_Calificacion pc JOIN Proyecto pr ON ap.IdProyecto = pr.IdProyecto AND
    ap.IdProyecto=pc.IdProyecto WHERE a.matricula =?`;
    mysqlConnection.query(query, [matricula], (err, rows, fields) =>{
        if(!err){
            alumnos=rows;
        }else{
            console.log(err);
        }
    });
});

router.route('/asignarProyecto')
.post((req,res) =>{
const {matricula, idFecha, idHora} = req.body;
query = `INSERT INTO Alumno_Proyecto VALUES( ? , (select IdProyecto from Proyecto order by IdProyecto desc limit 1) ,
? , ? ; `;
mysqlConnection.query(query, [matricula, idFecha, idHora], (err,rows, fields) =>{
    if(!err){
        alumnos=rows;
        res.json(alumnos);
    }else{
        console.log(err);
    }
    });
});

router.route('/crearProyecto')
.post((req,res) =>{
    const {numEquipo, nombreEquipo, problematica} = req.body;
    query = `INSERT INTO Proyecto VALUES(null, ? , ? , ?);`;
    mysqlConnection.query(query, [numEquipo, nombreEquipo, problematica] , (err, rows, fields) =>{
        if(!err){
            alumnos=rows;
            res.json(alumnos);
        }else{
            console.log(err);
        }
    });
    


});





module.exports = router;