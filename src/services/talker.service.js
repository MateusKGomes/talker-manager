const { join } = require('path');
const { readJsonData, writeJson } = require('../models/talker.model');

const path = '../talker.json';

const joinPath = join(__dirname, path); 

const findAll = async () => {
    const talkers = await readJsonData(joinPath);
    return talkers;
};

const findById = async (param) => {
    const talkers = await readJsonData(joinPath);
    const talkerById = talkers.find((talker) => talker.id === +param);
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

const searchByName = async (param) => {
    const talkers = await readJsonData(joinPath);
    const filterByName = talkers
    .filter((talker) => talker.name.toLowerCase().includes(param.toLocaleLowerCase()));
    return filterByName;
};

const deleteTalkerById = async (param) => {
    const talkers = await readJsonData(joinPath);
    const deleteTalker = talkers.filter((talker) => talker.id !== +param);
    await writeJson(joinPath, deleteTalker);
    return deleteTalker;
};

module.exports = { 
    findAll,
    findById,
    createNewTalker,
    editTalker,
    searchByName,
    deleteTalkerById,
};