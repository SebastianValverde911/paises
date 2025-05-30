const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Site = require('./site');

const Food = sequelize.define('Food', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  SiteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Food.belongsTo(Site, { foreignKey: 'SiteId' });
Site.hasMany(Food, { foreignKey: 'SiteId' });

module.exports = Food;
