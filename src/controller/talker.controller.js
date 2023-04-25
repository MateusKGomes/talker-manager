const {
  createNewTalker,
  searchByName,
  deleteTalkerById,
  editTalker,
} = require('../services/talker.service');
const talkerService = require('../services/talker.service');

const getAll = async (req, res) => {
  const talkers = await talkerService.getAll();
  if (talkers.type) {
    return res.status(talkers.type).json(talkers.message);
  }
  return res.status(200).json(talkers.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const talker = await talkerService.findById(id);
  if (talker.type) {
    return res.status(404).json(talker.message);
  }
  return res.status(200).json(talker.message);
};

const postNewTalker = async (req, res) => {
  const talkers = await createNewTalker(req.body);
  return res.status(201).json(talkers);
};

const putTalker = async (req, res) => {
  const talkers = await editTalker(req.params, req.body);
  if (talkers.type) {
    return res.status(talkers.type).json(talkers.message);
  }
  return res.status(200).json(talkers.message);
};

const getByName = async (req, res) => {
  const { q } = req.query;
  const talkers = await searchByName(q);
  if (talkers.type) {
    return res.status(200).json(talkers.message);
  }
  console.log('query', q);
  return res.status(200).json(talkers.message);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  await deleteTalkerById(id);
  return res.status(204).end();
};

module.exports = {
  getAll,
  findById,
  postNewTalker,
  putTalker,
  getByName,
  deleteTalker,
};