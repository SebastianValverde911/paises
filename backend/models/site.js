const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const City = require('./city');

const Site = sequelize.define('Site', {
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  description: DataTypes.TEXT,
  CityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Site.belongsTo(City, { foreignKey: 'CityId' });
City.hasMany(Site, { foreignKey: 'CityId' });

module.exports = Site;
