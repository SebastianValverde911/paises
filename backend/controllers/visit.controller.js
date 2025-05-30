// controllers/visit.controller.js
const { Visit, Site } = require('../models'); // Ajusta la ruta según corresponda

const createVisit = async (req, res) => {
  const { SiteId, date, UserId } = req.body; 

  try {
    const newVisit = await Visit.create({
      date,
      UserId, 
      SiteId
    });

    res.status(201).json(newVisit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVisitsByUser = async (req, res) => {
  const {id} = req.params;

  try {
    const visits = await Visit.findAll({
      where: { id },
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
