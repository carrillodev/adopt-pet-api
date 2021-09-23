// class Mascota {
//   constructor(
//     id,
//     nombre,
//     categoria,
//     fotos,
//     descripcion,
//     anunciante,
//     ubicacion
//   ) {
//     this.id = id;
//     this.nombre = nombre;
//     this.categoria = categoria;
//     this.fotos = fotos;
//     this.descripcion = descripcion;
//     this.anunciante = anunciante;
//     this.ubicacion = ubicacion;
//   }
// }

// module.exports = Mascota;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MascotaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    categoria: { type: String, enum: ['perro', 'gato', 'otro'] },
    fotos: [String],
    descripcion: { type: String, required: true },
    anunciante: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    ubicacion: { type: String },
    estado: { type: String, enum: ['adopatdo', 'disponible', 'pendiente'] },
  },
  { collection: 'Mascotas', timestamps: true }
);

MascotaSchema.methods.publicData = () => {
  return {
    id: this.id,
    nombre: this.nombre,
    categoria: this.categoria,
    fotos: this.fotos,
    decripcion: this.descripcion,
    anunciante: this.anunciante,
    ubicacion: this.ubicacion,
    estado: this.estado,
  };
};

mongoose.model('Mascota', MascotaSchema);
