const express = require('express');
const router = express.Router()
const { AddUser, FindAllUser, FindSinglUser, DeleteUser, UpdateUser } = require('../controllers/dataControllers')


router.post('/user', AddUser );

router.get('/user', FindAllUser );

router.get('/user/:id', FindSinglUser );

router.delete('/user/:id', DeleteUser );

router.put('/user/:id',  UpdateUser );







module.exports = router;