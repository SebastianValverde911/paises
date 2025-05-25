// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Asegúrate que esto exporta tu instancia sequelize

// Rutas
const authRoutes = require('./routes/auth.routes');
const countryRoutes = require('./routes/country.routes');
const cityRoutes = require('./routes/city.routes');
const famousRoutes = require('./routes/famous.routes');
const siteRoutes = require('./routes/site.routes');
const foodRoutes = require('./routes/food.routes');
const userRoutes = require('./routes/user.routes');
const visitRoutes = require('./routes/visit.routes');
const tagRoutes = require('./routes/tag.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/famous', famousRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/user', userRoutes);
app.use('/api/visit', visitRoutes);
app.use('/api/tag', tagRoutes);

// 🔄 Sincronizar modelos y luego iniciar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida');

    return sequelize.sync({ alter: true }); // Crea o ajusta las tablas
  })
  .then(() => {
    console.log('📦 Tablas sincronizadas correctamente');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al iniciar la app:', err.message);
  });
