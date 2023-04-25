const {
    join,
} = require('path');
const {
    readJsonData,
    writeJson,
} = require('../models/talker.model');

const path = '../talker.json';

const joinPath = join(__dirname, path);

const getAll = async () => {
    const talkers = await readJsonData(joinPath);
    if (talkers.length === 0) {
        return { type: 200, message: [] };
    }
    return { type: null, message: talkers };
};

const findById = async (param) => {
    const talkers = await readJsonData(joinPath);
    const talkerById = talkers.find((talker) => talker.id === +param);
    if (!talkerById) {
        return { type: 404, message: 'Pessoa palestrante não encontrada' };
    }
    return { type: null, message: talkerById };
};

const createNewTalker = async (param) => {
    const talkers = await readJsonData(joinPath);
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
    const existingTalker = talkers.some((talker) => talker.id === +id);
    if (!existingTalker) {
        return { type: 404, message: 'Pessoa palestrante não encontrada' };
    }
    const updateTalker = {
        id: Number(id),
        name,
        age,
        talk,
    };
    talkers[findTalker] = updateTalker;
    await writeJson(joinPath, talkers);
    return { type: null, message: updateTalker };
};

const searchByName = async (param) => {
    const talkers = await readJsonData(joinPath);
    if (param === undefined || param === '') {
        return { type: 200, message: talkers };
    }
    if (talkers.length === 0) {
        return { type: 200, message: [] };
    }
    const filterByName = talkers
        .filter((talker) => talker.name.toLowerCase().includes(param.toLocaleLowerCase()));

    return { type: null, message: filterByName };
};

const deleteTalkerById = async (param) => {
    const talkers = await readJsonData(joinPath);
    const deleteTalker = talkers.filter((talker) => talker.id !== +param);
    await writeJson(joinPath, deleteTalker);
    return deleteTalker;
};

module.exports = {
    getAll,
    findById,
    createNewTalker,
    editTalker,
    searchByName,
    deleteTalkerById,
};