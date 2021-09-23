const mongoose = require('mongoose');
const Solicitud = mongoose.model('Solicitud');

function count(req, res, next) {
  let idMascota = req.params.id;
  Solicitud.aggregate([
    { $match: { idMascota: idMascota } },
    { $count: 'total' },
  ])
    .then(r => {
      res.status(200).send(r);
    })
    .catch(next);
}

module.exports = {
  count,
};
