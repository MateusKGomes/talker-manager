const { findAll, findById, createNewTalker, editTalker } = require('../services/talker.service');

const allTalkers = async (req, res) => {
    const talkers = await findAll();
    if (talkers.length === 0) {
        return res.status(200).json([]);
      }
    return res.status(200).json(talkers);
};

const talkerId = async (req, res) => {
    const { id } = req.params;
    const talker = findById(id);
    if (!talker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      return res.status(200).json(talker);
};

const postNewTalker = async (req, res) => {
    const talkers = await createNewTalker(req.body);
    return res.status(201).json(talkers);
  };

const putTalker = async (req, res) => {
  const talkers = await editTalker(req.params, req.body);
  const { id } = req.params;
  const existingTalker = talkers[1].some((talker) => talker.id === +id);
  if (!existingTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(200).json(talkers[0]);
  };

module.exports = {
    allTalkers,
    talkerId,
    postNewTalker,
    putTalker,
};