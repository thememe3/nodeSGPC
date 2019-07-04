const express = require ('express');
const router = express.Router();

const mysqlConnection = require ('../database');

var query;
var fechas= [];

router.route('/')
.get((req,res) =>{
    query = `SELECT grado,fecha,auditorio FROM Fecha_Proyecto`;
    mysqlConnection.query(query, (err, rows, fields) =>{
        if(!err){
            fechas=rows;
            res.json(fechas);
        }else{
            console.log(err);
        }
        

    });
});



module.exports = router;