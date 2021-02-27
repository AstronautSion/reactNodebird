const express = require('express');
const { Post, Hashtag, User, Image } = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => { //GET /api/hashtag/:tag
    try {
        
        const posts = await Post.findAll({
            limit :10,
            include: [{
                model: Hashtag,
                where: { name: decodeURIComponent(req.params.tag) },
              }, {
                model: User,
                attributes: ['id', 'nickname'],
              }, {
                model: Image,
              }, {
                model: User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
              }, {
                model: Post,
                as: 'Retweet',
                include: [{
                  model: User,
                  attributes: ['id', 'nickname'],
                }, {
                  model: Image,
                }],
              }],
        });

        res.json(posts);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;