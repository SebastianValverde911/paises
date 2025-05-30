// controllers/site.controller.js
const { Site, City } = require('../models'); // Ajusta la ruta según corresponda

const getSitesByCountry = async (req, res) => {
  const countryId = req.params.countryId;
  try {
    const sites = await Site.findAll({
      include: {
        model: City,
        attributes: ['name', 'country_id'],
        where: { country_id: countryId },
      },
    });

    const response = sites.map(site => ({
      ...site.toJSON(),
      city_name: site.City.name,
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSite = async (req, res) => {
  const { name, CityId, type,description } = req.body;
  try {
    const newSite = await Site.create({
      name,
      CityId,
      type,
      description
    });

    res.status(201).json(newSite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSitesByCity = async (req, res) => {
  const cityId = req.params.cityId;
  try {
    const sites = await Site.findAll({
      where: { CityId: cityId },
      include: {
        model: City,
        attributes: ['name', 'country_id'],
      },
    });

    const response = sites.map(site => ({
      ...site.toJSON(),
      city_name: site.City.name,
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSitesByCountry, createSite, getSitesByCity };
