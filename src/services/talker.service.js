const { join } = require('path');
const { readJsonData, writeJson } = require('../models/talker.model');

const path = '../talker.json';

const joinPath = join(__dirname, path); 

const findAll = async () => {
    const talkers = await readJsonData(joinPath);
    return talkers;
};

const findById = async (id) => {
    const talkers = await readJsonData(joinPath);
    const talkerById = talkers.find((talker) => talker.id === id);
    return talkerById;
};

const createNewTalker = async (param) => {
    const talkers = await findAll();
    const { name, age, talk: { watchedAt, rate } } = param;
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
   await writeJson(joinPath, talkers);
   return newTalker;
};

const editTalker = async (param, body) => {
    const { name, age, talk } = body;
    const { id } = param;
    const talkers = await readJsonData(joinPath);
    const findTalker = talkers.findIndex((talker) => talker.id === +id);
    const updateTalker = { id: Number(id), name, age, talk };
    talkers[findTalker] = updateTalker;
    await writeJson(joinPath, talkers);
    return [updateTalker, talkers];
};

module.exports = { 
    findAll,
    findById,
    createNewTalker,
    editTalker,
};