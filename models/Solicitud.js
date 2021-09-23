// class Solicitud {
//   constructor(
//     id,
//     idMascota,
//     fechaDeCreacion,
//     idUsuarioAnunciante,
//     idUsuarioSolicitante,
//     estado
//   ) {
//     this.id = id;
//     this.idMascota = idMascota;
//     this.fechaDeCreacion = fechaDeCreacion;
//     this.idUsuarioAnunciante = idUsuarioAnunciante;
//     this.idUsuarioSolicitante = idUsuarioSolicitante;
//     this.estado = estado;
//   }
// }

// module.exports = Solicitud;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SolicitudSchema = new Schema(
  {
    idMascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota' },
    fechaDeCreacion: { type: Date, required: true },
    idUsuarioAnunciante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    idUsuarioSolicitante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    estado: { type: String, enum: ['adoptado', 'disponible', 'pendiente'] },
  },
  { collection: 'Solicitudes', timestamps: true }
);

SolicitudSchema.methods.publicData = () => {
  return {
    id: this.id,
    idMascota: this.idMascota,
    fechaDeCreacion: this.fechaDeCreacion,
    idUsuarioAnunciante: this.idUsuarioAnunciante,
    idUsuarioSolicitante: this.idUsuarioSolicitante,
    estado: this.estado,
  };
};

mongoose.model('Solicitud', SolicitudSchema);
