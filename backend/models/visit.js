const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Site = require('./site');

const Visit = sequelize.define('Visit', {
  date: DataTypes.DATE,
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  SiteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Visit.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Visit, { foreignKey: 'UserId' });

Visit.belongsTo(Site, { foreignKey: 'SiteId' });
Site.hasMany(Visit, { foreignKey: 'SiteId' });

module.exports = Visit;
