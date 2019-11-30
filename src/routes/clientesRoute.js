const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientesController');
const authMidleware = require('../middlewares/auth');



router.post('/', controller.post)
router.get('/', controller.get)
router.use(authMidleware);
router.get('/compradoras', controller.getCompradoras)
router.get('/:cpf', controller.getClienteCpf)
router.put('/:cpf', controller.updateCliente)
router.delete('/:cpf', controller.deletarCliente)

module.exports = router;