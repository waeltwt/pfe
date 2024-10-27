const express = require('express')
const router = express.Router()
const User = require('../Models/userSchema.js')
const {register, login, loadUserInfo} = require('../controllers/userControlles.js')
const authMiddleware = require('../Middlewares/authMiddleware.js')
const adminMiddleware = require('../Middlewares/adminMiddleware')



//add user @Post
router.post('/newuser', async (req, res) => {
    console.log("user");
    
    try {
      let newUser = new User(req.body);
      await newUser.save();
      res.status(201).send('User was added');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding user');
    }
  });

//get user @get
// router.get('/', (req, res) => {
//     user.find({}, (err, data) => {
//         err ? console.log(err) : res.json(data)
//     })
// })
router.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get user by id @Get
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Utilise findById avec async/await
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while retrieving the user' });
    }
});


//delete user by id @delete

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Utilise async/await
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ msg: 'utilisateur a été supprimé' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
});

// update user by id
router.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,  // ID récupéré depuis les paramètres de l'URL
      req.body,       // Données à mettre à jour depuis le corps de la requête
      { new: true }   // Retourner le document mis à jour
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ msg: 'User was updated', updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});



router.post('/register', register);
router.post('/login', login)
router.get('/loaduser',authMiddleware, loadUserInfo)
 

module.exports= router