require('dotenv').config();
const mongoose = require('mongoose');

const password = process.env.DB_PASSWORD;
const name = process.argv[2];
const number = process.argv[3];

const url = `mongodb+srv://desarrollador19jhon:${password}@appphonebook.qaaig53.mongodb.net/sample_airbnb`;

mongoose.connect(url)
  .then(() => console.log('Conexión a MongoDB exitosa!'))
  .catch(error => console.error('Error conectando a MongoDB:', error));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
