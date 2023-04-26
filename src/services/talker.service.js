const talkerModel = require('../models/talker.model');

const getAll = async () => {
    const talkers = await talkerModel.getAll();
    if (talkers.length === 0) {
        return { type: 200, message: [] };
    }
    return { type: null, message: talkers };
};

const findById = async (param) => {
    const talkers = await talkerModel.findById(param);
    if (!talkers) {
        return { type: 404, message: 'Pessoa palestrante não encontrada' };
    }
    return { type: null, message: talkers };
};

const postNewTalker = async (param) => {
    const talkers = await talkerModel.postNewTalker(param);
    console.log('talkers', talkers);
    if (!talkers) {
        return { type: 404, message: '' };
    }
    return { type: null, message: talkers };
};

const putTalker = async (param, body) => {
    const talkers = await talkerModel.putTalker(param, body);
    if (!talkers.existingTalker) {
        return { type: 404, message: 'Pessoa palestrante não encontrada' };
    }
    return { type: null, message: talkers.updateTalker };
};

const getByName = async (param) => {
    const talkers = await talkerModel.getByName(param);
    if (param === undefined || param === '') {
        return { type: 200, message: talkers };
    }
    if (talkers.length === 0) {
        return { type: 200, message: [] };
    }

    return { type: null, message: talkers };
};

const deleteTalker = async (param) => {
    const talkers = await talkerModel.deleteTalker(param);
    if (!talkers) {
        return { type: 404, message: '' };
    }
    return talkers;
};

module.exports = {
    getAll,
    findById,
    postNewTalker,
    putTalker,
    getByName,
    deleteTalker,
};