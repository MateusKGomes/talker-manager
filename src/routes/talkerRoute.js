const express = require('express');
const { join } = require('path');
const fs = require('fs').promises;
const {
  allTalkers,
  talkerId,
  postNewTalker,
  putTalker,
 } = require('../controller/talker.controller');
const readJsonData = require('../models/talker.model');
const tokenValidation = require('../Middlewares/tokenValidation');
const nameValidation = require('../Middlewares/nameValidation');
const ageValidation = require('../Middlewares/ageValidation');
const talkValidation = require('../Middlewares/talkValidation');

const talkerRoute = express.Router();

const path = '../talker.json';

const joinPath = join(__dirname, path); 

talkerRoute.get('/', allTalkers);

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
  
  talkerRoute.get('/:id', talkerId);

  talkerRoute.post('/',
tokenValidation,
nameValidation,
ageValidation,
talkValidation.talkValidation,
talkValidation.rateValidation,
postNewTalker);

talkerRoute.put('/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation.talkValidation,
talkValidation.rateValidation,
putTalker);

// async (req, res) => {
//   const { name, age, talk } = req.body;
//   const { id } = req.params;
//   const talkers = await readJsonData(joinPath);
//   const findTalker = talkers.findIndex((talker) => talker.id === +id);
//   const talkerId = talkers.some((talker) => talker.id === +id);
//   if (!talkerId) {
//     return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
//   } 
//   const updateTalker = { id: Number(id), name, age, talk };
//   talkers[findTalker] = updateTalker;
//   await fs.writeFile(joinPath, JSON.stringify(talkers));
//   return res.status(200).json(updateTalker);
talkerRoute.delete('/:id', tokenValidation, async (req, res) => {
    const talkers = await readJsonData(joinPath);
    const { id } = req.params;
    const deleteTalker = talkers.filter((talker) => talker.id !== +id);
    await fs.writeFile(joinPath, JSON.stringify(deleteTalker));
    return res.status(204).end(); 
  });

module.exports = talkerRoute;
