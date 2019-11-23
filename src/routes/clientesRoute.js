const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientesController');



router.post('/', controller.post)
router.get('/', controller.get)
router.get('/compradoras', controller.getCompradoras)
router.get('/:cpf', controller.getClienteCpf)
router.put('/:cpf', controller.updateCliente)
router.delete('/:cpf', controller.deletarCliente)

module.exports = router;