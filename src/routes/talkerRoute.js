const express = require('express');
const {
  getAll,
  findById,
  postNewTalker,
  putTalker,
  getByName,
  deleteTalker,
} = require('../controller/talker.controller');
const tokenValidation = require('../Middlewares/tokenValidation');
const nameValidation = require('../Middlewares/nameValidation');
const ageValidation = require('../Middlewares/ageValidation');
const talkValidation = require('../Middlewares/talkValidation');

const talkerRoute = express.Router();

talkerRoute.get('/', getAll);

talkerRoute.get('/search', tokenValidation, getByName);

talkerRoute.get('/:id', findById);

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

talkerRoute.delete('/:id', tokenValidation, deleteTalker);

module.exports = talkerRoute;