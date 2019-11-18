const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientesController');


router.post('/', controller.post)
router.get('/', controller.get)
router.get('/compradoras', controller.getCompradoras)
router.get('/:cpf', controller.getClienteCpf)

module.exports = router;