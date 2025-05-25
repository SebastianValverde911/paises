const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Site = require('./site');
const Famous = require('./famous');

const Tag = sequelize.define('Tag', {
  geoLat: DataTypes.FLOAT,
  geoLng: DataTypes.FLOAT,
});

Tag.belongsTo(User);
User.hasMany(Tag);

Tag.belongsTo(Site);
Site.hasMany(Tag);

Tag.belongsTo(Famous);
Famous.hasMany(Tag);

module.exports = Tag;
