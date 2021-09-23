const router = require('express').Router();
const { count } = require('../controllers/solicitudes');

router.get('/count/:id', count);

module.exports = router;
