const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Site = require('./site');

const Visit = sequelize.define('Visit', {
  date: DataTypes.DATE,
});

Visit.belongsTo(User);
User.hasMany(Visit);

Visit.belongsTo(Site);
Site.hasMany(Visit);

module.exports = Visit;
