const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

//settings 
app.set('port', process.env.PORT || 3001);



const alumnosRoutes= require('./routes/alumnos');
const profesoresRoutes = require('./routes/profesores');
const fechasRoutes = require('./routes/fechas');
const loginRoutes = require('./routes/login')
//middlewares

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());





//routes
app.use('/alumnos',alumnosRoutes);
app.use('/profesores',profesoresRoutes);
app.use('/fechas',fechasRoutes);
app.use('/login',loginRoutes);

//start server
app.listen( app.get('port') , ()=>{
    console.log('server on port ', app.get(port) );
});