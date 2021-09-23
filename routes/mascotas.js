const router = require('express').Router();
const {
  crearMascota,
  obtenerMascotas,
  eliminarMascota,
  modificarMascota,
  count,
} = require('../controllers/mascotas');

router.get('/', obtenerMascotas);
router.get('/:id', obtenerMascotas);
router.get('/count/:cat', count);
router.post('/', crearMascota);
router.put('/:id', modificarMascota);
router.delete('/:id', eliminarMascota);

module.exports = router;
