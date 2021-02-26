const express = require('express');
const {Post, User, Hashtag, Comment} = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/post
    
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g); //해쉬태그들이 다 담김
        const newPost = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: {name: tag.slice(1).toLowerCase()},
            })));
            await newPost.addHashtags(result.map(r => r[0]));
        }
        const fullPost = await Post.findOne({
            where: { id: newPost.id },
            include: [{ //게시글 작성자
                model: User,
                attributes: ['id', 'nickname'],
            }],
            order: [['createdAt', 'DESC'],['updatedAt', 'ASC']] //DESC 내림차순, ASC는 오름차순
        })
        
        res.json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.post('/:postId/comment', async (req, res, next) => { // POST  /api/post/:postId/comment
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }

        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
})
router.post('/images', (req, res) => { // POST  /api/post/images

});

module.exports = router;