const bcryptjs = require('bcryptjs');
const session = require('express-session');
const express = require('express');
const { route } = require('express/lib/router');
const login = express.Router();
const mysqlconnection = require('../dabase');

login.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

login.post('/login', async(req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passhash = await bcryptjs.hash(pass, 8);
    if(user && pass){
        mysqlconnection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.json({Status:'Credenciales incorrectas'});
            } else{
                req.session.loggedin=true
                req.session.name = results[0].user

                res.json({Status:'Sesion activa: ' + user});
               
            }
        });  
        } 
    });

    module.exports = login;