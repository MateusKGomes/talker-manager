const express = require('express');
const { join } = require('path');
const fs = require('fs').promises;

const readJsonData = require('./utils/readJsonData');
const randonToken = require('./utils/randonToken');
const emailValidation = require('./Middlewares/emailValidation');
const passwordValidation = require('./Middlewares/passwordValidation');
const nameValidation = require('./Middlewares/nameValidation');
const ageValidation = require('./Middlewares/ageValidation');
const talkValidation = require('./Middlewares/talkValidation');
const tokenValidation = require('./Middlewares/tokenValidation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const path = '/talker.json';

const joinPath = join(__dirname, path);

app.get('/talker', async (__req, res) => {
  const talkers = await readJsonData(joinPath);
  if (talkers.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readJsonData(joinPath);
  const getTalkerId = talkers.find((talker) => talker.id === +id);

  if (!getTalkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(getTalkerId);
});

app.post('/login', emailValidation, passwordValidation, async (__req, res) => {
  const token = randonToken(16);
  return res.status(200).json({ token });
});

app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation.talkValidation,
talkValidation.rateValidation,
 async (req, res) => {
  const talkers = await readJsonData(joinPath);
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    name,
    age,
    id: Number(talkers[talkers.length - 1].id) + 1,
    talk: {
      watchedAt,
      rate,
    },
  };
  talkers.push(newTalker);
  await fs.writeFile(joinPath, JSON.stringify(talkers));
  return res.status(201).json(newTalker);
});

app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation.talkValidation,
talkValidation.rateValidation,
async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkers = await readJsonData(joinPath);
  const findTalker = talkers.findIndex((talker) => talker.id === +id);
  const talkerId = talkers.some((talker) => talker.id === +id);
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  const updateTalker = { id: Number(id), name, age, talk };
  talkers[findTalker] = updateTalker;
  await fs.writeFile(joinPath, JSON.stringify(talkers));
  return res.status(200).json(updateTalker);
});