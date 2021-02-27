const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {Post, User} = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {  // GET /api/user
    try {
        if (req.user) {
            const fullUser = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    as: 'Posts',
                    attributes: ['id']
                },{
                    model: User,
                    as: 'Followings',
                    attributes: ['id']
                },{
                    model: User,
                    as: 'Followers',
                    attributes: ['id']
                }], 
            })
            res.status(200).json(fullUser);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.post('/', async(req, res) => {  // POST /api/user
    try {
        const exUser = await User.findOne({
            where: { 
                email: req.body.email 
            },  
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); //salt는 10~13사이로 성능에 맞춰 작성.
        await User.create({
            nickname: req.body.nickname,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error)
    }
});
router.get('/:id', async (req, res) => { // GET /api/:id
    try {
        const user = await User.findOne({
            where : { id : parseInt(req.params.id, 10) },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                as: 'Posts',
                attributes: ['id']
            },{
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        })
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        res.status(200).json(jsonUser);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/logout', (req, res) => {// POST /api/user/logout
    req.logout();
    req.session.destroy();
    res.send('ok');
});
router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            console.error(user)
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUser = await User.findOne({
                where: {id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    as: 'Posts',
                    attributes: ['id']
                },{
                    model: User,
                    as: 'Followings',
                    attributes: ['id']
                },{
                    model: User,
                    as: 'Followers',
                    attributes: ['id']
                }], 
            });
            
            return res.status(200).json(fullUser);
        });
    })(req, res, next);
});
router.get('/:id/follow', (req, res) => {  // GET /api/user/follow

});
router.delete('/:id/follow', (req, res) => {// DELETE /api/user/:id/follow

});
router.delete('/:id/follower', (req, res) => {// DELETE /api/user/:id/follower

});
router.get('/:id/posts', (req, res) => { // GET /api/user/:id/posts

});

module.exports = router;