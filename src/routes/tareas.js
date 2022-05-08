const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();

const mysqlconnection = require('../dabase');

router.get('/',(req, res)=>{
    mysqlconnection.query('SELECT id, titulo, fecha_entrega FROM tareas',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.json(results);
        }
    });
});

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


router.post('/',(req,res)=>{
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

router.put('/:id',(req,res)=>{
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


router.delete('/:id',(req, res)=>{
    const {id} = req.params;
    mysqlconnection.query('DELETE FROM tareas WHERE id = ?',[id],(error, results)=>{
        if(!error){
            res.json({Status:'tarea eliminada'});
        }else{
            console.log(error);
        }
    })
})
module.exports = router;
