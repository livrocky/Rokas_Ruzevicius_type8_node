const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.all('*', (req, res) => {
  res.status(400).send({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('Listening on port', PORT));
