const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Asegúrate de que tu modelo User esté correctamente exportado

// Registrar usuario
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      status:"OK"
    });
  } catch (error) {
    res.status(500).json({ message: error.message,status:"Failure" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      status: "OK"
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Failure" });
  }
};

module.exports = { register, login };
