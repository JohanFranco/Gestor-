const { check } = require('express-validator');
const {validateResult} = require('../helpers/validateHelper');

const validateCreate  = [
    check('titulo')
        .exists()
        .not()
        .isEmpty(),
    check('descripcion')
        .exists()
        .not()
        .isEmpty(),
    check('estatus')
        .exists()
        .not()
        .isEmpty(),
    check('fecha_entrega')
        .exists()
        .not()
        .isEmpty()
        .isDate(),
        (req, res, next)=>{
            validateResult(req,res,next)
        }
       
]

module.exports = {validateCreate}