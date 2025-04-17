const express = require('express')
const { createPost, getAllPosts, getSinglePost } = require('../controllers/postController')
const verifyToken = require('../middlware/auth')
const router = express.Router();

router.post('/', verifyToken, createPost)
router.get('/', verifyToken, getAllPosts)
router.get('/:id', verifyToken, getSinglePost)

module.exports = router