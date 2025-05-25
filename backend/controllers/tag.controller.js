// controllers/tag.controller.js
const { Tag } = require('../models'); // Ajusta la ruta según corresponda

const createTag = async (req, res) => {
  const userId = req.userId; // asumo que tienes middleware que setea req.userId
  const { site_id, famous_id, lat, lng, photo_url } = req.body;

  try {
    const newTag = await Tag.create({
      user_id: userId,
      site_id,
      famous_id,
      lat,
      lng,
      photo_url,
      tag_date: new Date(), // Sequelize puede manejar automáticamente, pero aquí explícito NOW()
    });

    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTag };
