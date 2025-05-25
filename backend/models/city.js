const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Country = require('./country');

const City = sequelize.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'cities',
  timestamps: false,
});

City.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });

module.exports = City;
