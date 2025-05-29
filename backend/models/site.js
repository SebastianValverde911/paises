const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const City = require('./city');

const Site = sequelize.define('Site', {
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  description: DataTypes.TEXT,
  cityId: { // <-- camelCase
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: City,
      key: 'id'
    }
  }
});

Site.belongsTo(City, { foreignKey: 'cityId' });
City.hasMany(Site, { foreignKey: 'cityId' });

module.exports = Site;
