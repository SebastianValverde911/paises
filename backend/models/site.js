const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const City = require('./city');

const Site = sequelize.define('Site', {
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  description: DataTypes.TEXT,
});

Site.belongsTo(City);
City.hasMany(Site);

module.exports = Site;
