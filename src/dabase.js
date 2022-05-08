const mysql = require('mysql');

const mysqlconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    passwors:'',
    database:'gestortareas'
});

mysqlconnection.connect(function(error){
    if(error){
        console.log(error);
        return;
    }else{
        console.log('Mysql connection OK');
    }
});
module.exports= mysqlconnection;