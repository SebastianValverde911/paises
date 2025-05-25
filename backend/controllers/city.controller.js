const City = require('../models/city'); // Asegúrate de tener este modelo definido correctamente

// Obtener ciudades por país
const getCitiesByCountry = async (req, res) => {
  const { countryId } = req.params;
  try {
    const cities = await City.findAll({
      where: { country_id: countryId },
    });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una ciudad
const createCity = async (req, res) => {
  const { name, country_id } = req.body;
  try {
    const newCity = await City.create({ name, country_id });
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCitiesByCountry, createCity };
