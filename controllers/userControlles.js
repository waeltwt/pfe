const User = require('../Models/userSchema');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

// Register new user & return token
// Route: POST /api/user/register
// Access: Public

const register = async (req, res) => {
  const { email, password, name, skill, phoneNumber,  zip,  state, city, role } = req.body;

  try {
    // Check if the email already exists
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: 'Email already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ name, skill, phoneNumber,  zip,  state, city, email, password: hashedPassword, role: role || 'user' });

    // Create a JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, 'waeltouati123');

    res.status(201).json({ token, msg: 'Utilisateur ajouté avec succès' });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong', error });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
      return res.status(404).json({ msg: 'User not found. Please register first.' });
    }

    // Vérifier si le mot de passe est correct
    const verifyPassword = await bcrypt.compare(password, existUser.password);
    if (!verifyPassword) {
      return res.status(401).json({ msg: 'Wrong password' });
    }

    // Générer un token JWT contenant l'ID, l'email et le rôle de l'utilisateur
    const token = jwt.sign({ id: existUser._id, email: existUser.email, role: existUser.role }, 'waeltouati123');

    // Retourner le token et le rôle dans la réponse
    res.status(200).json({ token, role: existUser.role, msg: `${existUser.role} is connected` });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong', error });
  }
};

// Load user info
// Route: GET /api/user/loaduser
// Access: Private (requires token)

const loadUserInfo = async (req, res) => {
  try {
      console.log('User ID:', req.userId); // Log de l'ID utilisateur
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
          console.log('User not found'); // Log si l'utilisateur n'est pas trouvé
          return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
  } catch (err) {
      console.error("Error retrieving user:", err); // Log l'erreur
      res.status(500).json({ error: 'An error occurred while retrieving the user' });
  }
};
module.exports = { register, login, loadUserInfo };
