const sequelize = require('../config/db');

const User = require('./user');
const Country = require('./country');
const City = require('./city');
const Site = require('./site');
const Famous = require('./famous');
const Food = require('./food');
const Visit = require('./visit');
const Tag = require('./tag');

// Aquí puedes definir relaciones adicionales si es necesario

module.exports = {
  sequelize,
  User,
  Country,
  City,
  Site,
  Famous,
  Food,
  Visit,
  Tag,
};
