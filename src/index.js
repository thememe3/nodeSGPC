const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();



//settings 
app.set('port', process.env.PORT || 3000);



const alumnosRoutes= require('./routes/alumnos');
const profesoresRoutes = require('./routes/profesores');
const fechasRoutes = require('./routes/fechas');
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express);

//routes
app.use('/alumnos',alumnosRoutes);
app.use('/profesores',profesoresRoutes);
app.use('/fechas',fechasRoutes);

//start server
app.listen( app.get('port') , ()=>{
    console.log('server on port ', app.get('port') );
});