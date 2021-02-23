const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {  
    try {
        if (req.user) {
            const fullUser = await db.User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: db.Post,
                    as: 'Posts',
                    attributes: ['id']
                },{
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id']
                },{
                    model: db.User,
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
router.post('/', async(req, res) => {  //회원가입
    try {
        const exUser = await db.User.findOne({
            where: { 
                userId: req.body.userId 
            },  
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); //salt는 10~13사이로 성능에 맞춰 작성.
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error)
        // return next(e);
    }
});
router.get('/:id', (req, res) => { //남의 정보 가져오는 것.

});
router.post('/logout', (req, res) => {// POST /api/usr/logout
    req.logout();
    req.session.destroy();
    res.send('ok');
});
router.post('/login', (req, res, next) => { // POST /api/usr/login
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
                return next(loginErr);
            }
            const fullUser = await db.User.findOne({
                where: {id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: db.Post,
                    as: 'Posts',
                    attributes: ['id']
                },{
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id']
                },{
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id']
                }], 
            });
            
            return res.status(200).json(fullUser);
        });
    })(req, res, next);
});
router.get('/:id/follow', (req, res) => {

});
router.delete('/:id/follow', (req, res) => {

});
router.delete('/:id/follower', (req, res) => {

});
router.get('/:id/posts', (req, res) => {

});

module.exports = router;