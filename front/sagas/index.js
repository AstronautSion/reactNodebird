import { all, call } from 'redux-saga/effects';
import user from './user.js';
import post from './post.js';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8088/api';

export default function* rootSaga(){
    yield all([
        call(user),
        call(post),
    ]);
}