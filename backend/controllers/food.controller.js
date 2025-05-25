// controllers/food.controller.js
const { Food, City } = require('../models'); // Ajusta la ruta según corresponda

const getFoodsByCountry = async (req, res) => {
  const countryId = req.params.countryId;
  try {
    const foods = await Food.findAll({
      include: {
        model: City,
        attributes: ['name', 'country_id'],
        where: { country_id: countryId },
      },
    });

    // Si quieres enviar el nombre de la ciudad directamente en la respuesta junto con la comida:
    const response = foods.map(food => ({
      ...food.toJSON(),
      city_name: food.City.name,
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFood = async (req, res) => {
  const { name, city_id, price, description } = req.body;
  try {
    const newFood = await Food.create({
      name,
      city_id,
      price,
      description,
    });

    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFoodsByCountry, createFood };
