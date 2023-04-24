const {
  findAll,
  findById,
  createNewTalker,
  searchByName,
  deleteTalkerById,
  editTalker } = require('../services/talker.service');

const allTalkers = async (req, res) => {
    const talkers = await findAll();
    if (talkers.length === 0) {
        return res.status(200).json([]);
      }
    return res.status(200).json(talkers);
};

const talkerId = async (req, res) => {
    const { id } = req.params;
    const talker = await findById(id);
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

  const getByName = async (req, res) => {
    const { q } = req.query;
    const talkers = await searchByName(q);
    if (q === undefined || q === '') {
      return res.status(200).json(talkers);
    }
    if (talkers.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(talkers);
  };
  
  const deleteTalker = async (req, res) => {
    const { id } = req.params;
    await deleteTalkerById(id);
    return res.status(204).end(); 
  };

module.exports = {
    allTalkers,
    talkerId,
    postNewTalker,
    putTalker,
    getByName,
    deleteTalker,
};