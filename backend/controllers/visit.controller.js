// controllers/visit.controller.js
const { Visit, Site } = require('../models'); // Ajusta la ruta según corresponda

const createVisit = async (req, res) => {
  const userId = req.userId;
  const { site_id, visit_date } = req.body;

  try {
    const newVisit = await Visit.create({
      user_id: userId,
      site_id,
      visit_date,
    });

    res.status(201).json(newVisit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVisitsByUser = async (req, res) => {
  const userId = req.userId;

  try {
    const visits = await Visit.findAll({
      where: { user_id: userId },
      include: {
        model: Site,
        attributes: ['name'],
      },
    });

    // Map para añadir site_name directamente en el objeto de respuesta
    const response = visits.map(visit => ({
      ...visit.toJSON(),
      site_name: visit.Site.name,
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createVisit, getVisitsByUser };
