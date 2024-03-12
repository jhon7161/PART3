const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Define la ruta a la carpeta dist
const distPath = 'C:\\Windows\\System32\\appint\\dist';

// Sirve los archivos estáticos desde la carpeta dist
app.use(express.static(distPath));
app.use(cors())
app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "Jhon Botero",
        "number": "+573137961680"
    }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.get('/info', (request, response) => {
    const requestTime = new Date();
    const numberOfEntries = persons.length;

    response.send(`
        <p>Phonebook has info for ${numberOfEntries} people</p>
        <p>${requestTime}</p>
    `);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

app.put('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const personIndex = persons.findIndex(person => person.id === id);

    if (personIndex !== -1) {
        const updatedPerson = {
            ...persons[personIndex],
            name: body.name,
            number: body.number
        };

        persons[personIndex] = updatedPerson;
        response.json(updatedPerson);
    } else {
        response.status(404).end();
    }
});

const generateId = () => {
    // Generate a random id in the range of 1 to 1000000
    const id = Math.floor(Math.random() * 1000000) + 1;
    return id;
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const personExists = persons.some(person => person.name === body.name);

    if (personExists) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(newPerson);

    response.json(newPerson);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
