const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const  passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
// const hashtagAPIRouter = require('./routes/')
dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: true, 
    credentials: true, 
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    saveUninitialized: false, //빈 값도 저장.
    resave: false,  //매번 세션 강제 저장.
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false, //https 쓸때 true
    },
    name: 'rnbck'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
// app.use('/api/hashtag', hashtagAPIRouter);

app.listen(8088, ()=>{
    console.log('server is running on localhost:8088');
});