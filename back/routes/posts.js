const express = require('express');
const {Post, User, Comment} = require('../models');
const router = express.Router();
router.get('/', async (req, res, next) => { // GET /api/posts
    try {
       
        const posts = await Post.findAll({
            limit: 10,
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            },{
                model: Comment,
                include: [{
                  model: User,
                  attributes: ['id', 'nickname'],
                }],
            }]
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;