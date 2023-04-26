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
  const talkers = await talkerService.postNewTalker(req.body);
  return res.status(201).json(talkers);
};

const putTalker = async (req, res) => {
  const talkers = await talkerService.putTalker(req.params, req.body);
  if (talkers.type) {
    return res.status(talkers.type).json(talkers.message);
  }
  return res.status(200).json(talkers.message);
};

const getByName = async (req, res) => {
  const { q } = req.query;
  const talkers = await talkerService.getByName(q);
  if (talkers.type) {
    return res.status(200).json(talkers.message);
  }
  return res.status(200).json(talkers.message);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  await talkerService.deleteTalker(id);
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