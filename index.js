
require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/urlmongo.js');

const distPath = 'C:\\Windows\\System32\\appint\\dist';

app.use(express.static(distPath));
app.use(cors());
app.use(express.json());



morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    }).catch(error => {
        console.error('Error getting persons:', error);
        response.status(500).json({ error: 'An internal server error occurred' });
    });
});
app.post('/api/persons', (request, response) => {
    const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person= new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})
app.get('/api/persons/:id', (request, response,next) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
    .catch(error => next(error))
  })
  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person= {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })
  
const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
