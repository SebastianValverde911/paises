// controllers/user.controller.js
const { User } = require('../models/user'); // Ajusta la ruta según corresponda

const getProfile = async (req, res) => {
  const userId = req.userId; // asumo que tienes middleware que setea req.userId
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'role'], // sólo campos que quieres exponer
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile };
