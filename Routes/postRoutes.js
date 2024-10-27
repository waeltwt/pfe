const express = require('express');
const router = express.Router()
const { addPost, getPosts} = require('../controllers/postControllers')
// const multer = require('multer');





router.post('/addPost', addPost);
// router.get('/getpost', getPosts);
router.get('/', getPosts);





module.exports = router;