const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
var query;
router.route('/')
.post((req, res) =>{
    const {nombreUsuario, password} = req.body;	
        if(nombreUsuario && password){
            query = `SELECT * FROM Usuario WHERE nombreUsuario = ? AND password = ?;`
            mysqlConnection.query(query, [nombreUsuario, password], (err, rows, fields) =>{
                if(!err){
                    if (rows.length > 0) {
                        req.session.loggedin = true;
                        req.session.nombreUsuario = nombreUsuario;
                        req.session.tipoUsuario = rows[0].tipoUsuario;
                        res.redirect('/alumnos/grupo');
                    } else {
                        res.send('Incorrect Username and/or Password!');
                    }			    
                    res.end();
                }else{
                    console.log(err);
                }
            })    
        }else{
            res.end();
        }
        
    
    //    res.send('Please enter Username and Password!');
	//	res.end();
    
        

})


module.exports = router;


