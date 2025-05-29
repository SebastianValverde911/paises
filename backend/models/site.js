const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const City = require('./city');

const Site = sequelize.define('Site', {
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  description: DataTypes.TEXT,
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: City,
      key: 'id'
    }
  }
});

Site.belongsTo(City, { foreignKey: 'city_id' });
City.hasMany(Site, { foreignKey: 'city_id' });

module.exports = Site;
