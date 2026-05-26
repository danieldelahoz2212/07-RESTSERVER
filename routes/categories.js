const {Router} = require('express');
const { check } = require('express-validator');

const { validatedFields } = require("../middlewares/validate_fields");

const router = Router();

//obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json({
        msg: 'get API - controller'
    });
});

//obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get API - controller'
    });
});

//crear categoria - privado - cualquier persona con un token valido
router.post('/', (req, res) => {
    res.json({
        msg: 'post API - controller'
    });
});

//actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id', (req, res) => {
    res.json({
        msg: 'put API - controller'
    });
});

//borrar categoria - privado - solo admin
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete API - controller'
    });
});

module.exports = router;