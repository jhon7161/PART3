require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const url = process.env.DB_URLL;

mongoose.connect(url)
  .then(() => console.log('Conexión a MongoDB exitosa!'))
  .catch(error => console.error('Error conectando a MongoDB:', error));
  
  const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
  });

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
 
  module.exports = mongoose.model('Person',personSchema)