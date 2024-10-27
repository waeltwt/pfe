const User = require('./Models/userSchema');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  const adminEmail = 'admin@gmail.com'; 
  const adminPassword = 'admin123456'; 

  try {
    // Vérifier si l'admin existe déjà
    const admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      // Créer le nouvel admin
      const newAdmin = new User({
        name: 'Admin',
        skill: 'Management',
        phoneNumber: 123456789,
        zip: 1234,
        state: 'AdminState',
        city: 'AdminCity',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });

   
      await newAdmin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
};

module.exports = createAdmin;
