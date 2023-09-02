const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./models/User');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: '*'
}));

// Configuración de Sequelize y conexión a la base de datos SQLite
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Endpoint para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});

app.listen(port, () => {
  console.log(`Backend en ejecución en http://localhost:${port}`);
});
