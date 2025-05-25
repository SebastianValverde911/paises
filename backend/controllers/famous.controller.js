const FamousPerson = require('../models/famous');
const City = require('../models/city');

const getFamousByCountry = async (req, res) => {
  const countryId = req.params.countryId;
  try {
    const famousPeople = await FamousPerson.findAll({
      include: {
        model: City,
        as: 'city',
        attributes: ['name'],
        where: { country_id: countryId }
      }
    });

    // Opcionalmente formatear respuesta
    const formatted = famousPeople.map(fp => ({
      id: fp.id,
      name: fp.name,
      city_id: fp.city_id,
      category: fp.category,
      city_name: fp.city?.name
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFamous = async (req, res) => {
  const { name, city_id, category } = req.body;
  try {
    const newFamous = await FamousPerson.create({ name, city_id, category });
    res.status(201).json(newFamous);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFamousByCountry, createFamous };
