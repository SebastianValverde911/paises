const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Country = sequelize.define('Country', {
  name: DataTypes.STRING,
});

module.exports = Country;
