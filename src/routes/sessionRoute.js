const expresss = require('express');
const router = expresss.Router;
const controller = require('../controllers/sessionsController');

router.post('/', controller.getToken)

module.exports = router;