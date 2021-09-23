// class Usuario {
//   constructor(id, username, nombre, apellido, email, password, tipo) {
//     this.id = id;
//     this.username = username;
//     this.nombre = nombre;
//     this.apellido = apellido;
//     this.email = email;
//     this.password = password;
//     this.tipo = tipo;
//   }
// }

// module.exports = Usuario;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UsuarioSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'No puede estar vacío el campo username'],
      lowercase: true,
      match: [/^[a-z0-9]+$/, 'Username inválido'],
      index: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Falta email'],
      match: [/\S+@\S+\.\S+/, 'Email inválido'],
      index: true,
    },
    tipo: {
      type: String,
      enum: ['normal', 'anunciante'],
    },
    hash: String,
    salt: String,
  },
  { collection: 'Usuarios', timestamps: true }
);

UsuarioSchema.plugin(uniqueValidator, { message: 'Ya existe' });

UsuarioSchema.methods.publicData = function () {
  return {
    id: this.id,
    username: this.username,
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    tipo: this.tipo,
  };
};

UsuarioSchema.methods.crearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString();
};

UsuarioSchema.methods.validarPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString();
  return this.hash === hash;
};

UsuarioSchema.methods.generarJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

UsuarioSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generarJWT(),
  };
};

mongoose.model('Usuario', UsuarioSchema);
