const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Site = require('./site');

const Food = sequelize.define('Food', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
});

Food.belongsTo(Site);
Site.hasMany(Food);

module.exports = Food;
