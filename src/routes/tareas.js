const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();
const session = require('express-session');
const mysqlconnection = require('../dabase');
const { validateCreate} = require('../validations/tareas')
router.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

////////////////////// Obtener todos las tareas ////////////////////
router.get('/',(req, res)=>{

  if(req.session.loggedin){

      
    mysqlconnection.query('SELECT id, titulo, fecha_entrega FROM tareas',(error, results)=>{
        if(error){
            throw error;
        }else{
           
            res.json(results);
        }
    });

}else{
    res.json({Status:'Porfavor inicia sesion'})
}
});

////////////////////// Buscar tarea por id ////////////////////
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    mysqlconnection.query('SELECT * FROM tareas WHERE id = ?',[id],(error, results)=>{
        if(error){
            throw error;
        }else{
            res.json(results[0]);
        }
    });
});

////////////////////// Agregar tarea ////////////////////
router.post('/',validateCreate,(req,res)=>{
    const { id, titulo, descripcion, estatus, fecha_entrega, comentarios, responsable, tags}= req.body;
    const query  = `
    
        CALL AddOrPut(?,?,?,?,?,?,?,?);
    `;
        mysqlconnection.query(query, [id, titulo, descripcion, estatus, fecha_entrega, comentarios, responsable, tags],
            (error, results, fields)=>{
                if(!error){
                    res.json({Status:'Tarea guardada'})
                }else{
                    console.log(error);
                }
            })
    });


////////////////////// Actualizar las tareas ////////////////////
router.put('/:id',validateCreate,(req,res)=>{
    const { titulo, descripcion, estatus, fecha_entrega, comentarios, responsable, tags}= req.body;
    const { id } = req.params;

    const query = 'CALL AddOrPut(?,?,?,?,?,?,?,?)';
    mysqlconnection.query(query,[id, titulo, descripcion, estatus, fecha_entrega, comentarios, responsable, tags],
        (error, results)=>{
            if(!error){
                res.json({Status: 'Tarea Actualizada'});
            }else{
                console.log(error);
            }
        });
})

////////////////////// Eliminar las tareas ////////////////////
router.delete('/:id',(req, res)=>{
    const {id} = req.params;
    mysqlconnection.query('DELETE FROM tareas WHERE id = ?',[id],(error, results)=>{
        if(!error){
            res.json({Status:'tarea eliminada'});
        }else{
            console.log(error);
        }
    })
});


module.exports = router;
