const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');
const readJsonData = require('./utils/readJsonData');
const randonToken = require('./utils/randonToken');

console.log(randonToken(16));

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

const joinPath = join(__dirname, '/talker.json');

const array = [];
console.log(!!array);

console.log(path);

app.get('/talker', async (__req, res) => {
  const talkers = await readJsonData(joinPath);
  if (talkers.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readJsonData(joinPath)
  const getTalkerId = talkers.find((talker) => talker.id === +id);

  if (!getTalkerId) {
    return res.status(404).json({   "message": "Pessoa palestrante não encontrada" })
  }
  return res.status(200).json(getTalkerId);
})

app.post('/login', async(req, res) => {
  const token = randonToken(16);
  return res.status(200).json({ token, });
})