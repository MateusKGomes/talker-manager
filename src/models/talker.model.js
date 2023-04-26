const fs = require('fs').promises;
const {
    join,
} = require('path');

const path = '../talker.json';

const joinPath = join(__dirname, path);

const readJsonData = async (param) => {
    try {
        const fileContent = await fs.readFile(param, 'utf-8');
        const response = await JSON.parse(fileContent);
        return response;
    } catch (error) {
        console.error('O arquivo não pode ser lido!');
    }
};

const writeJson = async (param, data) => {
    const updateData = JSON.stringify(data);
    const result = await fs.writeFile(param, updateData);
    return result;
};

const getAll = async () => {
    const talkers = await readJsonData(joinPath);
    return talkers;
};

const findById = async (param) => {
    const talkers = await readJsonData(joinPath);
    const talkerById = talkers.find((talker) => talker.id === +param);
    return talkerById;
};

const postNewTalker = async (param) => {
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
    console.log('newtalker', newTalker);
    return newTalker;
};

const putTalker = async (param, body) => {
    const { name, age, talk } = body;
    const { id } = param;
    const talkers = await readJsonData(joinPath);
    const findTalker = talkers.findIndex((talker) => talker.id === +id);
    const existingTalker = talkers.some((talker) => talker.id === +id);
    const updateTalker = {
        id: Number(id),
        name,
        age,
        talk,
    };
    talkers[findTalker] = updateTalker;
    await writeJson(joinPath, talkers);
    return { existingTalker, updateTalker };
};

const getByName = async (param) => {
    const talkers = await readJsonData(joinPath);
    const filterByName = talkers
        .filter((talker) => talker.name.toLowerCase().includes(param.toLocaleLowerCase()));

    return filterByName;
};

const deleteTalker = async (param) => {
    const talkers = await readJsonData(joinPath);
    const deletedTalker = talkers.filter((talker) => talker.id !== +param);
    await writeJson(joinPath, deletedTalker);
    return deleteTalker;
};

module.exports = {
    readJsonData,
    writeJson,
    getAll,
    findById,
    postNewTalker,
    putTalker,
    getByName,
    deleteTalker,
};