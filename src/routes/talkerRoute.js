const express = require('express');
const { join } = require('path');
const fs = require('fs').promises;
const readJsonData = require('../utils/readJsonData');
const tokenValidation = require('../Middlewares/tokenValidation');
const nameValidation = require('../Middlewares/nameValidation');
const ageValidation = require('../Middlewares/ageValidation');
const talkValidation = require('../Middlewares/talkValidation');

const talkerRoute = express.Router();

const path = '../talker.json';

const joinPath = join(__dirname, path); 

talkerRoute.get('/', async (__req, res) => {
    const talkers = await readJsonData(joinPath);
    if (talkers.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(talkers);
  });

  talkerRoute.get('/search', tokenValidation, async (req, res) => {
    const { q } = req.query;
    const talkers = await readJsonData(joinPath);
    
    if (q === undefined || q === '') {
      return res.status(200).json(talkers);
    }
    const filterByName = talkers
    .filter((talker) => talker.name.toLowerCase().includes(q.toLocaleLowerCase()));
  
    if (filterByName.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(filterByName);
  });
  
  talkerRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readJsonData(joinPath);
    const getTalkerId = talkers.find((talker) => talker.id === +id);
  
    if (!getTalkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(getTalkerId);
  });

  talkerRoute.post('/',
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

talkerRoute.put('/:id',
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

talkerRoute.delete('/:id', tokenValidation, async (req, res) => {
    const talkers = await readJsonData(joinPath);
    const { id } = req.params;
    const deleteTalker = talkers.filter((talker) => talker.id !== +id);
    await fs.writeFile(joinPath, JSON.stringify(deleteTalker));
    return res.status(204).end(); 
  });

module.exports = talkerRoute;