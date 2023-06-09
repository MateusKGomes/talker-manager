const express = require('express');

const login = require('./routes/loginRoute');
const talker = require('./routes/talkerRoute');

const app = express();

app.use(express.json());

app.use('/login', login);
app.use('/talker', talker);
app.get('/status', (req, res) => res.status(200).json({ message: 'funcionando!' }));

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
