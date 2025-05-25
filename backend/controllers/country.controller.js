const Country = require('../models/country');

// Obtener todos los países
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener país por ID
const getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id);
    if (!country) return res.status(404).json({ message: 'País no encontrado' });
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo país
const createCountry = async (req, res) => {
  const { name } = req.body;
  try {
    const newCountry = await Country.create({ name });
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar país
const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const country = await Country.findByPk(id);
    if (!country) return res.status(404).json({ message: 'País no encontrado' });

    country.name = name;
    await country.save();

    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar país
const deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id);
    if (!country) return res.status(404).json({ message: 'País no encontrado' });

    await country.destroy();
    res.json({ message: 'País eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
};
