const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const City = require('./city');

const FamousPerson = sequelize.define('FamousPerson', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'famous_people',
  timestamps: false,
});

FamousPerson.belongsTo(City, { foreignKey: 'city_id', as: 'city' });

module.exports = FamousPerson;
