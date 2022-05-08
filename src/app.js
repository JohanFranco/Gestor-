const express = require('express');
const session = require('express-session');
const app = express();

//Config server
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/tareas'));
app.use(require('./routes/session'));
//Sercver start
app.listen(app.get('port'),()=>{
    console.log('Server on port ' + app.get('port'));
});