const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');


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
  const talkers = await fs.readFile(joinPath, 'utf-8');
  const response = await JSON.parse(talkers);
  if (response.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(joinPath, 'utf-8');
  const response = await JSON.parse(talkers);
  const getTalkerId = response.find((talker) => talker.id === +id);

  if (!getTalkerId) {
    return res.status(404).json({   "message": "Pessoa palestrante não encontrada" })
  }
  return res.status(200).json(getTalkerId);
})

