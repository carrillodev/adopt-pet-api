const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('./models/Usuario');
require('./models/Mascota');
require('./models/Solicitud');
require('./config/passport');

async function init() {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  await mongoose.connect(process.env.MONGO_URI);
  mongoose.set('debug', true);

  app.use('/v1', require('./routes'));

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is litening on port ${PORT}`);
  });
}

init();
